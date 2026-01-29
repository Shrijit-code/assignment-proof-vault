const express = require("express");
const Assignment = require("../models/Assignment");

const router = express.Router();

// submit assignment (student)
router.post("/submit", async (req, res) => {
  try {
    const { studentId, fileUrl } = req.body;

    const assignment = new Assignment({
      student: studentId,
      fileUrl,
    });

    await assignment.save();
    res.status(201).json({ message: "Assignment submitted" });
  } catch (err) {
    res.status(500).json({ error: "Submission failed" });
  }
});

// teacher views assignment
router.put("/view/:id", async (req, res) => {
  try {
    const assignment = await Assignment.findById(req.params.id);
    if (!assignment) {
      return res.status(404).json({ error: "Assignment not found" });
    }

    assignment.viewedByTeacher = true;
    assignment.viewedAt = new Date();
    await assignment.save();

    res.json({ message: "Assignment marked as viewed" });
  } catch (err) {
    res.status(500).json({ error: "Update failed" });
  }
});

module.exports = router;
