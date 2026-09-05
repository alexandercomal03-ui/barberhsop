const API_URL = "http://localhost:5000/api";

export async function fetchServices() {
  const res = await fetch(`${API_URL}/services`);
  return res.json();
}

export async function createService(data) {
  const res = await fetch(`${API_URL}/services`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function updateService(id, data) {
  const res = await fetch(`${API_URL}/services/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function deleteService(id) {
  const res = await fetch(`${API_URL}/services/${id}`, { method: "DELETE" });
  return res.json();
}

export async function fetchBookings() {
  const res = await fetch(`${API_URL}/bookings`);
  return res.json();
}

export async function updateBooking(id, data) {
  const res = await fetch(`${API_URL}/bookings/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function deleteBooking(id) {
  const res = await fetch(`${API_URL}/bookings/${id}`, { method: "DELETE" });
  return res.json();
}
