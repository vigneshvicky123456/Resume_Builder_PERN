const express = require("express");
const router = express.Router();
const referenceModel = require("../models/referenceModal");

// Create a Reference
router.post("/", async (req, res) => {
  const { resume_id, first_name, last_name, position_title, email, phone, company_name, relationship_to_you } = req.body;

  try {
    const newReference = await referenceModel.create({
      resume_id,
      first_name,
      last_name,
      position_title,
      email,
      phone,
      company_name,
      relationship_to_you
    });

    res.status(201).json(newReference);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create reference" });
  }
});

// Get Reference by Resume ID
router.get("/:resume_id", async (req, res) => {
  const { resume_id } = req.params;

  try {
    const references = await referenceModel.findAll({
      where: { resume_id },
    });

    if (references.length > 0) {
      res.status(200).json(references);
    } else {
      res.status(404).json({ message: "No references found for this resume_id" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch references" });
  }
});

// Update a Reference
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { first_name, last_name, position_title, email, phone, company_name, relationship_to_you } = req.body;

  try {
    const updatedReference = await referenceModel.update(
      { first_name, last_name, position_title, email, phone, company_name, relationship_to_you },
      { where: { id } }
    );

    if (updatedReference[0] > 0) {
      res.status(200).json({ message: "Reference updated successfully" });
    } else {
      res.status(404).json({ message: "Reference not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update reference" });
  }
});

// Delete a Reference
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const deletedReference = await referenceModel.destroy({
      where: { id },
    });

    if (deletedReference) {
      res.status(200).json({ message: "Reference deleted successfully" });
    } else {
      res.status(404).json({ message: "Reference not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete reference" });
  }
});

module.exports = router;
