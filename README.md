# JobBoard

A full-stack tech job board application. Companies can post jobs, candidates can search and filter listings, and every "Apply" click is tracked.

## Tech Stack

| Layer    | Technology                                       |
|----------|--------------------------------------------------|
| Backend  | Node.js, Fastify, Mongoose, MongoDB Atlas        |
| Frontend | React 19, Vite, Tailwind CSS v4, React Router v7 |

---

## Project Structure

```
jobapplicationpage/
├── src/                        # Backend (Fastify API)
│   ├── config/
│   │   ├── db.js               # MongoDB connection
│   │   └── env.js              # Environment variable loader
│   ├── controllers/
│   │   └── job.controller.js   # All job-related business logic
│   ├── middleware/
│   │   └── auth.js             # Bearer-token auth middleware
│   ├── models/
│   │   ├── Job.js              # Job schema + indexes
│   │   └── JobClick.js         # Click-tracking schema
│   ├── routes/
│   │   ├── health.routes.js    # GET /api/health
│   │   └── job.routes.js       # All /api/jobs routes
│   └── server.js               # App entrypoint
│
├── frontend/                   # Frontend (React + Vite)
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   └── Footer.jsx
│   │   ├── pages/
│   │   │   ├── LandingPage.jsx
│   │   │   ├── JobsPage.jsx
│   │   │   └── JobDetailsPage.jsx
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css           # Tailwind + global design tokens
│   ├── index.html
│   ├── vite.config.js
│   ├── .env                    # VITE_API_URL (not committed)
│   └── .env.example
│
├── .env                        # Backend env vars (not committed)
├── .env.example
└── package.json
```

---

## Getting Started

### 1 – Backend

```bash
# Install dependencies
npm install

# Copy the env template and fill in your MongoDB URI
cp .env.example .env

# Start in dev mode (auto-restarts on changes)
npm run dev
```

The API will be available at `http://localhost:4000`.

### 2 – Frontend

```bash
cd frontend

# Install dependencies
npm install

# Start the dev server
npm run dev
```

The app will open at `http://localhost:5500`.

---

## API Overview

| Method | Endpoint                   | Auth? | Description                        |
|--------|----------------------------|-------|------------------------------------|
| GET    | `/api/health`              | –     | Health check                       |
| GET    | `/api/jobs`                | –     | List jobs (search, filter, paginate)|
| GET    | `/api/jobs/:id`            | –     | Get a single job                   |
| GET    | `/api/jobs/:id/apply`      | –     | Track click + redirect to apply URL|
| POST   | `/api/jobs`                | ✓     | Create a job                       |
| PATCH  | `/api/jobs/:id`            | ✓     | Update a job                       |
| DELETE | `/api/jobs/:id`            | ✓     | Soft-delete a job                  |
| GET    | `/api/jobs/:id/clicks`     | ✓     | Get click analytics for a job      |
| POST   | `/api/dev/seed`            | ✓     | Seed sample data (dev only)        |

Protected routes require `Authorization: Bearer <API_KEY>` from your `.env`.
