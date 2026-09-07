const API_URL =
  import.meta.env.VITE_API_URL ||
  (import.meta.env.PROD ? "/api" : "http://localhost:5000/api");

export async function submitContactForm(formData) {
  const response = await fetch(`${API_URL}/contact`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  const contentType = response.headers.get("content-type") || "";
  const data = contentType.includes("application/json")
    ? await response.json()
    : { message: "The contact service is unavailable. Please try again later." };

  if (!response.ok) {
    throw new Error(
      data.message || "Unable to send your message."
    );
  }

  return data;
}