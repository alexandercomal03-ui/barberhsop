const API_URL = "https://barberhsop-production.up.railway.app/api";

export async function fetchServices() {
  const res = await fetch(`${API_URL}/services`);
  return res.json();
}

export async function createBooking(data) {
  const res = await fetch(`${API_URL}/bookings`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}
