# Node Rate Limiting Patterns

This repository demonstrates how to implement rate limiting in a Node.js API using Express middleware. It focuses on understanding the core concepts behind rate limiting rather than relying on third-party libraries.

The implementation is intentionally simple and explicit to make the pattern easy to reason about and extend.

---

## Goals

- Protect APIs from excessive or abusive requests
- Demonstrate rate limiting as reusable middleware
- Keep logic framework-agnostic and easy to modify
- Provide predictable HTTP responses for clients

---

## Architecture Overview

Rate limiting is implemented as an Express middleware that sits between the incoming request and the route handler.

Each request is evaluated based on:

- Client identifier (IP address)
- Time window
- Maximum allowed requests

If the request exceeds the configured limit, the middleware blocks it before it reaches the route handler.

---

## Project Structure

```
src/
├── app.js
├── server.js
├── routes/
│   └── apiRoutes.js
├── middlewares/
│   └── rateLimiter.js
└── utils/
    └── response.js
```

---

## How It Works

- Requests are tracked in memory using a Map
- Each IP address has its own request counter
- Counters reset automatically after the time window expires
- Exceeded limits return HTTP status code 429

---

## Getting Started

### Install dependencies

```bash
npm install
```

### Run the server

```bash
npm start
```

The server runs on:

```
http://localhost:3000
```

---

## Example Endpoints

### Rate-limited endpoint

```
GET /api/limited
```

- Limited to 5 requests per minute per IP
- Returns HTTP 429 when the limit is exceeded

### Non-rate-limited endpoint

```
GET /api/unlimited
```

- No rate limiting applied

---

## Why This Pattern Matters

- Prevents accidental or malicious API abuse
- Improves system reliability
- Forms the foundation for more advanced rate-limiting strategies
- Encourages security-conscious API design

---

## Notes

- Uses in-memory storage and is not suitable for distributed systems
- Intended for learning and architectural reference
- Can be extended to use Redis or external stores for production use

---

## License

MIT
