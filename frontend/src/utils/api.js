const API = "http://localhost:5001/api";

export const request = async (url, method = "GET", body, token) => {
  const res = await fetch(`${API}${url}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` })
    },
    body: body ? JSON.stringify(body) : undefined,
    credentials: "include"
  });

  const text = await res.text();

  try {
    return JSON.parse(text);
  } catch {
    throw new Error(text);
  }
};