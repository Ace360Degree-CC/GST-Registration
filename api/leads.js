import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ ok: false, error: "Method not allowed" });
  }

  const {
    SMTP_HOST,
    SMTP_PORT,
    SMTP_SECURE,
    SMTP_USER,
    SMTP_PASS,
    MAIL_TO,
    MAIL_FROM,
  } = process.env;

  const requiredEnv = ["SMTP_HOST", "SMTP_PORT", "SMTP_USER", "SMTP_PASS", "MAIL_TO", "MAIL_FROM"];
  const missingEnv = requiredEnv.filter((key) => !process.env[key]);

  if (missingEnv.length > 0) {
    return res.status(500).json({
      ok: false,
      error: `Missing env vars: ${missingEnv.join(", ")}`,
    });
  }

  const { name, mobile, email, service, stage, formSource } = req.body || {};

  if (!name?.trim() || !/^\d{10}$/.test(mobile || "") || !/^\S+@\S+\.\S+$/.test(email || "")) {
    return res.status(400).json({ ok: false, error: "Invalid form data." });
  }

  const safeName = name.trim();
  const safeEmail = email.trim();
  const safeService = service || "GST Registration";
  const safeStage = stage || "Idea";
  const sourceMap = {
    footer: "Footer Form",
    popup: "Popup Form",
    header: "Header Form",
  };
  const safeFormSource = sourceMap[formSource] || "Header Form";

  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT),
    secure: SMTP_SECURE === "true",
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASS,
    },
  });

  const adminText = `
New Lead Submission:

Name: ${safeName}
Mobile: ${mobile}
Email: ${safeEmail}
Service: ${safeService}
Stage: ${safeStage}
Source: ${safeFormSource}
Time: ${new Date().toISOString()}
`;

  const userText = `
Hi ${safeName},

Thank you for contacting us for ${safeService}.
Our team will reach out shortly.

Regards,
Team
`;

  try {
    // Admin email
    await transporter.sendMail({
      from: MAIL_FROM,
      to: MAIL_TO,
      subject: `GST New Lead (${safeFormSource})`,
      text: adminText,
    });

    // User email
    await transporter.sendMail({
      from: MAIL_FROM,
      to: safeEmail,
      subject: "Thank You for Contacting Us",
      text: userText,
    });

    return res.status(200).json({ ok: true });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ ok: false, error: "Mail failed" });
  }
}
