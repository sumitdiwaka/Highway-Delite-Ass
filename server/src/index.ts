// // src/index.ts
// import express from 'express';
// import 'dotenv/config';
// import cors from 'cors';
// import connectDB from './utils/db';
// import authRoutes from './routes/auth.routes';
// import noteRoutes from './routes/noteRoutes';
// // Connect to Database
// connectDB();

// const app = express();

// // Middlewares
// app.use(cors()); // Allows requests from our frontend
// app.use(express.json()); // Allows us to accept JSON data in the request body

// // API Routes
// app.use('/api/auth', authRoutes);
// app.use('/api/notes', noteRoutes);

// const PORT = process.env.PORT || 5001;

// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// src/index.ts
import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import passport from 'passport'; // Import passport
import connectDB from './utils/db';
import authRoutes from './routes/auth.routes';
import noteRoutes from './routes/noteRoutes';
import './config/passport'; // This line executes our passport configuration

// Connect to Database
connectDB();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(passport.initialize()); // Initialize passport middleware

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/notes', noteRoutes);

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));