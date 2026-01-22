# 🌐 Personal Portfolio Website

A modern, responsive, and interactive **developer portfolio** showcasing my skills, projects, coding profiles, and achievements. The portfolio combines a clean **HTML + CSS frontend**, dynamic **JavaScript logic**, and a lightweight **Express.js backend** to deliver a professional and feature-rich experience.

---

## 🚀 Overview

This portfolio is designed to represent my technical journey and online presence in a structured and engaging way. It not only displays static information but also integrates **real-time coding statistics**, an **animated UI**, and a **functional contact system**.

The project follows a **clear separation of concerns**:

* Frontend handles structure, styling, and user interaction
* Backend manages APIs, email handling, and external data fetching

---

## ✨ Key Features

### 🎨 Frontend

* Fully responsive design using **HTML & CSS**
* Clean and minimal UI optimized for all screen sizes
* Animated background effects for better visual engagement
* Dedicated sections for profile, projects, and achievements

### ⚙️ JavaScript Functionality

* Fetches and displays **LeetCode statistics** dynamically
* Retrieves **GeeksforGeeks (GFG) stats** via backend APIs
* Smooth animations and interactive UI behavior
* Modular JavaScript structure for maintainability

### 🧠 Backend (Express.js)

* REST APIs built using **Node.js & Express**
* Secure handling of environment variables with `.env`
* Backend acts as an intermediate server for external platforms

### 📩 Contact Form (Nodemailer)

* Fully functional contact form
* Emails are sent directly to the admin using **Nodemailer**
* Prevents exposure of sensitive credentials on the frontend

---

## 📂 Project Structure

```bash
├── backend
│   ├── controllers
│   │   ├── contactController.js
│   │   └── gfgController.js
│   ├── routes
│   │   ├── contactRoutes.js
│   │   └── gfgRoutes.js
│   ├── node_modules
│   ├── .env
│   ├── index.js
│   ├── nodemailer.js
│   ├── package.json
│   └── package-lock.json
│
├── frontend
│   ├── images
│   │   ├── icons
│   │   ├── profile
│   │   └── projects
│   ├── js
│   │   ├── animationBgScript.js
│   │   ├── cp-stats.js
│   │   └── script.js
│   ├── index.html
│   └── style.css
│
├── .gitignore
└── README.md
```

---

## 🛠️ Technologies Used

### Frontend

* HTML5
* CSS3
* Vanilla JavaScript

### Backend

* Node.js
* Express.js
* Nodemailer

---

## 🔐 Environment Variables

Create a `.env` file inside the `backend` folder and add:

```env
PORT=5000
EMAIL_USER=your_email@example.com
EMAIL_PASS=your_email_password
```

> ⚠️ Never expose your `.env` file or credentials in public repositories.

---

## ▶️ How to Run Locally

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/your-username/your-portfolio-repo.git
cd your-portfolio-repo
```

### 2️⃣ Install Backend Dependencies

```bash
cd backend
npm install
```

### 3️⃣ Start the Backend Server

```bash
node index.js
```

### 4️⃣ Open Frontend

Simply open `frontend/index.html` in your browser or serve it using a live server extension.

---

## 🌍 Deployment Notes

* Frontend can be deployed on platforms like **Netlify**, **Vercel**, or **GitHub Pages**
* Backend can be deployed on **Render**, **Railway**, or **Cyclic**
* APIs are decoupled, allowing seamless future updates

---

## 🔮 Future Enhancements

* Dark / Light theme toggle
* More coding platform integrations
* Project filtering and search
* Admin dashboard for contact form messages

---

## 👨‍💻 Author

**Shiva Tomar**
B.Tech CSE | Passionate about Web Development & Problem Solving

---

## ⭐ Support

If you like this project, consider giving it a ⭐ on GitHub — it helps a lot!

---

> *“Your portfolio is your digital identity — make it count.”* 🚀
