const express = require('express');
const rateLimiter = require('../middlewares/rateLimiter');

const router = express.Router();

router.get(
  '/limited',
  rateLimiter({ windowMs: 60_000, maxRequests: 5 }),
  (req, res) => {
    res.json({
      success: true,
      message: 'You are within the rate limit',
    });
  }
);

router.get('/unlimited', (req, res) => {
  res.json({
    success: true,
    message: 'This endpoint is not rate-limited',
  });
});

module.exports = router;
