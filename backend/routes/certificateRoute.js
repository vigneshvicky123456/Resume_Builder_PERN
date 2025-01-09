const express = require("express");
const router = express.Router();
const certificateModal = require("../models/certificateModal");

// Create Certificate 
router.post("/", async (req, res) => {
  const { resume_id, certificte_name } = req.body;

  try {
    const newCertificate = await certificateModal.create({
      resume_id,
      certificte_name,
    });

    res.status(201).json(newCertificate);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create certificate record" });
  }
});

// Get All Certificates by Resume ID
router.get("/:resume_id", async (req, res) => {
  const { resume_id } = req.params;

  try {
    const certificates = await certificateModal.findAll({
      where: { resume_id },
      order: [["id", "ASC"]],
    });

    if (certificates.length > 0) {
      res.status(200).json(certificates);
    } else {
      res.status(404).json({ message: "No certificates found for this resume_id" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch certificates" });
  }
});

// Update Certificate Record
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { certificte_name } = req.body;

  try {
    const updatedCertificate = await certificateModal.update(
      { certificte_name },
      { where: { id } }
    );

    if (updatedCertificate[0] > 0) {
      res.status(200).json({ message: "Certificate record updated successfully" });
    } else {
      res.status(404).json({ message: "Certificate record not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update certificate record" });
  }
});

// **Delete Certificate Record**
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const deletedCertificate = await certificateModal.destroy({
      where: { id },
    });

    if (deletedCertificate) {
      res.status(200).json({ message: "Certificate record deleted successfully" });
    } else {
      res.status(404).json({ message: "Certificate record not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete certificate record" });
  }
});

module.exports = router;
