export interface LeadPayload {
  name: string;
  mobile: string;
  email: string;
  service: string;
  stage: string;
  formSource: string;
}

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

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
        if (body?.error) errorMessage = body.error;
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
