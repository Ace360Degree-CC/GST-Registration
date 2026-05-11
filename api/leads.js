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

  const requiredEnv = [
    "SMTP_HOST",
    "SMTP_PORT",
    "SMTP_USER",
    "SMTP_PASS",
    "MAIL_TO",
    "MAIL_FROM",
  ];

  const missingEnv = requiredEnv.filter((key) => !process.env[key]);

  if (missingEnv.length > 0) {
    return res.status(500).json({
      ok: false,
      error: `Missing env vars: ${missingEnv.join(", ")}`,
    });
  }

  const { name, mobile, email, service, stage, formSource } = req.body || {};

  if (
    !name?.trim() ||
    !/^\d{10}$/.test(mobile || "") ||
    !/^\S+@\S+\.\S+$/.test(email || "")
  ) {
    return res.status(400).json({
      ok: false,
      error: "Invalid form data.",
    });
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
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

const normalizeLeadPayload = (payload = {}) => {
  const safeName = String(payload.name || "").trim();
  const safeEmail = String(payload.email || "").trim();
  const safeMobile = String(payload.mobile || payload.phone || "").trim();
  const safeService = String(payload.service || "GST Registration").trim();
  const safeStage = String(payload.stage || payload.business_stage || "Idea").trim();
  const safeSource = String(payload.source || "Website").trim();
  const safeStatus = String(payload.status || "New").trim();
  const rawFormSource = String(payload.formSource || payload.form_used || "").trim().toLowerCase();
  const safeFormUsed = FORM_SOURCE_MAP[rawFormSource] || rawFormSource || "hero_form";
  const formBucket = normalizeFormBucket(rawFormSource);
  const safePageId = payload.page_id ? String(payload.page_id).trim() : null;
  const safeProjectId = payload.project_id ? String(payload.project_id).trim() : null;
  const safeDevice = payload.mobile_or_desktop ? String(payload.mobile_or_desktop).trim() : null;
  const safeGoogleClickId = payload.google_click_id || payload.gclid ? String(payload.google_click_id || payload.gclid).trim() : null;
  const safeCampaignId = payload.campaign_id ? Number(payload.campaign_id) : null;
  const safeCampaignName = payload.campaign_name ? String(payload.campaign_name).trim() : null;
  const safeAdGroupId = payload.ad_group_id ? Number(payload.ad_group_id) : null;
  const safeAdGroupName = payload.ad_group_name ? String(payload.ad_group_name).trim() : null;
  const safeAdId = payload.ad_id ? Number(payload.ad_id) : null;
  const safeAdName = payload.ad_name ? String(payload.ad_name).trim() : null;
  const safeLeadFormId = payload.lead_form_id ? Number(payload.lead_form_id) : null;
  const safeLeadFormName = payload.lead_form_name ? String(payload.lead_form_name).trim() : null;
  const safeCity = payload.city ? String(payload.city).trim() : null;
  const safeState = payload.state ? String(payload.state).trim() : null;
  const safeCountry = payload.country ? String(payload.country).trim() : null;

  if (!safeName || !/^\d{10}$/.test(safeMobile) || !/^\S+@\S+\.\S+$/.test(safeEmail)) {
    return { error: "Invalid form data." };
  }

  return {
    formBucket,
    values: {
      name: safeName,
      phone: safeMobile,
      email: safeEmail,
      service: safeService,
      business_stage: safeStage,
      source: safeSource,
      status: safeStatus,
      form_used: safeFormUsed,
      page_id: safePageId,
      project_id: safeProjectId,
      mobile_or_desktop: safeDevice,
      google_click_id: safeGoogleClickId,
      campaign_id: safeCampaignId,
      campaign_name: safeCampaignName,
      ad_group_id: safeAdGroupId,
      ad_group_name: safeAdGroupName,
      ad_id: safeAdId,
      ad_name: safeAdName,
      lead_form_id: safeLeadFormId,
      lead_form_name: safeLeadFormName,
      city: safeCity,
      state: safeState,
      country: safeCountry,
    },
    leadMeta: {
      mobile: safeMobile,
      name: safeName,
      email: safeEmail,
      service: safeService,
      stage: safeStage,
      source: safeSource,
      formUsed: safeFormUsed,
    },
  };
};

const insertLead = async (leadValues) => {
  const tableName = getLeadsTableName(leadValues.__formBucket || "header");
  const columnsInDb = await getLeadTableColumns(leadValues.__formBucket || "header");
  const mappedValues = { ...leadValues };

  // Header schema compatibility mapping.
  if (columnsInDb.has("user_full_name")) mappedValues.user_full_name = leadValues.name;
  if (columnsInDb.has("user_phone")) mappedValues.user_phone = leadValues.phone;
  if (columnsInDb.has("user_email")) mappedValues.user_email = leadValues.email;
  if (columnsInDb.has("selected_service")) mappedValues.selected_service = leadValues.service;
  if (columnsInDb.has("selected_option")) mappedValues.selected_option = leadValues.business_stage;
  if (columnsInDb.has("lead_submission_time")) mappedValues.lead_submission_time = new Date();
  if (columnsInDb.has("lead_form_name") && !mappedValues.lead_form_name) mappedValues.lead_form_name = leadValues.form_used;

  const entries = Object.entries(mappedValues).filter(
    ([key, value]) => key !== "__formBucket" && columnsInDb.has(key) && value !== null && value !== undefined && value !== ""
  );

  if (entries.length === 0) {
    throw new Error("No compatible columns found in configured leads table.");
  }

  const columnSql = entries.map(([key]) => `\`${key}\``).join(", ");
  const placeholders = entries.map(() => "?").join(", ");
  const params = entries.map(([, value]) => value);

  const result = await query(`INSERT INTO \`${tableName}\` (${columnSql}) VALUES (${placeholders})`, params);
  return result.insertId;
};

const sendLeadEmails = async ({ name, mobile, email, service, stage, source, formUsed }) => {
  if (!hasMailConfig()) {
    return { skipped: true, reason: "mail_env_missing" };
  }

  const transporter = createTransporter();
  const adminText = `
New Lead Submission:

Name: ${name}
Mobile: ${mobile}
Email: ${email}
Service: ${service}
Stage: ${stage}
Source: ${source}
Form: ${formUsed}
Time: ${new Date().toISOString()}
`;

  const userText = `
Hi ${name},

Thank you for contacting us for ${service}.
Our team will reach out shortly.

Regards,
Team
`;

  try {
    await transporter.sendMail({
      from: MAIL_FROM,
      to: MAIL_TO,
      subject: `GST New Lead (${safeFormSource})`,
      text: adminText,
    });

    await transporter.sendMail({
      from: MAIL_FROM,
      to: safeEmail,
      subject: "Thank You for Contacting Us",
      text: userText,
    });

  return { skipped: false };
};

const listLeads = async (req, res) => {
  const formBucket = normalizeFormBucket(req.query.formSource || req.query.form_source);
  const tableName = getLeadsTableName(formBucket);
  const columnsInDb = await getLeadTableColumns(formBucket);
  const columnMap = resolveTableColumns(columnsInDb);

  const page = parsePositiveInt(req.query.page, 1);
  const limit = parsePositiveInt(req.query.limit, 20, 100);
  const offset = (page - 1) * limit;

  const whereParts = [];
  const params = [];

  const filterColumnMap = {
    status: columnMap.statusColumn,
    service: columnMap.serviceColumn,
    form_used: columnMap.formColumn,
    source: columnsInDb.has("source") ? "source" : null,
    page_id: columnsInDb.has("page_id") ? "page_id" : null,
    project_id: columnsInDb.has("project_id") ? "project_id" : null,
  };
  for (const [key, value] of Object.entries(req.query || {})) {
    if (!value || !ALLOWED_LIST_FILTERS.has(key)) continue;
    const dbColumn = filterColumnMap[key];
    if (!dbColumn || !columnsInDb.has(dbColumn)) continue;
    whereParts.push(`\`${dbColumn}\` = ?`);
    params.push(String(value).trim());
  }

  const search = String(req.query.search || "").trim();
  if (search) {
    const searchable = [columnMap.nameColumn, columnMap.phoneColumn, columnMap.emailColumn].filter((column) => columnsInDb.has(column));
    if (searchable.length > 0) {
      const searchClause = searchable.map((column) => `\`${column}\` LIKE ?`).join(" OR ");
      whereParts.push(`(${searchClause})`);
      for (let i = 0; i < searchable.length; i += 1) params.push(`%${search}%`);
    }
  }

  const whereSql = whereParts.length ? `WHERE ${whereParts.join(" AND ")}` : "";

  const countRows = await query(`SELECT COUNT(*) AS total FROM \`${tableName}\` ${whereSql}`, params);
  const total = Number(countRows[0]?.total || 0);

  const selectedFields = [
    `\`${columnMap.idColumn}\` AS id`,
    `\`${columnMap.nameColumn}\` AS name`,
    `\`${columnMap.phoneColumn}\` AS phone`,
    `\`${columnMap.emailColumn}\` AS email`,
    columnMap.serviceColumn ? `\`${columnMap.serviceColumn}\` AS service` : "NULL AS service",
    columnMap.stageColumn ? `\`${columnMap.stageColumn}\` AS business_stage` : "NULL AS business_stage",
    columnMap.statusColumn ? `\`${columnMap.statusColumn}\` AS status` : "'New' AS status",
    columnMap.formColumn ? `\`${columnMap.formColumn}\` AS form_used` : "NULL AS form_used",
    columnMap.createdAtColumn ? `\`${columnMap.createdAtColumn}\` AS created_at` : "NULL AS created_at",
    columnsInDb.has("source") ? "`source` AS source" : "'Website' AS source",
  ];

  const rows = await query(
    `SELECT ${selectedFields.join(", ")} FROM \`${tableName}\` ${whereSql} ORDER BY \`${columnMap.idColumn}\` DESC LIMIT ? OFFSET ?`,
    [...params, limit, offset]
  );

  return res.status(200).json({
    ok: true,
    page,
    limit,
    total,
    totalPages: total > 0 ? Math.ceil(total / limit) : 0,
    data: rows,
  });
};

const createLead = async (req, res) => {
  const normalized = normalizeLeadPayload(req.body);
  if (normalized.error) {
    return res.status(400).json({ ok: false, error: normalized.error });
  }

  const leadId = await insertLead({ ...normalized.values, __formBucket: normalized.formBucket });
  let emailStatus = { skipped: true, reason: "not_attempted" };

  try {
    emailStatus = await sendLeadEmails(normalized.leadMeta);
  } catch (error) {
    const errorCode = error?.code ? String(error.code) : "UNKNOWN";
    const errorMessage = error?.message
      ? String(error.message)
      : "Mail failed";

    console.error("[leads] mail send failed:", error);

    return res.status(500).json({
      ok: false,
      error: `Mail failed (${errorCode}): ${errorMessage}`,
    });
  }
}