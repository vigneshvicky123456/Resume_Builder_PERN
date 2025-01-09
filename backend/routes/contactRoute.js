const express = require('express');
const router = express.Router();
const contactModel = require("../models/contactModal"); 

// Get All Contacts
router.get('/:resume_id', async (req, res) => {
  const { resume_id } = req.params;
  try {
    const contacts = await contactModel.findAll({
      where: { resume_id }
    });
    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch contacts" });
  }
});

// Post Create Contact
router.post('/', async (req, res) => {
  const {
    resume_id,
    imageUrl,
    first_name,
    last_name,
    job_title,
    phone,
    email,
    address,
    date_of_birth,
    website,
    linkedin,
  } = req.body;

  try {
    const newContact = await contactModel.create({
      resume_id,
      imageUrl,
      first_name,
      last_name,
      job_title,
      phone,
      email,
      address,
      date_of_birth,
      website,
      linkedin,
    });
    res.status(201).json(newContact);
  } catch (error) {
    res.status(400).json({ error: "Failed to create contact" });
  }
});

// Get Contact By ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const contact = await contactModel.findByPk(id);
    if (contact) {
      res.status(200).json(contact);
    } else {
      res.status(404).json({ error: "Contact not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch contact" });
  }
});

// Put Update Contact
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const {
    imageUrl,
    first_name,
    last_name,
    job_title,
    phone,
    email,
    address,
    date_of_birth,
    website,
    linkedin,
  } = req.body;

  try {
    const updated = await contactModel.update(
      {
        imageUrl,
        first_name,
        last_name,
        job_title,
        phone,
        email,
        address,
        date_of_birth,
        website,
        linkedin,
      },
      { where: { id } }
    );

    if (updated[0] > 0) {
      res.status(200).json({ message: "Contact updated successfully" });
    } else {
      res.status(404).json({ error: "Contact not found" });
    }
  } catch (error) {
    res.status(400).json({ error: "Failed to update contact" });
  }
});

// Delete Contact
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await contactModel.destroy({ where: { id } });
    if (deleted) {
      res.status(200).json({ message: "Contact deleted successfully" });
    } else {
      res.status(404).json({ error: "Contact not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to delete contact" });
  }
});

module.exports = router;
