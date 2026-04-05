const BASE_URL = import.meta.env.VITE_API_URL;

async function apiClient<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
    ...options,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    const err = new Error(error.message ?? "Something went wrong");
    (err as any).status = response.status;
    throw err;
  }
  return response.json();
}

export default apiClient;
