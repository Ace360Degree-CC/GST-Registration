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
    let errorMessage = "Failed to submit lead form.";
    try {
      const body = await response.json();
      if (body?.error) errorMessage = body.error;
    } catch {
      // Ignore JSON parse failures and use fallback message.
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
