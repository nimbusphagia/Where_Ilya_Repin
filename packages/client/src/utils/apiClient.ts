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
    const error = await response.json();
    throw new Error(error.message ?? "Something went wrong");
  }

  return response.json();
}

export default apiClient;
