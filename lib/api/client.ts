// src/lib/api/client.ts

interface GetConfig {
  headers?: Record<string, string>;
  cache?: RequestCache;
  requireAuth?: boolean;
  revalidate?: number;
}

// Simple token getter
const getAuthToken = async (): Promise<string | null> => {
  return process.env.API_TOKEN || null;
};

/**
 * GET API Interceptor
 */
export async function get<T = unknown>(
  endpoint: string,
  config: GetConfig = {}
): Promise<T> {
  const {
    headers = {},
    cache = "no-store",
    requireAuth = false,
    revalidate,
  } = config;

  const requestHeaders: Record<string, string> = {
    Accept: "application/json",
    ...headers,
  };

  // Add auth if required
  if (requireAuth) {
    const token = await getAuthToken();
    if (token) {
      requestHeaders["Authorization"] = `Bearer ${token}`;
    }
  }

  const baseUrl = process.env.API_BASE_URL || "https://fakestoreapi.com";
  const url = `${baseUrl}${endpoint}`;

  const response = await fetch(url, {
    method: "GET",
    headers: requestHeaders,
    cache,
    next: {
      revalidate: revalidate || 0,
    },
  });

  if (!response.ok) {
    if (response.status === 401) throw new Error("Unauthorized");
    if (response.status === 404) throw new Error("Not found");
    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
  }

  return response.json() as Promise<T>;
}
