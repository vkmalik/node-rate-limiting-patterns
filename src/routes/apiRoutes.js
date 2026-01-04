const express = require('express');

const router = express.Router();

router.get('/limited', (req, res) => {
  res.json({
    success: true,
    message: 'You are within the rate limit',
  });
});

router.get('/unlimited', (req, res) => {
  res.json({
    success: true,
    message: 'This endpoint is not rate-limited',
  });
});

module.exports = router;
