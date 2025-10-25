# Goleet — LeetCode Sheet Maker & Sharing Platform

**Goleet** is a full-stack web app that lets users create, manage, and share custom problem sheets built from the complete collection of **LeetCode questions**.
Built for developers who want to organize their practice and share their path in one place.

**Live URL:** [https://goleet.vercel.app](https://goleet.vercel.app)

---

## Features

* Create Custom Sheets — Pick any set of LeetCode problems and group them into named sheets.
* Share Sheets — Share your curated problem sets publicly or with friends.
* Secure Authentication — Uses **JWT-based login** to safely store user sessions.
* Modern UI — Built with **React + Tailwind CSS** for a clean, fast, and responsive experience.
* Persistent Data — Backed by **MongoDB** and **Express.js**, all user data and sheets are stored securely in the cloud.

---

## Tech Stack

**Frontend:**

* React.js
* Tailwind CSS
* React Router

**Backend:**

* Node.js
* Express.js
* MongoDB (Mongoose ODM)
* JSON Web Token (JWT) for authentication

**Deployment:**

* Frontend: Vercel 
* Backend: Render 

---

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/<your-username>/goleet.git
cd goleet
```

### 2. Setup the Backend

```bash
cd backend
npm i
```

Create a `.env` file inside `/backend` and add:

```env
MONGO_URI=your_mongodb_connection_string
SECRET_KEY=your_jwt_secret
PORT=4500
```

Run the backend:

```bash
npm start
```

### 3. Setup the Frontend

```bash
cd frontend/GoLeet
npm install
npm run dev
```

The app will be live at:
`http://localhost:5173` (Vite default)

---

## Authentication Flow

* When a user logs in, the server issues a **JWT token**.
* The token is stored securely in browser cookies.
* Each API request validates the token to ensure protected access.
* Tokens auto-expire after a set duration for security.

---

## Future Improvements

* User profiles with stats
* Integration with LeetCode APIs for live data
* Problem-solving progress tracking

---

