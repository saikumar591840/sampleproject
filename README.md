# Team Task Manager

A full-stack, hyper-modern MERN application designed to help teams organize projects, assign tasks, and track real-time progress. Built with a focus on robust security, role-based access control, and a stunning glassmorphism user interface.

![Live Demo](https://img.shields.io/badge/Live_Demo-Coming_Soon-6366f1?style=for-the-badge)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)

## ✨ Features

*   **Role-Based Access Control (RBAC):** Distinct `Admin` and `Member` privileges. Admins can create projects and assign tasks; Members are restricted to viewing and updating the status of tasks explicitly assigned to them.
*   **Kanban-Style Task Tracking:** Tasks are intelligently organized into `Todo`, `In Progress`, and `Done` columns for quick scannability.
*   **Live Dashboard Analytics:** A dynamic visual dashboard summarizing total, completed, pending, and overdue tasks using responsive inline CSS progress charts.
*   **Premium Glassmorphism UI:** Built from the ground up using custom vanilla CSS to achieve a stunning, responsive, dark-mode aesthetic with fluid micro-animations.
*   **Robust Security & Validation:** 
    *   JWT-based authentication
    *   Bcrypt password hashing
    *   Centralized global error-handling middleware intercepting Mongoose errors
    *   Strict client-side form validation to prevent blank submissions

## 🛠️ Tech Stack

*   **Frontend:** React (Vite), React Router v6, Axios, Custom CSS Variables
*   **Backend:** Node.js, Express.js
*   **Database:** MongoDB, Mongoose
*   **Authentication:** JSON Web Tokens (JWT), bcryptjs

## 🚀 Getting Started

To run this project locally on your machine, follow these steps:

### Prerequisites
*   [Node.js](https://nodejs.org/) installed
*   A local [MongoDB](https://www.mongodb.com/try/download/community) server running, or a free Atlas cluster.

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/yourusername/team-task-manager.git
    cd team-task-manager
    ```

2.  **Setup the Backend:**
    ```bash
    cd backend
    npm install
    ```
    Create a `.env` file in the `backend` directory:
    ```env
    PORT=5000
    MONGO_URI=mongodb://127.0.0.1:27017/taskmanager
    JWT_SECRET=your_super_secret_jwt_key
    NODE_ENV=development
    ```
    Start the backend server:
    ```bash
    npm run dev
    ```

3.  **Setup the Frontend:**
    Open a new terminal window.
    ```bash
    cd frontend
    npm install
    ```
    Create a `.env` file in the `frontend` directory:
    ```env
    VITE_API_URL=http://localhost:5000
    ```
    Start the Vite development server:
    ```bash
    npm run dev
    ```

4. **Visit the App:**
   Open `http://localhost:5173` in your browser.

## 🌐 Deployment Instructions

This application is configured for a monolithic production deployment (where Node.js serves the compiled React app) or a decoupled deployment. 

**Recommended Split Deployment:**

1.  **Backend (Railway):**
    *   Create a new project on [Railway.app](https://railway.app/).
    *   Set the Root Directory to `/backend` in settings.
    *   Add your environment variables (`PORT`, `MONGO_URI`, `JWT_SECRET`, `NODE_ENV=production`).
    *   Generate a public domain URL.

2.  **Frontend (Vercel):**
    *   Import your repository into [Vercel](https://vercel.com/).
    *   Set the Root Directory to `frontend`.
    *   Add an environment variable `VITE_API_URL` pointing to your new Railway backend URL (ensure there is no trailing slash).
    *   Deploy!

## 🔗 Live URL

*Placeholder for live URL once deployed:* 
**[https://team-task-manager-demo.vercel.app](https://team-task-manager-demo.vercel.app)** (Replace with actual link)

---
*Developed with modern web practices.*
