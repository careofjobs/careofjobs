# JobBoard

A full-stack tech job board. Candidates search and filter job listings; every "Apply Now" click is tracked.

## Project Structure

```
jobapplicationpage/
|-- backend/                        # Node.js + Fastify API
|   |-- src/
|   |   |-- config/
|   |   |   |-- db.js               # MongoDB connection
|   |   |   `-- env.js              # Env variable loader
|   |   |-- controllers/
|   |   |   `-- job.controller.js   # All business logic
|   |   |-- middleware/
|   |   |   `-- auth.js             # Bearer-token auth
|   |   |-- models/
|   |   |   |-- Job.js              # Job schema
|   |   |   `-- JobClick.js         # Click-tracking schema
|   |   |-- routes/
|   |   |   |-- health.routes.js
|   |   |   `-- job.routes.js
|   |   `-- server.js
|   |-- .env                        # (not committed)
|   |-- .env.example
|   `-- package.json
|
|-- frontend/                       # React 19 + Vite + Tailwind CSS v4
|   |-- src/
|   |   |-- components/
|   |   |   |-- Navbar.jsx
|   |   |   `-- Footer.jsx
|   |   |-- pages/
|   |   |   |-- LandingPage.jsx
|   |   |   |-- JobsPage.jsx
|   |   |   `-- JobDetailsPage.jsx
|   |   |-- App.jsx
|   |   |-- main.jsx
|   |   `-- index.css
|   |-- index.html
|   |-- vite.config.js
|   |-- .env                        # (not committed)
|   |-- .env.example
|   `-- package.json
|
|-- .gitignore
`-- README.md
```

## Getting Started

### Backend

```bash
cd backend
npm install
cp .env.example .env   # fill in MONGODB_URI and API_KEY
npm run dev            # http://localhost:4000
# On first run in development, the server seeds some sample jobs automatically when the jobs collection is empty.
```

> In development mode the server falls back to an in-memory MongoDB automatically if Atlas is unreachable.

### Frontend

```bash
cd frontend
npm install
npm run dev            # http://localhost:5500
```

## API Reference

| Method | Endpoint               | Auth | Description                        |
|--------|------------------------|------|------------------------------------|
| GET    | /api/health            |      | Health check                       |
| GET    | /api/jobs              |      | List jobs (search, filter, paginate)|
| GET    | /api/jobs/:id          |      | Get one job                        |
| GET    | /api/jobs/:id/apply    |      | Track click + redirect             |
| POST   | /api/jobs              | Yes  | Create job                         |
| PATCH  | /api/jobs/:id          | Yes  | Update job                         |
| DELETE | /api/jobs/:id          | Yes  | Soft-delete job                    |
| GET    | /api/jobs/:id/clicks   | Yes  | Click analytics                    |
| POST   | /api/dev/seed          | Yes  | Seed sample data (dev only)        |

Protected routes require: `Authorization: Bearer <API_KEY>`
