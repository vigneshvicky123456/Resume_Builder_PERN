const express = require("express");
const router = express.Router();
const educationModel = require("../models/educationModal");

// Create Education Record
router.post("/", async (req, res) => {
  const {
    resume_id,
    institution_name,
    degree_of_program,
    cgpa,
    field_of_study,
    start_date,
    end_date,
    additional_details,
  } = req.body;

  try {
    const newEducation = await educationModel.create({
      resume_id,
      institution_name,
      degree_of_program,
      cgpa,
      field_of_study,
      start_date,
      end_date,
      additional_details,
    });

    res.status(201).json(newEducation);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create education record" });
  }
});

// Get All Education Records by Resume ID
router.get("/:resume_id", async (req, res) => {
  const { resume_id } = req.params;

  try {
    const educationRecords = await educationModel.findAll({
      where: { resume_id },
      order: [["start_date", "DESC"]],
    });

    if (educationRecords.length > 0) {
      res.status(200).json(educationRecords);
    } else {
      res.status(404).json({ message: "No education records found for this resume_id" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch education records" });
  }
});

// Update Education Record
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const {
    institution_name,
    degree_of_program,
    cgpa,
    field_of_study,
    start_date,
    end_date,
    additional_details,
  } = req.body;

  try {
    const updatedEducation = await educationModel.update(
      {
        institution_name,
        degree_of_program,
        cgpa,
        field_of_study,
        start_date,
        end_date,
        additional_details,
      },
      { where: { id } }
    );

    if (updatedEducation[0] > 0) {
      res.status(200).json({ message: "Education record updated successfully" });
    } else {
      res.status(404).json({ message: "Education record not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update education record" });
  }
});

// Delete Education Record
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const deletedEducation = await educationModel.destroy({
      where: { id },
    });

    if (deletedEducation) {
      res.status(200).json({ message: "Education record deleted successfully" });
    } else {
      res.status(404).json({ message: "Education record not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete education record" });
  }
});

module.exports = router;
