const express = require("express");
const router = express.Router();
const experienceModel = require("../models/experienceModal");

// Create Experience
router.post("/", async (req, res) => {
  const { resume_id, job_title, company_name, address, start_date, end_date, description } = req.body;

  try {
    const newExperience = await experienceModel.create({
      resume_id,
      job_title,
      company_name,
      address,
      start_date,
      end_date,
      description,
    });

    res.status(201).json(newExperience);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create experience" });
  }
});

// Get All Experiences by Resume ID
router.get("/:resume_id", async (req, res) => {
  const { resume_id } = req.params;

  try {
    const experiences = await experienceModel.findAll({
      where: { resume_id },
      order: [["start_date", "DESC"]],
    });

    if (experiences.length > 0) {
      res.status(200).json(experiences);
    } else {
      res.status(404).json({ message: "No experiences found for this resume_id" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch experiences" });
  }
});

// **Update Experience**
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { job_title, company_name, address, start_date, end_date, description } = req.body;

  try {
    const updatedExperience = await experienceModel.update(
      { job_title, company_name, address, start_date, end_date, description },
      { where: { id } }
    );

    if (updatedExperience[0] > 0) {
      res.status(200).json({ message: "Experience updated successfully" });
    } else {
      res.status(404).json({ message: "Experience not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update experience" });
  }
});

// **Delete Experience**
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const deletedExperience = await experienceModel.destroy({
      where: { id },
    });

    if (deletedExperience) {
      res.status(200).json({ message: "Experience deleted successfully" });
    } else {
      res.status(404).json({ message: "Experience not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete experience" });
  }
});

module.exports = router;
