# 🎓 Blingy Scholar — Full Stack Application

**Blingy Scholar** is a scholarship assistance platform that helps students easily discover, track, and apply for both undergraduate and postgraduate scholarships globally.

This is a full-stack web application consisting of:
- A **React.js frontend** (`client/`) built with Create React App
- A **Node.js & Express backend** (`server/`) with a MySQL database

---

## ✨ Features

### 🎨 Frontend (React)
- Modern and responsive UI
- User registration and login
- Browse and download scholarship guides & templates
- View success stories and testimonials
- Personalized dashboard with saved content
- Component-based structure using CSS Modules

### 🛠️ Backend (Node.js + Express + MySQL)
- Secure user authentication (bcrypt-hashed passwords + JWT)
- RESTful API endpoints for:
  - User authentication & profile
  - Scholarship guides
  - Templates & success stories
- Modular structure: Controllers, Routes, Models, Middleware
- Data stored in MySQL using `mysql2`

---

## 🗂️ Project Structure

BlingyScholar/
│
├── client/ # React frontend
│ ├── public/
│ └── src/
│ ├── components/ # Reusable components
│ ├── pages/ # Pages like Dashboard, GuideList, etc.
│ ├── assets/ # Images, fonts, icons
│ └── App.js # Main entry
│
├── server/ # Express backend
│ ├── controllers/ # Route logic
│ ├── models/ # DB operations
│ ├── routes/ # API endpoints
│ ├── middleware/ # Auth & error handling
│ └── app.js # Server entry point
│
└── README.md # Project overview (this file)


---

## ⚙️ Installation

### 1. Clone the repo

```bash
git clone https://github.com/khaledjibril/Blingy-Scholar.git
cd Blingy-Scholar

2. Install frontend dependencies

cd client
npm install
npm start

3. Install backend dependencies

cd ../server
npm install
npm run dev

4. Set up environment variables

Create a .env file inside the server/ directory with the following:

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=blingy_scholar
JWT_SECRET=your_jwt_secret

📦 Dependencies
Frontend

    React

    React Router

    Axios

    Swiper.js

Backend

    Express

    MySQL2

    Dotenv

    Bcrypt

    JSON Web Token (JWT)

    CORS

🚀 Future Improvements

    Email verification and password reset

    Admin dashboard for content management

    Realtime chat or support ticket system

    Bookmarking and reminder notifications

🤝 Contributing

Contributions are welcome!
Fork the repo, create a branch, make your changes, and open a pull request.
🧑‍💻 Author

Built with ❤️ by Khaled Muhammad Jibril
GitHub Profile
