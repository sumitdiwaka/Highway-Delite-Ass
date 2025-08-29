MindScribe - A Modern Full-Stack Note-Taking Application
MindScribe is a sleek, secure, and modern full-stack note-taking application designed to provide a seamless and visually appealing user experience. It features a secure authentication system with both passwordless OTP and Google OAuth, allowing users to quickly sign up and manage their notes. The application boasts a stunning dark mode UI with glassmorphism effects and subtle animations.

✨ Features
Secure Authentication: Users can sign up and log in via two methods:

Passwordless OTP: A one-time password sent to the user's email.

Google OAuth 2.0: Secure and convenient one-click sign-in with a Google account.

JWT-Powered Authorization: User sessions are managed using JSON Web Tokens, ensuring that all API requests for creating or deleting notes are secure and authorized.

CRUD Functionality: Authenticated users can easily Create and Delete their notes.

Stunning & Creative UI:

A beautiful dark mode theme with elegant glassmorphism effects.

Dynamic background gradient animations for a visually rich experience.

Subtle hover effects and loading animations.

Responsive Design: The application is fully responsive and provides an optimal user experience on desktops, tablets, and mobile devices.

Error Handling: Displays relevant and user-friendly error messages for invalid inputs, API failures, or incorrect OTPs.

🛠️ Technology Stack
This project is built using a modern MERN-style stack with TypeScript for robust type safety.

Frontend:

React.js (with TypeScript)

Vite: For a fast and modern development environment.

Tailwind CSS: For utility-first styling and responsive design.

Lucide React: For a beautiful and consistent icon set.

React Router: For client-side routing.

Backend:

Node.js (with TypeScript)

Express.js: For building the RESTful API.

Mongoose: As the Object Data Modeler (ODM) for MongoDB.

Passport.js: For handling Google OAuth 2.0 authentication.

JSON Web Token (JWT): For user authorization.

Bcrypt: For securely hashing OTPs.

Database:

MongoDB: A NoSQL database to store user and note data.

🚀 Project Setup and Installation
To get a local copy up and running, follow these simple steps.

Prerequisites
Node.js (v18 or later)

npm or yarn

MongoDB (local instance or a cloud-based service like MongoDB Atlas)

A Google Cloud Platform account for OAuth credentials.

Installation
Clone the repository:

git clone https://github.com/your-username/mindscribe.git
cd mindscribe

Setup the Backend (server directory):

cd server
npm install

Create a .env file in the server directory and add the necessary environment variables (see below).

Setup the Frontend (client directory):

cd ../client
npm install

Create a .env file in the client directory and add the necessary environment variables.

Environment Variables
You will need to create a .env file in both the server and client directories.

Backend (server/.env)
# MongoDB Connection String
MONGO_URI=your_mongodb_connection_string

# JWT Secret Key
JWT_SECRET=your_super_secret_jwt_key

# Port for the server to run on
PORT=5001

# Google OAuth Credentials
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# Frontend URL for redirects
FRONTEND_URL=http://localhost:5173

# Email Service (e.g., for SendGrid or Nodemailer)
EMAIL_USER=your_email_for_sending_otps
EMAIL_PASS=your_email_password_or_app_password

Frontend (client/.env)
Important: Frontend variables must be prefixed with VITE_.

# The URL of your backend server
VITE_API_URL=http://localhost:5001

Running the Application
Start the Backend Server:
From the server directory, run:

npm run dev

Start the Frontend Development Server:
From the client directory, run:

npm run dev

Open http://localhost:5173 in your browser to see the application.

📝 API Endpoints
The following are the main API routes created for this project:

Method

Endpoint

Description

POST

/api/auth/send-otp

Sends a 6-digit OTP to the user's email.

POST

/api/auth/verify-otp

Verifies the OTP and returns a JWT.

GET

/api/auth/google

Initiates the Google OAuth 2.0 login flow.

GET

/api/auth/google/callback

Callback URL for Google to redirect to.

GET

/api/notes

Fetches all notes for the authenticated user.

POST

/api/notes

Creates a new note for the authenticated user.

DELETE

/api/notes/:id

Deletes a specific note by its ID.

👤 Author
Sumit Rathore

GitHub: @your-username