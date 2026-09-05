const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 5000;
const DB_FILE = path.join(__dirname, "db.json");

app.use(cors());
app.use(express.json());

function readDB() {
  return JSON.parse(fs.readFileSync(DB_FILE, "utf-8"));
}

function writeDB(data) {
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
}

// SERVICES
app.get("/api/services", (req, res) => res.json(readDB().services));

app.post("/api/services", (req, res) => {
  const db = readDB();
  const newService = { id: Date.now(), ...req.body };
  db.services.push(newService);
  writeDB(db);
  res.json(newService);
});

app.put("/api/services/:id", (req, res) => {
  const db = readDB();
  const id = parseInt(req.params.id);
  db.services = db.services.map((s) => (s.id === id ? { ...s, ...req.body, id } : s));
  writeDB(db);
  res.json({ success: true });
});

app.delete("/api/services/:id", (req, res) => {
  const db = readDB();
  db.services = db.services.filter((s) => s.id !== parseInt(req.params.id));
  writeDB(db);
  res.json({ success: true });
});

// BOOKINGS
app.get("/api/bookings", (req, res) => res.json(readDB().bookings));

app.post("/api/bookings", (req, res) => {
  const db = readDB();
  const newBooking = {
    id: `BRG${Date.now().toString(36).toUpperCase()}`,
    ...req.body,
    status: "pending",
    createdAt: new Date().toISOString(),
  };
  db.bookings.push(newBooking);
  writeDB(db);
  res.json(newBooking);
});

app.put("/api/bookings/:id", (req, res) => {
  const db = readDB();
  db.bookings = db.bookings.map((b) => (b.id === req.params.id ? { ...b, ...req.body } : b));
  writeDB(db);
  res.json({ success: true });
});

app.delete("/api/bookings/:id", (req, res) => {
  const db = readDB();
  db.bookings = db.bookings.filter((b) => b.id !== req.params.id);
  writeDB(db);
  res.json({ success: true });
});

app.listen(PORT, () => console.log(`Backend running at http://localhost:${PORT}`));
