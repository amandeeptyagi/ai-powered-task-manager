import express from 'express';
import cors from 'cors';
import cookieParser from "cookie-parser";
import { errorHandler } from "./middleware/errorHandler.js";
import { notFound } from "./middleware/notFound.js";

// route files
import authRoutes from './routes/authRoutes.js'
import userRoutes from './routes/userRoutes.js';
import adminRoutes from './routes/adminRoutes.js';

const app = express();

// Middlewares
app.use(express.json()); // Body parser
app.use(cookieParser()); // For reading cookies

// CORS setup for frontend
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true,
}));

// Routes
app.use('/api', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/admin', adminRoutes);

// Error handler (last middlewares)
app.use(notFound);
app.use(errorHandler);

export default app;
