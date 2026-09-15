# Interview Master

AI-powered interview preparation app. Upload your resume (or describe yourself), paste a job description, and get a personalized interview plan with technical questions, behavioral questions, skill gap analysis, a preparation roadmap, and a tailored resume PDF.

## Features

- User authentication (register, login, logout)
- PDF resume upload and parsing
- AI-generated interview reports via Google Gemini
- Technical and behavioral question bank with model answers
- Day-by-day preparation roadmap
- Skill gap analysis with severity levels
- ATS-friendly resume PDF download

## Tech Stack

- **Frontend:** React, Vite, React Router, Axios, SCSS
- **Backend:** Node.js, Express, MongoDB, Mongoose
- **AI:** Google GenAI (Gemini)
- **PDF:** pdf-parse (input), Puppeteer (output)

## Prerequisites

- Node.js 18+
- MongoDB database (local or Atlas)
- Google GenAI API key

## Setup

### 1. Backend

```bash
cd Backend
cp .env.example .env
# Fill in MONGO_URI, JWT_SECRET, and GOOGLE_GENAI_API_KEY in .env
npm install
npx puppeteer browsers install chrome
npm run dev
```

The API runs at `http://localhost:3001`.

### 2. Frontend

```bash
cd Frontend
npm install
npm run dev
```

The app runs at `http://localhost:5173`.

## Environment Variables

| Variable | Description |
|---|---|
| `MONGO_URI` | MongoDB connection string |
| `JWT_SECRET` | Secret for signing auth tokens |
| `GOOGLE_GENAI_API_KEY` | Google GenAI API key |
| `PORT` | Backend port (default: 3001) |

## API Routes

| Method | Route | Description |
|---|---|---|
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | Log in |
| POST | `/api/auth/logout` | Log out |
| GET | `/api/auth/get-me` | Get current user |
| POST | `/api/interview/` | Generate interview report |
| GET | `/api/interview/` | List user's reports |
| GET | `/api/interview/report/:id` | Get report by ID |
| POST | `/api/interview/resume/pdf/:id` | Download tailored resume PDF |

## Usage

1. Register or log in
2. Paste a job description
3. Upload a PDF resume or enter a self-description
4. Click **Generate My Interview Strategy**
5. Review technical questions, behavioral questions, and your preparation roadmap
6. Download a tailored resume PDF from the interview plan page
