# 📰 News App - Frontend

This is the **frontend** of the News App, built with **React + TailwindCSS**.  
It allows users to **signup/login, select news preferences, view top headlines, search articles, and receive personalized news**.

---

## 🚀 Features
- User authentication (JWT-based login/signup).
- Choose and update news category preferences.
- Search news articles.
- Top headlines section.
- Profile management (edit name, email, alert frequency).
- Responsive UI (TailwindCSS).
- Deployed on **Netlify**.

---

## 🛠️ Tech Stack
- **React.js**
- **React Router**
- **Tailwind CSS**
- **Axios** (API calls)
- **Context API** (global state management)
- **Netlify** (deployment)

---

## ⚙️ Setup Instructions

1. Clone the repository:
   ```bash
   git clone https://github.com/Ram-india/news-app-front-end.git
   cd news-app-frontend

2. Install dependencies:
   ```bash
   npm install

3. Create a .env file in root
   ```bash
    PORT=5000
    MONGO_URI=your-mongodb-uri
    JWT_SECRET=your-jwt-secret
    NEWS_API_KEY=your-newsapi-key
    EMAIL_USER=your-gmail-address
    EMAIL_PASS=your-app-password
    CLIENT_URL=https://your-frontend-demo.netlify.app

4. Run locally:
   ```bash
   npm run dev

## 🚀 Live Demo
[![Live Demo](https://img.shields.io/badge/Live_Demo-Netlify-brightgreen?style=for-the-badge&logo=netlify)](https://live-news-cap.netlify.app)

## 📸 Screenshots

### Home Page
![Home Page](./screenshots/News%20_app_home_page.png)

### Preference Page
![Preference Page](./screenshots/news_app_preference_page.png)

### Profile Page
![Profile Page](./screenshots/news_app_profile_page.png)