import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import nodemailer from "nodemailer";

import { connectDB } from "../config/db.js";
import { generateWelcomeEmail } from "../emailTemplate.js";
import userRoute from "../routes/userRoute.js";
import eventRoute from "../routes/eventRoute.js";
import tagRoute from "../routes/tagRoute.js";

dotenv.config();

const app = express();

// ✔ CORS configuration
app.use(
  cors({
    origin: ["http://localhost:5173", "http://127.0.0.1:5173", "https://i-volunteer-frontend.vercel.app"],
    credentials: true,
  })
);
app.options(/.*/, cors({
  origin: ["http://localhost:5173", "http://127.0.0.1:5173", "https://i-volunteer-frontend.vercel.app"],
  credentials: true,
}));

// ✔ Middleware
app.use(express.json());
app.use(cookieParser());

// ✔ Connect DB (for Vercel cold starts)
connectDB();

// ✔ Health check
app.get("/", (req, res) => {
  res.send("Server is ready v 6");
});

// ✔ API routes
app.use("/api", userRoute);
app.use("/api", eventRoute);
app.use("/api", tagRoute);

// ✔ Nodemailer configuration
const transporter = nodemailer.createTransport({
    host: process.env.GMAIL_HOST,
    port: 587,
    secure: false,
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS
    }
});

// ✔ Email endpoint
app.post('/api/send-email', async (req, res) => {
    const { email, username } = req.body;
    
    const htmlTemplate = generateWelcomeEmail(username, email);
    
    const mailOptions = {
        from: process.env.GMAIL_USER,
        to: email,
        subject: 'Welcome to iVolunteer!',
        html: htmlTemplate
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        res.status(200).json({ message: 'Email sent successfully', info });
    } catch (error) {
        console.error('Email send error:', error);
        res.status(500).json({ message: 'Failed to send email', error });
    }
});

export default app;
