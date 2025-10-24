import express from "express";
import cors from "cors";
import pool from "./Service.js";

import multer from "multer";
import path from "path";

// Folder to store uploaded complaint files
const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => cb(null, "uploads/"), // make sure uploads folder exists
    filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname)
  })
});

const app = express();
app.use(cors());
app.use(express.json()); // To read JSON body

// ✅ Signup API
app.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const connection = await pool.getConnection();
    await connection.query(
      "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
      [name, email, password]
    );
    connection.release();
    res.json({ message: "User registered successfully!" });
  } catch (err) {
    console.error(err);
    // Check for duplicate entry error (MySQL error code 1062)
    if (err.code === "ER_DUP_ENTRY") {
      res.status(400).json({ message: "Email already exists!" });
    } else {
      res.status(500).json({ message: "Signup failed! " + err.message });
    }
  }
});

// ✅ Login API
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.query(
      "SELECT id, name, email FROM users WHERE email = ? AND password = ?",
      [email, password]
    );
    connection.release();

    if (rows.length > 0) {
      res.json({
        success: true,
        message: "Login successful",
        user: rows[0]   // send user details
      });
    } else {
      res.status(401).json({ success: false, message: "Invalid email or password" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Login failed!" });
  }
});

// ✅ Submit Complaint
app.post("/complaints", upload.single("file"), async (req, res) => {
  const { id, user_id,type, subject, description, submittedDate, status, updates } = req.body;
  const filePath = req.file ? `/uploads/${req.file.filename}` : null;

  try {
    const connection = await pool.getConnection();
    await connection.query(
      `INSERT INTO complaints 
      (id, user_id,type, subject, description, file_name, submitted_date, status, updates) 
      VALUES (?,?, ?, ?, ?, ?, ?, ?, ?)`,
      [id, user_id,type, subject, description, filePath, submittedDate, status, updates]
    );
    connection.release();
    res.status(201).json({ message: "Complaint submitted successfully", complaintId: id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to submit complaint" });
  }
});

// ✅ Get complaint by ID
app.get("/complaints/:id", async (req, res) => {
  const complaintId = req.params.id;
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.query("SELECT * FROM complaints WHERE id = ?", [complaintId]);
    connection.release();

    if (rows.length === 0) {
      return res.status(404).json({ message: "Complaint not found" });
    }

    const complaint = rows[0];
    complaint.updates = JSON.parse(complaint.updates); // parse JSON updates
    res.json(complaint);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch complaint" });
  }
});

app.listen(5000, () => console.log("✅ Server is running on port 5000"));

// ✅ DB test connection
(async () => {
  try {
    const connection = await pool.getConnection();
    console.log("✅ DB connected successfully");
    connection.release();
  } catch (err) {
    console.error("❌ DB connection failed:", err.message);
  }
})();

// ✅ Get all complaints (or optionally filter by user)
app.get("/complaints", async (req, res) => {
  try {
    const userId = req.query.user_id; // optional: ?user_id=<id>
    const connection = await pool.getConnection();

    let query = "SELECT * FROM complaints";
    let params = [];

    if (userId) {
      query += " WHERE user_id = ?";
      params.push(userId);
    }

    query += " ORDER BY submitted_date DESC";

    const [rows] = await connection.query(query, params);
    connection.release();

    // Parse updates JSON
    const complaints = rows.map(c => ({ ...c, updates: JSON.parse(c.updates) }));

    res.json(complaints);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch complaints" });
  }
});
