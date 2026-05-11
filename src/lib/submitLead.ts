export interface LeadPayload {
  name: string;
  mobile: string;
  email: string;
  service: string;
  stage: string;
  formSource: string;
}

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const extractErrorMessage = (body: unknown): string => {
  if (!body || typeof body !== "object") return "";

  const payload = body as {
    error?: unknown;
    message?: unknown;
  };

  if (typeof payload.error === "string" && payload.error.trim()) return payload.error.trim();
  if (payload.error && typeof payload.error === "object") {
    const nested = payload.error as { message?: unknown; code?: unknown };
    if (typeof nested.message === "string" && nested.message.trim()) return nested.message.trim();
    if (typeof nested.code === "string" && nested.code.trim()) return `Error code: ${nested.code.trim()}`;
  }
  if (typeof payload.message === "string" && payload.message.trim()) return payload.message.trim();

  return "";
};

const submitOnce = async (endpoint: string, payload: LeadPayload) => {
  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    let errorMessage = "";
    const contentType = (response.headers.get("content-type") || "").toLowerCase();

    if (contentType.includes("application/json")) {
      try {
        const body = await response.json();
        errorMessage = extractErrorMessage(body);
      } catch {
        // Ignore JSON parse failures and fall through.
      }
    } else {
      try {
        const bodyText = (await response.text()).trim();
        const isHtml = /^<!doctype html>|^<html[\s>]/i.test(bodyText);
        if (isHtml && endpoint.startsWith("/api/")) {
          errorMessage = "Lead API route not found. Start `npm run dev:server` or set `VITE_LEAD_API_URL`.";
        } else if (bodyText) {
          errorMessage = bodyText.slice(0, 180);
        }
      } catch {
        // Ignore text parse failures and use fallback below.
      }
    }

    if (!errorMessage) {
      errorMessage = `Failed to submit lead form (HTTP ${response.status}).`;
    }
    throw new Error(errorMessage);
  }
};

export const submitLead = async (endpoint: string, payload: LeadPayload) => {
  try {
    await submitOnce(endpoint, payload);
  } catch (error) {
    if (error instanceof TypeError) {
      // Retry once for transient proxy/backend socket resets in local dev.
      await wait(450);
      await submitOnce(endpoint, payload);
      return;
    }
    throw error;
  }
};
