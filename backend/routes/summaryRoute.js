const express = require("express");
const router = express.Router();
const summaryModal = require("../models/summaryModal");

// Create a Summary
router.post("/", async (req, res) => {
  const { resume_id, summary } = req.body;

  try {
    const newSummary = await summaryModal.create({
      resume_id,
      summary,
    });

    res.status(201).json(newSummary);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create summary record" });
  }
});

// Get Summary by Resume ID
router.get("/:resume_id", async (req, res) => {
  const { resume_id } = req.params;

  try {
    const summary = await summaryModal.findOne({
      where: { resume_id },
    });

    if (summary) {
      res.status(200).json(summary);
    } else {
      res.status(404).json({ message: "No summary found for this resume_id" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch summary" });
  }
});

// Update a Summary
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { summary } = req.body;

  try {
    const updatedSummary = await summaryModal.update(
      { summary },
      { where: { id } }
    );

    if (updatedSummary[0] > 0) {
      res.status(200).json({ message: "Summary record updated successfully" });
    } else {
      res.status(404).json({ message: "Summary record not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update summary record" });
  }
});

// Delete a Summary
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const deletedSummary = await summaryModal.destroy({
      where: { id },
    });

    if (deletedSummary) {
      res.status(200).json({ message: "Summary record deleted successfully" });
    } else {
      res.status(404).json({ message: "Summary record not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete summary record" });
  }
});

module.exports = router;
