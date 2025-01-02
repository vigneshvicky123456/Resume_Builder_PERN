const express = require('express');
const router = express.Router();
//const { requireAuth } = require('@clerk/clerk-sdk-node');
const accountUserModel = require('../models/accountUserModal');
require('dotenv').config();

const {clerkClient, requireAuth} = require('@clerk/express');
const clerkAuth = requireAuth();

// Register a new user
// Create a new user
router.post('/register', clerkAuth, async (req, res) => {
    try {
      const { userId } = req.auth;
      const { email, firstName, lastName, imageUrl } = req.body;
  
      // Check if user already exists
      const existingUser = await accountUserModel.findOne({
        where: { clerkUserId: userId },
      });
      if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
      }
  
      // Create a new user
      const fullName = `${firstName} ${lastName}`;
      const newUser = await accountUserModel.create({
        clerkUserId: userId,
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
router.get('/me', clerkAuth, async (req, res) => {
    try {
      const { userId } = req.auth;
  
      // Fetch the user from the database
      const user = await accountUserModel.findOne({ where: { clerkUserId: userId } });
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      res.status(200).json({ user });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;
