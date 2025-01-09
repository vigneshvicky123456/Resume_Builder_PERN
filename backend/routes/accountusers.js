const express = require('express');
const router = express.Router();
const accountUserModel = require('../models/accountUserModal');

// Register a new user
router.post('/register', async (req, res) => {
  try {
    const { clerkUserId, email, firstName, lastName, imageUrl } = req.body;

    // Validate required fields
    if (!clerkUserId || !email || !firstName || !lastName || !imageUrl) {
      return res.status(400).json({ error: 'Missing required fields.' });
    }

    // Check if user already exists
    const existingUser = await accountUserModel.findOne({
      where: { clerkUserId },
    });

    if (existingUser) {
      const user = await accountUserModel.findOne({ where: { clerkUserId } });
      
      return res.status(409).json({ message: 'User already exists' });
    }

    // Create a new user
    const fullName = `${firstName} ${lastName}`;
    const newUser = await accountUserModel.create({
      clerkUserId,
      email,
      firstName,
      lastName,
      fullName,
      imageUrl,
    });

    res.status(201).json({ message: 'User created successfully', user: newUser });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Fetch the current user
router.get('/:clerkUserId', async (req, res) => {
  try {
    const { clerkUserId } = req.params; // Get clerkUserId from URL parameters

    const user = await accountUserModel.findOne({ where: { clerkUserId } });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({ user });
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
