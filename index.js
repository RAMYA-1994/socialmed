import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import authRoutes from './routes/auth.js';
import postRoutes from './routes/posts.js';
import logger from './middleware/logger.js';
import rateLimiter from './middleware/rateLimiter.js';

dotenv.config();
const app = express();
app.use(express.json());

// Middleware
app.use(logger);
app.use(rateLimiter);

// Database Connection
connectDB();

// Routes
app.use('/auth', authRoutes);
app.use('/posts', postRoutes);

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
