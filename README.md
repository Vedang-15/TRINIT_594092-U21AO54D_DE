
🤝 PhilChar (Crowdfunding & NGO Discovery Platform)
This is a full-stack donation and discovery platform built using Node.js, Express, and MongoDB. It serves as a bridge between philanthropists (donors) and NGOs, helping connect people to causes they care about through interest-based matching.

The application features role-based secure authentication (Donors vs. NGOs), dynamic profile management, and a robust backend to handle funding data and user sessions. It was originally developed during a 48-hour hackathon.

🚀 Key Highlights
Dual-User Ecosystem: Distinct workflows and dashboards for Donors and NGOs.

Secure Authentication: Integrated Passport.js for Local and Google OAuth 2.0 strategies.

Smart Discovery: Allows donors to find NGOs based on specific fields of interest and funding needs.

Server-Side Rendering: Fast and dynamic UI delivery using EJS templates.

📌 Features
🔐 Authentication & Security
Google OAuth 2.0 Integration: One-click login/signup for ease of access.

Role-Based Access Control: Separate login portals for NGOs and Donors (/login vs /loginngo).

Session Management: Secure cookies using express-session and passport-session.

🏢 For NGOs
Detailed Profiling: NGOs can list their mission, history, previous work, and funding requirements.

Visibility: Create a public-facing profile to attract potential donors.

❤️ For Donors (Philanthropists)
Interest Matching: Input personal interests to see relevant NGO recommendations.

NGO Directory: Browse a comprehensive list of registered NGOs.

Direct Connection: View contact details and social links to reach out to NGOs directly.


🧑‍💻 Tech Stack

Layer,Technologies Used
Frontend,"EJS (Templating), CSS, HTML5, Bootstrap"
Backend,"Node.js, Express.js"
Database,"MongoDB, Mongoose"
Authentication,Passport.js (Local + Google OAuth 2.0)
Tools,"Git, Postman, Lodash"

📁 Project Structure

PhilChar/
├── backend/
│   ├── public/              # Static assets (CSS, Images)
│   ├── views/               # EJS Templates (UI)
│   │   ├── partials/        # Reusable headers/footers
│   │   ├── home.ejs         # Landing page
│   │   ├── ngo_profile.ejs  # Dynamic NGO profile page
│   │   └── ...
│   ├── app.js               # Main server entry point & routes
│   ├── package.json         # Dependencies & scripts
│   └── .env                 # Environment variables (Google Keys)
└── README.md



🛠️ Local Setup Instructions
Follow these steps to run the project locally on your machine.

1. Clone the repository
Bash

git clone https://github.com/yourusername/PhilChar.git
cd PhilChar/backend
2. Install Dependencies
Bash

npm install
3. Configure Environment Variables
Create a .env file in the root directory and add your MongoDB URI and Google OAuth credentials:

Code snippet

CLIENT_ID=your_google_client_id
CLIENT_SECRET=your_google_client_secret
PORT=4000
4. Start the Server
You can start the server using node or nodemon:

Bash

node app.js
# or
nodemon app.js
5. Access the App
Open your browser and navigate to: http://localhost:4000

🔐 Authentication Flow (Passport.js)
Selection: Users choose to sign in as a "Philanthropist" or an "NGO".

Strategy: The app uses passport-google-oauth20 for Google Sign-In and passport-local-mongoose for email/password.

Persistence: Upon success, a session cookie is created. The backend checks req.isAuthenticated() to protect private routes like /listofngo.

🧪 Future Improvements
Payment Gateway: Integration with Stripe/Razorpay for direct donations.

Real-time Chat: Socket.io integration for communication between donors and NGOs.

Admin Dashboard: For verifying legitimate NGOs.

🧾 License
This project is licensed under the ISC License.

💬 Contact
For queries or collaboration: 📧 vedanghatekar@gmail.com
