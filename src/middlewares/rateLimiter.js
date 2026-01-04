const requests = new Map();

const rateLimiter = ({ windowMs = 60_000, maxRequests = 5 } = {}) => {
  return (req, res, next) => {
    const key = req.ip;
    const now = Date.now();

    const entry = requests.get(key) || { count: 0, startTime: now };

    if (now - entry.startTime > windowMs) {
      entry.count = 1;
      entry.startTime = now;
    } else {
      entry.count += 1;
    }

    requests.set(key, entry);

    if (entry.count > maxRequests) {
      return res.status(429).json({
        success: false,
        message: 'Too many requests. Please try again later.',
      });
    }

    next();
  };
};

module.exports = rateLimiter;
