import "server-only";

import { getApiConfig } from "./config";

const networkParameters = ["city", "search", "page", "pageSize"] as const;

export async function fetchNetworkFromBackend(searchParams: URLSearchParams) {
  const config = getApiConfig();
  const url = new URL(config.endpoints.network, config.baseUrl);

  for (const parameter of networkParameters) {
    const value = searchParams.get(parameter);
    if (value) {
      url.searchParams.set(parameter, value);
    }
  }

  return fetch(url, {
    headers: {
      Accept: "application/json",
      "X-API-Key": config.apiKey,
    },
    cache: "no-store",
  });
}
