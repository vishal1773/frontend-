const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/dashboard', authMiddleware, (req, res) => {
  res.json({
    success: true,
    name: req.user.mobileNumber || 'Citizen',
    district: 'Madurai',
    rationCard: 'PHH-123456',
    quota: {
      rice: 20,
      sugar: 2,
      oil: 1,
    },
    notifications: [
      { title: 'Rice available from 20 June' },
      { title: 'Shop closed on Sunday' },
    ],
  });
});

module.exports = router;
