import "server-only";

/** Central configuration for the external backend API. */

export function getApiConfig() {
  const baseUrl = process.env.BACKEND_API_BASE_URL;
  const apiKey = process.env.BACKEND_API_KEY;

  if (!baseUrl || !apiKey) {
    throw new Error("Missing backend API configuration.");
  }

  return {
    baseUrl,
    apiKey,
    endpoints: {
      contact: "/api/contact",
      network: "/api/network.php",
    },
  } as const;
}
