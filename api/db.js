import mysql from "mysql2/promise";

let pool;
const cachedColumnsByTable = new Map();
const TABLE_NAME_PATTERN = /^[A-Za-z0-9_]+$/;

const normalizeFormBucket = (value) => {
  const source = String(value || "").trim().toLowerCase();
  if (source === "footer") return "footer";
  if (source === "popup") return "popup";
  return "header";
};

const getTableNameConfig = () => ({
  header: (process.env.DB_LEADS_TABLE_HEADER || process.env.DB_LEADS_TABLE || "gst_leads_header").trim(),
  footer: (process.env.DB_LEADS_TABLE_FOOTER || "gst_leads_footer").trim(),
  popup: (process.env.DB_LEADS_TABLE_POPUP || "gst_leads_popup").trim(),
});

const assertValidTableName = (tableName) => {
  if (!TABLE_NAME_PATTERN.test(tableName)) {
    throw new Error("Invalid leads table name. Use only letters, numbers, and underscore.");
  }
  return tableName;
};

const getDbConfig = () => {
  const host = process.env.DB_HOST || "127.0.0.1";
  const port = Number(process.env.DB_PORT || 3306);
  const user = process.env.DB_USER || process.env.DB_USERNAME || "root";
  const password = process.env.DB_PASSWORD || "";
  const database = process.env.DB_NAME || process.env.DB_DATABASE;

  if (!database) {
    throw new Error("Missing DB_NAME or DB_DATABASE environment variable.");
  }

  return {
    host,
    port,
    user,
    password,
    database,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
  };
};

export const getPool = () => {
  if (!pool) {
    pool = mysql.createPool(getDbConfig());
  }
  return pool;
};

export const getLeadsTableName = (formSource = "header") => {
  const bucket = normalizeFormBucket(formSource);
  const config = getTableNameConfig();
  const tableName = config[bucket] || config.header;
  return assertValidTableName(tableName);
};

export const checkDbConnection = async () => {
  const db = getPool();
  await db.query("SELECT 1");
};

export const getLeadTableColumns = async (tableNameArg = "header") => {
  const tableName = getLeadsTableName(tableNameArg);
  const cached = cachedColumnsByTable.get(tableName);
  if (cached) return cached;
  const db = getPool();
  const [rows] = await db.query(`SHOW COLUMNS FROM \`${tableName}\``);
  const columns = new Set(rows.map((row) => row.Field));
  cachedColumnsByTable.set(tableName, columns);
  return columns;
};

export const query = async (sql, params = []) => {
  const db = getPool();
  const [rows] = await db.query(sql, params);
  return rows;
};
