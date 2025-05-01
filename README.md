HabitVault - Daily Habit Tracker with Visual Streaks
HabitVault is a minimalist, user-friendly daily habit tracker app designed to help users build consistency in their daily routines. Track your habits, maintain streaks, and visualize your progress over time in a clean and engaging interface.

📖 Table of Contents
Features

Tech Stack

Installation

Frontend Setup

Backend Setup

Deployment

API Endpoints

License

🧩 Features
User Authentication:

Secure login and registration via email/password using JWT authentication.

Each user has their own data scoped to their account.

Habit Management:

Add, edit, and delete daily habits (e.g., "Drink 2L water").

Set custom target days (Everyday, Weekdays, Custom).

View habits in a clean card/grid view.

Daily Check-In:

Mark habits as completed or missed every day.

Track completion status with real-time feedback (checkbox or emojis).

Streak Tracking:

Track your current streak and longest streak for each habit.

Display streaks clearly on each habit card.

Performance Visualization:

View performance using a heatmap and a bar/line chart.

See how many days you completed or missed for each habit over time.

User Preferences:

Store user preferences like light/dark mode and default view.

Local storage for a personalized experience.

💻 Tech Stack
Frontend:

React (with Vite or Create React App)

Tailwind CSS (for styling)

React Router (for page navigation)

Axios (for API requests)

Chart.js / Recharts (for visualizations)

Backend:

Node.js + Express.js

MongoDB (using MongoDB Atlas)

Mongoose (for MongoDB ORM)

JWT (for authentication)

bcrypt.js (for password hashing)

CORS and dotenv (for environment configuration)

Deployment:

Railway (for full-stack deployment)

MongoDB Atlas (for database)

🛠️ Installation
1. Clone the repository
   git clone https://github.com/your-username/habitvault.git
   cd habitvault
2. Backend Setup
   Navigate to server/ and run:
   npm install
3. Frontend Setup
   Navigate to client/ and run:
   npm install
4. Environment Variables
  Create .env files:
  Backend (server/.env):
  MONGO_URI=your_mongodb_connection_string
  JWT_SECRET=your_jwt_secret
  MONGO_URI=your_mongodb_connection_string
  JWT_SECRET=your_jwt_secret
  REACT_APP_API_URL=http://localhost:5000/api

🚀 Running Locally
1. Start the Backend
   cd server
   npm start
2. Start the Frontend
   cd client
   npm run dev

📡 API Endpoints
POST /api/auth/register - Register a new user.

POST /api/auth/login - Login to get a JWT token.

GET /api/habits - Get user habits.

POST /api/habits - Add a new habit.

PUT /api/habits/:id - Edit a habit.

DELETE /api/habits/:id - Delete a habit.

POST /api/checkin/:id - Mark a habit as completed.

GET /api/stats/:id - Get streak stats for a habit.

   




