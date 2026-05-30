<p align="center">
  <img src="https://img.shields.io/badge/TalentForge-AI-blueviolet?style=for-the-badge&logo=sparkles&logoColor=white" alt="TalentForge AI" />
</p>

<h1 align="center">🎯 TalentForge AI</h1>

<p align="center">
  <b>Next-Gen AI-Powered Video Interview Platform</b><br/>
  <i>Revolutionizing the hiring process with intelligent video interviews, real-time AI analysis, and smart candidate evaluation.</i>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-18.3-61DAFB?style=flat-square&logo=react&logoColor=white" />
  <img src="https://img.shields.io/badge/TypeScript-5.8-3178C6?style=flat-square&logo=typescript&logoColor=white" />
  <img src="https://img.shields.io/badge/Vite-5.4-646CFF?style=flat-square&logo=vite&logoColor=white" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-3.4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white" />
  <img src="https://img.shields.io/badge/shadcn/ui-Components-000000?style=flat-square&logo=shadcnui&logoColor=white" />
</p>

---

## ✨ Overview

**TalentForge AI** is a comprehensive, full-stack video interview platform designed for modern hiring teams. It connects **candidates**, **recruiters**, **interviewers**, and **admins** through a seamless, AI-enhanced experience — from job discovery to final evaluation.

---

## 🚀 Key Features

### 🎥 Live Video Interviews
- Real-time video/audio communication with camera & microphone controls
- Screen sharing capabilities
- In-interview chat messaging
- Session recording and playback

### 🤖 AI-Powered Analysis
- Real-time speech recognition and transcription
- AI-generated interview questions tailored to job roles
- Automated candidate scoring and evaluation
- Smart feedback generation

### 💻 Coding Assessment
- Built-in code editor with syntax highlighting
- Multiple language support
- Real-time code evaluation
- Timed assessment sessions

### 👥 Multi-Role Dashboards

| Role | Features |
|------|----------|
| **Candidate** | Job board, application tracking, interview preparation, profile management |
| **Recruiter** | Job posting, candidate pipeline, interview scheduling, analytics |
| **Interviewer** | Interview queue, evaluation forms, candidate review, scoring |
| **Admin** | User management, system analytics, platform configuration |

### 🎨 Premium Design
- Glassmorphism UI with dark/light mode support
- Smooth micro-animations and transitions
- Fully responsive — works on desktop, tablet, and mobile
- Modern typography with Inter font family

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend Framework** | React 18 with TypeScript |
| **Build Tool** | Vite 5 |
| **Styling** | Tailwind CSS 3.4 + shadcn/ui components |
| **State Management** | TanStack React Query |
| **Routing** | React Router v6 |
| **Form Handling** | React Hook Form + Zod validation |
| **Charts** | Recharts |
| **Icons** | Lucide React |
| **Notifications** | Sonner toast |

---

## 📁 Project Structure

```
talent-forge/
├── public/                  # Static assets
├── src/
│   ├── components/
│   │   ├── layout/          # DashboardLayout, navigation
│   │   ├── landing/         # Landing page sections
│   │   └── ui/              # shadcn/ui component library
│   ├── hooks/               # Custom React hooks (media permissions, speech, etc.)
│   ├── pages/
│   │   ├── admin/           # Admin dashboard
│   │   ├── candidate/       # Candidate dashboard & job board
│   │   ├── interviewer/     # Interviewer dashboard
│   │   ├── recruiter/       # Recruiter dashboard
│   │   ├── Landing.tsx      # Main landing page
│   │   ├── LiveInterview.tsx # Live video interview room
│   │   ├── InterviewRoom.tsx # Interview session management
│   │   ├── CodingAssessment.tsx # Code assessment module
│   │   ├── Login.tsx        # Authentication - login
│   │   └── Register.tsx     # Authentication - registration
│   ├── lib/                 # Utility functions
│   └── App.tsx              # Root app with routing
├── tailwind.config.ts       # Tailwind configuration
├── vite.config.ts           # Vite configuration
├── tsconfig.json            # TypeScript configuration
└── package.json
```

---

## ⚡ Getting Started

### Prerequisites

- **Node.js** ≥ 18.x
- **npm** ≥ 9.x

### Installation

```bash
# Clone the repository
git clone https://github.com/talhadev-404/talent-forge.git

# Navigate to the project
cd talent-forge

# Install dependencies
npm install

# Start the development server
npm run dev
```

The app will be running at **http://localhost:5173**

### Build for Production

```bash
npm run build
npm run preview
```

---

## 📸 Pages & Routes

| Route | Page | Description |
|-------|------|-------------|
| `/` | Landing | Hero section, features, testimonials, pricing |
| `/login` | Login | Email/password authentication |
| `/register` | Register | Multi-role account creation |
| `/candidate/dashboard` | Candidate Dashboard | Job tracking, upcoming interviews |
| `/candidate/jobs` | Job Board | Browse and apply for positions |
| `/recruiter/dashboard` | Recruiter Dashboard | Pipeline management, analytics |
| `/interviewer/dashboard` | Interviewer Dashboard | Interview queue, evaluations |
| `/admin/dashboard` | Admin Dashboard | System-wide management |
| `/interview/:id` | Interview Room | Pre-interview setup & checks |
| `/live-interview/:id` | Live Interview | Real-time video interview session |
| `/coding-assessment/:id` | Coding Assessment | Timed coding challenges |

---

## 🧑‍💻 Author

**Talha Dev**
- GitHub: [@talhadev-404](https://github.com/talhadev-404)

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

<p align="center">
  Built with ❤️ using React, TypeScript & AI
</p>
