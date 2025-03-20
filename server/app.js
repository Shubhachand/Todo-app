import express from 'express';
import dotenv from 'dotenv';
import connectDB from './db/database.js';
import userRoutes from './routes/user.js';
import todoRoutes from './routes/todo.js';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
const app = express();

dotenv.config();
connectDB();

// Middleware setup
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser()); // ⬅️ Move this ABOVE the routes
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));
// Routes
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/todo", todoRoutes);
app.use("/api/todos", todoRoutes);

const PORT = process.env.PORT || 3000;

// Server listening
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
