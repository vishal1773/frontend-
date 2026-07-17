const express = require('express');
const jwt = require('jsonwebtoken');
const { createUser, findUserByMobile, addOtp, verifyOtp } = require('../services/authService');

const router = express.Router();

router.post('/send-otp', async (req, res) => {
  const { mobileNumber } = req.body;

  if (!mobileNumber) {
    return res.status(400).json({ success: false, message: 'Mobile number is required' });
  }

  const otp = '123456';
  await addOtp(mobileNumber, otp);

  return res.json({ success: true, message: 'OTP sent successfully', otp });
});

router.post('/verify-otp', async (req, res) => {
  const { mobileNumber, otp } = req.body;

  if (!mobileNumber || !otp) {
    return res.status(400).json({ success: false, message: 'Mobile number and OTP are required' });
  }

  const isValidOtp = await verifyOtp(mobileNumber, otp);

  if (!isValidOtp) {
    return res.status(401).json({ success: false, message: 'Invalid OTP' });
  }

  const user = findUserByMobile(mobileNumber) || createUser({
    name: 'Sample User',
    mobileNumber,
    role: 'Citizen',
    district: 'Madurai',
    aadhaarNumber: '123412341234',
    address: 'Sample Address',
  });

  const token = jwt.sign({ id: user.id, mobileNumber: user.mobileNumber, role: user.role }, process.env.JWT_SECRET || 'dev-secret', { expiresIn: '1h' });

  return res.json({ success: true, message: 'OTP verified successfully', token, user: { id: user.id, name: user.name, role: user.role, district: user.district } });
});

router.post('/login', async (req, res) => {
  const { mobileNumber } = req.body;

  if (!mobileNumber) {
    return res.status(400).json({ success: false, message: 'Mobile number is required' });
  }

  const user = findUserByMobile(mobileNumber);

  if (!user) {
    return res.status(404).json({ success: false, message: 'User not found' });
  }

  const token = jwt.sign({ id: user.id, mobileNumber: user.mobileNumber, role: user.role }, process.env.JWT_SECRET || 'dev-secret', { expiresIn: '1h' });

  return res.json({ success: true, message: 'Login successful', token, user: { id: user.id, name: user.name, role: user.role, district: user.district } });
});

router.post('/register', async (req, res) => {
  const { name, mobileNumber, role, district, aadhaarNumber, address } = req.body;

  if (!name || !mobileNumber) {
    return res.status(400).json({ success: false, message: 'Name and mobile number are required' });
  }

  const user = createUser({ name, mobileNumber, role, district, aadhaarNumber, address });
  const token = jwt.sign({ id: user.id, mobileNumber: user.mobileNumber, role: user.role }, process.env.JWT_SECRET || 'dev-secret', { expiresIn: '1h' });

  return res.json({ success: true, message: 'User registered successfully', token, user: { id: user.id, name: user.name, role: user.role, district: user.district } });
});

module.exports = router;
