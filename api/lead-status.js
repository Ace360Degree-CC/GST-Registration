import { getLeadTableColumns, getLeadsTableName, query } from "./db.js";

const ALLOWED_STATUSES = new Set([
  "New",
  "Contacted",
  "Qualified",
  "Converted",
  "Not Interested",
  "Spam",
  "Closed",
]);

const sanitizeStatus = (value) => String(value || "").trim();
const normalizeFormBucket = (value) => {
  const source = String(value || "").trim().toLowerCase();
  if (source === "footer") return "footer";
  if (source === "popup") return "popup";
  return "header";
};

export default async function leadStatusHandler(req, res) {
  try {
    if (req.method !== "PATCH") {
      return res.status(405).json({ ok: false, error: "Method not allowed" });
    }

    const id = Number.parseInt(String(req.params?.id || ""), 10);
    if (!Number.isFinite(id) || id < 1) {
      return res.status(400).json({ ok: false, error: "Invalid lead id." });
    }

    const status = sanitizeStatus(req.body?.status);
    if (!status) {
      return res.status(400).json({ ok: false, error: "Status is required." });
    }
    if (!ALLOWED_STATUSES.has(status)) {
      return res.status(400).json({
        ok: false,
        error: `Unsupported status. Allowed: ${Array.from(ALLOWED_STATUSES).join(", ")}`,
      });
    }

    const formBucket = normalizeFormBucket(req.query?.formSource || req.query?.form_source || req.body?.formSource);
    const columns = await getLeadTableColumns(formBucket);
    const tableName = getLeadsTableName(formBucket);
    const statusColumn = columns.has("lead_status") ? "lead_status" : columns.has("status") ? "status" : null;
    const idColumn = columns.has("lead_id") ? "lead_id" : "id";
    if (!statusColumn) {
      return res.status(500).json({ ok: false, error: "Status column not found. Add `lead_status` or `status`." });
    }

    const result = await query(`UPDATE \`${tableName}\` SET \`${statusColumn}\` = ? WHERE \`${idColumn}\` = ?`, [status, id]);
    if (!result.affectedRows) {
      return res.status(404).json({ ok: false, error: "Lead not found." });
    }

    return res.status(200).json({ ok: true, id, status });
  } catch (error) {
    const message = error?.message ? String(error.message) : "Unexpected server error.";
    console.error("[lead-status] request failed:", error);
    return res.status(500).json({ ok: false, error: message });
  }
}
