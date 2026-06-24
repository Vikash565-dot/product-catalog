const baseURL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

export const api = {
  async get(url) {
    const response = await fetch(`${baseURL}${url}`);

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    return {
      data: await response.json(),
    };
  },
};