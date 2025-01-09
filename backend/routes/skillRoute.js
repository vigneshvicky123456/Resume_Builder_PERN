const express = require("express");
const router = express.Router();
const skillModal = require("../models/skillModal");

// Create a Skill
router.post("/", async (req, res) => {
  const { resume_id, skill_name } = req.body;

  try {
    const newSkill = await skillModal.create({
      resume_id,
      skill_name,
    });

    res.status(201).json(newSkill);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create skill record" });
  }
});

// Get All Skills by Resume ID
router.get("/:resume_id", async (req, res) => {
  const { resume_id } = req.params;

  try {
    const skills = await skillModal.findAll({
      where: { resume_id },
      order: [["id", "ASC"]],
    });

    if (skills.length > 0) {
      res.status(200).json(skills);
    } else {
      res.status(404).json({ message: "No skills found for this resume_id" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch skills" });
  }
});

// Update a Skill
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { skill_name } = req.body;

  try {
    const updatedSkill = await skillModal.update(
      { skill_name },
      { where: { id } }
    );

    if (updatedSkill[0] > 0) {
      res.status(200).json({ message: "Skill record updated successfully" });
    } else {
      res.status(404).json({ message: "Skill record not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update skill record" });
  }
});

// Delete a Skill
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const deletedSkill = await skillModal.destroy({
      where: { id },
    });

    if (deletedSkill) {
      res.status(200).json({ message: "Skill record deleted successfully" });
    } else {
      res.status(404).json({ message: "Skill record not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete skill record" });
  }
});

module.exports = router;
