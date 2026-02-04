const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/auth");
const assignmentRoutes = require("./routes/assignment");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// 🔥 ABSOLUTE PATH TO FRONTEND
const frontendPath = path.join(__dirname, "..", "frontend");
app.use(express.static(frontendPath));

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/assignment", assignmentRoutes);

// Catch-all (VERY IMPORTANT: must be LAST)
app.get("*", (req, res) => {
  res.sendFile(path.join(frontendPath, "index.html"));
});

// DB + Server
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () =>
      console.log(`Server running on port ${PORT}`)
    );
  })
  .catch(err => console.error("DB Error:", err));
