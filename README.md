 <p align="center">
  <img src="pitchpilot-logo.png" alt="PitchPilot logo" width="420" />
</p>

<h1 align="center">🚀 PitchPilot</h1>

<p align="center">
  <strong>Your AI Copilot for Smarter Outreach</strong>
</p>

<p align="center">
  Generate personalized cold emails, LinkedIn DMs, and follow-ups with AI.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=black" alt="React 18" />
  <img src="https://img.shields.io/badge/Node.js-Backend-339933?logo=node.js&logoColor=white" alt="Node.js" />
  <img src="https://img.shields.io/badge/Express.js-API-000000?logo=express" alt="Express.js" />
  <img src="https://img.shields.io/badge/MongoDB-Database-47A248?logo=mongodb&logoColor=white" alt="MongoDB" />
  <img src="https://img.shields.io/badge/Groq-AI%20API-F55036" alt="Groq AI" />
  <img src="https://img.shields.io/badge/Status-In%20Development-orange" alt="In development" />
</p>

---

## ✨ About PitchPilot

**PitchPilot** is a full-stack, AI-powered outreach application built with React, Node.js, Express, MongoDB, and Groq AI.

It helps users draft personalized messages for professional networking, job applications, and business outreach. This project is also a hands-on journey into full-stack development, AI integration, authentication, and deployment.

> 🧪 **Project status:** Under active development. Some features and deployment configurations still need end-to-end testing.

## ✨ Features

- 🤖 **AI-Powered Writing** — Generate personalized outreach messages using the Groq API.
- 📩 **Cold Email Generation** — Create professional emails for networking and job outreach.
- 💬 **LinkedIn DMs** — Generate concise, personalized connection messages.
- 🔁 **Follow-Up Messages** — Draft follow-ups for ongoing conversations.
- 🔐 **Authentication** — Signup, login, and OTP verification flows are included in the codebase.
- 📊 **Dashboard** — A workspace for interacting with the application.
- 🗄️ **MongoDB Integration** — Database models for users and email history.
- 🐳 **Docker Support** — Dockerfiles and Docker Compose configuration are included.

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| ⚛️ React + Vite | Frontend and development server |
| 🎨 Tailwind CSS | UI styling |
| 🟢 Node.js + Express | Backend and REST API |
| 🍃 MongoDB + Mongoose | Data storage |
| 🧠 Groq API | AI-powered message generation |
| 🔑 JWT + bcrypt | Authentication utilities |
| 📧 Nodemailer | Email delivery and verification |
| 🐳 Docker | Containerization |
| 🌿 Git + GitHub | Version control |

## 🏗️ Project Structure

```text
PitchPilot/
├── client/                     # React frontend
│   └── src/
│       ├── components/         # Reusable UI components
│       ├── context/            # Authentication context
│       ├── pages/              # Application pages
│       └── utils/              # API configuration
├── server/                     # Express backend
│   ├── config/                 # Database configuration
│   ├── controllers/             # Application logic
│   ├── middleware/              # Authentication middleware
│   ├── models/                 # MongoDB models
│   ├── routes/                 # API routes
│   └── utils/                  # Email utilities
├── docker-compose.yml
├── package.json
├── package-lock.json
└── README.md
```

## ⚡ Getting Started

### 📋 Prerequisites

Make sure you have:

- [Node.js and npm](https://nodejs.org/)
- A MongoDB database — [MongoDB Atlas](https://www.mongodb.com/atlas) or a local instance
- A [Groq API key](https://console.groq.com/) for AI generation
- [Git](https://git-scm.com/)

### 1️⃣ Clone the repository

```bash
git clone https://github.com/akhil3145/pitchpilot.git
cd pitchpilot
```

### 2️⃣ Install dependencies

Run this command from the project root:

```bash
npm run install-all
```

This installs dependencies for the root project, backend, and frontend.

### 3️⃣ Configure environment variables 🔐

Create `server/.env` using `server/.env.example` as a template.

Configure the backend values required by your version of the code:

```dotenv
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_random_secret
GROQ_API_KEY=your_groq_api_key
EMAIL_USER=your_email_address
EMAIL_PASS=your_email_app_password
FRONTEND_URL=http://localhost:5173
```

For the frontend, create `client/.env`:

```dotenv
VITE_API_URL=http://localhost:5000/api
```

⚠️ **Keep your secrets private!**

- Never commit `.env` files or API keys.
- Never publish MongoDB credentials, email passwords, or real JWT secrets.
- Use placeholders in example files.
- Configure production secrets through your hosting provider's environment settings.

Check the backend configuration and `.env.example` for the exact environment variables required by your version of the code.

### 4️⃣ Start the application 🚀

From the project root, run:

```bash
npm run dev
```

The development servers are expected at:

| Service | URL |
|---|---|
| 💻 Frontend | http://localhost:5173 |
| ⚙️ Backend | http://localhost:5000 |

The backend needs a working MongoDB connection. AI generation requires a valid Groq API key.

## 🐳 Docker Setup

Docker configuration is included for running the application in containers.

1. Install and start [Docker Desktop](https://www.docker.com/products/docker-desktop/).
2. Review `docker-compose.yml` and configure the backend environment variables.
3. From the project root, run:

```bash
docker compose up --build
```

To stop the containers:

```bash
docker compose down
```

⚠️ Review the Docker configuration before running it. Use secure secrets and verify that configured environment variable names match the backend code.

## 🗺️ Roadmap

- [ ] 🔧 Fix and verify MongoDB connectivity.
- [ ] 🔐 Test signup, login, and OTP verification end to end.
- [ ] 🤖 Test AI generation with the Groq API.
- [ ] 📩 Verify email delivery and error handling.
- [ ] 🧪 Add automated tests.
- [ ] 🔄 Add and verify a GitHub Actions CI workflow.
- [ ] 🎨 Improve the UI and responsive design.
- [ ] ☁️ Verify production deployment on suitable hosting platforms.
- [ ] 📸 Add updated screenshots and a working demo.

## 🎯 What I'm Learning

Through PitchPilot, I'm building practical experience with:

- Connecting a React frontend to an Express backend.
- Designing and working with REST APIs.
- Managing MongoDB connections and environment variables.
- Integrating an LLM API into an application.
- Understanding authentication and OTP workflows.
- Using Git, GitHub, and Docker in a full-stack workflow.
- Debugging existing code and documenting improvements.

## 🤝 Acknowledgements

PitchPilot started from [ShivaMani02/AI-COLD-MAIL-GENERATOR-MONOREPO](https://github.com/ShivaMani02/AI-COLD-MAIL-GENERATOR-MONOREPO).

🙏 Credit to the original author for the starting codebase. This repository is being customized for learning and further development.

Please verify the original project's licensing terms before redistributing a derivative version.

---

<p align="center">
  <strong>💻 Learning by building. Improving one commit at a time. 🚀</strong>
</p>
