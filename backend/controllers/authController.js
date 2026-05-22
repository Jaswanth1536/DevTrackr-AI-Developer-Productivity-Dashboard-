const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { getIsMockDB } = require('../config/db');
const { store, saveDb } = require('../config/mockDb');

// Helper to generate token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'supersecretdevtrackrtokenkey123!', {
    expiresIn: '30d'
  });
};

// @desc    Register user
// @route   POST /api/auth/signup
// @access  Public
const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ success: false, message: 'Please add all fields' });
    }

    let userExists;

    if (getIsMockDB()) {
      userExists = store.users.some(u => u.email === email || u.username === username);
    } else {
      userExists = await User.findOne({ $or: [{ email }, { username }] });
    }

    if (userExists) {
      return res.status(400).json({ success: false, message: 'User already exists' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    let newUser;

    if (getIsMockDB()) {
      newUser = {
        _id: 'mock_usr_' + Math.random().toString(36).substring(2, 9),
        username,
        email,
        password: hashedPassword,
        githubToken: null,
        createdAt: new Date()
      };
      store.users.push(newUser);
      saveDb();
    } else {
      newUser = await User.create({
        username,
        email,
        password: hashedPassword
      });
    }

    res.status(201).json({
      success: true,
      data: {
        _id: newUser._id,
        username: newUser.username,
        email: newUser.email,
        githubToken: newUser.githubToken,
        token: generateToken(newUser._id)
      }
    });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ success: false, message: 'Server error during signup' });
  }
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Please add email and password' });
    }

    let user;

    if (getIsMockDB()) {
      user = store.users.find(u => u.email === email);
    } else {
      user = await User.findOne({ email });
    }

    if (!user) {
      return res.status(400).json({ success: false, message: 'Invalid credentials' });
    }

    // Verify password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ success: false, message: 'Invalid credentials' });
    }

    res.status(200).json({
      success: true,
      data: {
        _id: user._id,
        username: user.username,
        email: user.email,
        githubToken: user.githubToken,
        token: generateToken(user._id)
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ success: false, message: 'Server error during login' });
  }
};

// @desc    Get current user profile
// @route   GET /api/auth/me
// @access  Private
const getMe = async (req, res) => {
  try {
    // req.user is set by protect middleware
    res.status(200).json({
      success: true,
      data: req.user
    });
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({ success: false, message: 'Server error fetching user details' });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getMe
};
