# 🏋️ IronMind

> An AI-powered fitness and workout tracking platform built with the MERN stack.

**IronMind** is a full-stack fitness application designed to help users track workouts, monitor progress, manage fitness goals, and receive personalized AI-powered recommendations.

The project combines **React, Node.js, Express, MongoDB, and OpenAI** to create a modern fitness platform with an intelligent AI fitness coach.

---

## 🚀 Project Overview

IronMind aims to provide a complete digital fitness experience where users can:

* Create and manage their fitness profile
* Set fitness goals
* Track workouts
* Record exercises, sets, reps, and weights
* View workout history
* Monitor fitness progress
* Get personalized AI-powered workout recommendations
* Interact with an AI fitness coach

---

## ✨ Features

### 🔐 Authentication

* User registration
* User login
* JWT authentication
* Protected routes
* Secure password hashing
* Logout

### 👤 User Profile

* Manage personal profile
* Set fitness goals
* Select experience level
* Configure training preferences
* Manage workout preferences

### 🏋️ Workout Tracking

* Create workouts
* Add exercises
* Track sets and reps
* Track weight
* Record workout duration
* View workout history
* Update and delete workout records

### 📊 Progress Tracking

* Track body weight
* Track workout performance
* Track personal records
* View workout statistics
* Progress charts
* Training history

### 🤖 AI Fitness Coach

IronMind will integrate the OpenAI API to provide personalized fitness assistance.

Planned AI capabilities include:

* Personalized workout generation
* Workout recommendations
* Exercise suggestions
* Workout adjustments
* Progress-based recommendations
* Exercise explanations
* AI fitness chat
* Personalized training plans

---

## 🛠️ Tech Stack

### Frontend

* React
* Vite
* JavaScript
* React Router
* Redux Toolkit
* Axios
* Tailwind CSS

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT
* bcrypt
* REST API

### AI

* OpenAI API

### Development Tools

* Git
* GitHub
* Postman
* VS Code
* Nodemon

---

## 📁 Project Structure

```text
IronMind/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── redux/
│   │   ├── hooks/
│   │   ├── utils/
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── public/
│   └── package.json
│
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── middleware/
│   │   └── services/
│   │
│   ├── app.js
│   ├── .env
│   ├── .gitignore
│   └── package.json
│
└── README.md
```

---

## ⚙️ Installation

### 1. Clone the repository

```bash
git clone https://github.com/your-username/ironmind.git
```

### 2. Navigate into the project

```bash
cd ironmind
```

---

# 🔧 Backend Setup

Navigate to the backend:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Create a `.env` file:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
OPENAI_API_KEY=your_openai_api_key
```

Start the development server:

```bash
npm run dev
```

Backend:

```text
http://localhost:5000
```

---

# 💻 Frontend Setup

Open another terminal:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Frontend:

```text
http://localhost:5173
```

---

## 🔑 Environment Variables

### Backend

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
OPENAI_API_KEY=your_openai_api_key
```

### Frontend

Frontend environment variables will be added as the project develops.

---

## 🤖 AI Architecture

IronMind will keep the OpenAI API key securely on the backend.

The frontend will never communicate directly with OpenAI.

```text
React Frontend
       │
       ▼
Express Backend
       │
       ▼
AI Service
       │
       ▼
OpenAI API
       │
       ▼
AI Response
       │
       ▼
React Frontend
```

This architecture prevents the OpenAI API key from being exposed in the browser.

---

## 📈 Development Roadmap

* [x] Project initialization
* [x] Backend setup
* [x] Nodemon configuration
* [ ] MongoDB connection
* [ ] Authentication
* [ ] User profile
* [ ] Workout management
* [ ] Exercise management
* [ ] Workout history
* [ ] Progress tracking
* [ ] Dashboard
* [ ] AI workout generator
* [ ] AI fitness coach
* [ ] AI-powered recommendations
* [ ] Responsive UI
* [ ] Error handling
* [ ] Testing
* [ ] Deployment

---

## 🔒 Security

IronMind will implement:

* JWT-based authentication
* Password hashing
* Protected API routes
* Environment variables for secrets
* Backend-only OpenAI API access
* Input validation

> ⚠️ Never commit your `.env` file or API keys to GitHub.

---

## 🎯 Project Goals

IronMind is designed to demonstrate the development of a real-world **MERN + AI application**.

The project focuses on:

* Full-stack web development
* REST API development
* MongoDB data modeling
* Authentication and authorization
* Redux state management
* AI API integration
* Clean frontend architecture
* Responsive UI development
* Real-world application design

---

## 🔮 Future Improvements

Possible future features include:

* AI-based progress analysis
* Nutrition recommendations
* Workout difficulty adjustment
* Exercise form guidance
* Personal records analysis
* Weekly AI progress reports
* Workout streaks
* Notifications and reminders
* Advanced analytics
* Mobile application

---

## 👨‍💻 Author

**Muhammad Nishad**

BSc Computer Science

---

## 📌 Project Status

🚧 **Currently under development**

IronMind is being developed incrementally, with new features being added throughout the development process.

---

## 📄 License

This project is created for educational and portfolio purposes.

```

From now on, we'll call the project **IronMind** everywhere—folder names, GitHub repo, UI branding, README, and eventually the AI Coach. 💪🧠
```
