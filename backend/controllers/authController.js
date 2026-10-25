import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'secret123', {
    expiresIn: '30d',
  });
};

export const loginAdmin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id),
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const registerInitialAdmin = async (req, res) => {
  // Only allow if no users exist (for first time setup)
  try {
    const userCount = await User.countDocuments();
    if (userCount > 0) {
      return res.status(403).json({ message: 'Admin already exists' });
    }
    
    const { name, email, password } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: 'superadmin'
    });

    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
      });
    } else {
      res.status(400).json({ message: 'Invalid user data' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAdminProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateAdminCredentials = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const { email, currentPassword, newPassword } = req.body;

    // Verify current password for security
    if (!currentPassword || !currentPassword.trim()) {
      return res.status(400).json({ message: 'Current password is required to save changes' });
    }

    const trimmedCurrent = currentPassword.trim();
    const isMatch = (await bcrypt.compare(trimmedCurrent, user.password)) || (await bcrypt.compare(currentPassword, user.password));
    if (!isMatch) {
      return res.status(400).json({ message: 'Incorrect current password' });
    }

    // Update email if changed
    if (email && email.trim() && email.trim().toLowerCase() !== user.email.toLowerCase()) {
      const emailLower = email.trim().toLowerCase();
      const existing = await User.findOne({ email: emailLower });
      if (existing && existing._id.toString() !== user._id.toString()) {
        return res.status(400).json({ message: 'This email is already in use by another account' });
      }
      user.email = emailLower;
    }

    // Update password if new password provided
    if (newPassword && newPassword.trim()) {
      if (newPassword.trim().length < 6) {
        return res.status(400).json({ message: 'New password must be at least 6 characters' });
      }
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(newPassword.trim(), salt);
    }

    await user.save();

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id),
      message: 'Admin credentials updated successfully'
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

