# 🤝 PhilChar  
### Crowdfunding & NGO Discovery Platform

PhilChar is a **full-stack donation and NGO discovery platform** built using **Node.js, Express, and MongoDB**, designed to bridge the gap between philanthropists and NGOs.  

The platform features **role-based secure authentication**, **dynamic profile management**, and an **interest-based matching engine** that connects donors with causes they care about.

🕒 Developed during a **48-hour hackathon** to address real-world funding visibility challenges faced by NGOs.

---

## 🚀 Project Status
- ✅ Hackathon project completed in **48 hours**
- 🧪 Currently designed for **local execution**
- 📌 Deployment-ready with minor configuration

---

## 📌 Features

### 🌐 Frontend (EJS)
- User registration & login  
  - Separate flows for **Donors** and **NGOs**
- Dynamic dashboards with **server-side rendering (EJS)**
- Responsive and user-friendly UI (Bootstrap)
- Real-time form validation and error handling

---

### 🧠 Core Functionality

#### 🔍 Smart Discovery Engine
- Accepts donor interests (e.g., *Education*, *Health*)
- Automatically filters and matches relevant NGOs
- Reduces search time for donors
- Improves visibility for smaller NGOs

#### 🏢 NGO Profile Management
- Comprehensive NGO profiles  
  - Mission, history, funding needs
- Public-facing NGO pages to showcase previous work
- Direct donor–NGO contact links

---

## 🛠️ Backend
- RESTful APIs for user management and data retrieval
- **Passport.js** authentication  
  - Local Strategy  
  - Google OAuth 2.0
- MongoDB integration using **Mongoose**
- Session persistence using **express-session**

---

## 🧑‍💻 Tech Stack

| Layer       | Technologies Used |
|------------|------------------|
| Frontend   | EJS, HTML5, CSS3, Bootstrap |
| Backend    | Node.js, Express.js, Body-Parser, Lodash |
| Database   | MongoDB, Mongoose, mongoose-findorcreate |
| Auth       | Passport.js (Local + Google OAuth 2.0), Express-Session |
| Tools      | Git, Postman, VS Code |

---

## 📁 Project Structure

```plaintext
PhilChar/
├── backend/
│   ├── public/              # Static assets (CSS, Images)
│   ├── views/               # EJS Templates
│   │   ├── partials/        # Reusable components
│   │   ├── home.ejs         # Landing page
│   │   └── ...
│   ├── app.js               # Main server entry point
│   ├── package.json         # Dependencies & scripts
│   └── .env                 # Environment variables (OAuth keys)
└── README.md
```



---

---

## 🔐 Authentication (Passport.js)

- **Dual Strategy Support**
  - Email & Password authentication (Local Strategy)
  - Google OAuth 2.0
- **Session Management**
  - Stateful sessions using `express-session`
- **Role-Based Access Control**
  - Donors cannot access NGO-specific routes
  - NGOs cannot access donor-only routes

---

## 🛠️ Local Setup Instructions

```bash
# Clone the repository
git clone https://github.com/yourusername/PhilChar.git
cd PhilChar/backend

# Install dependencies
npm install

# Configure environment variables
# Create a .env file and add:
# CLIENT_ID=your_google_client_id
# CLIENT_SECRET=your_google_client_secret

# Start the server
node app.js
```

---


### 🧪 Testing

- Routes and controllers tested via **Postman**  
- End-to-end user flows validated manually  
  *(Login → Match → Donate)*  
- OAuth integration verified using live **Google Developer Console** credentials  

---

### 🧾 License

This project is licensed under the **ISC License**.

---

### 💬 Contact

For queries or collaboration:  
📧 [vedanghatekar@gmail.com](mailto:vedanghatekar@gmail.com)
