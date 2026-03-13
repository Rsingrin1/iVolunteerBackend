
// ✔ FOR LOCAL DEVELOPMENT ONLY
// For Vercel deployment, use api/index.js instead

import app from "./api/index.js";
import dotenv from "dotenv";
<<<<<<< HEAD
=======
import cors from "cors";
import bcrypt from "bcrypt";
import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";
import { generateWelcomeEmail } from "./emailTemplate.js";

import cookieParser from "cookie-parser"; // ✔ parse cookies
import { connectDB } from "./config/db.js";

import userRoute from "./routes/userRoute.js";
import eventRoute from "./routes/eventRoute.js";
import tagRoute from "./routes/tagRoute.js";
>>>>>>> parent of db5ab6c (changed the api routes)

dotenv.config();

console.log("JWT SECRET =", process.env.JWT_SECRET);








<<<<<<< HEAD
// ✔ Server - Local development only
=======



// ✔ JSON & cookies
app.use(express.json());
app.use(cookieParser());

// ✔ Health check
app.get("/", (req, res) => {
  res.send("Server is ready v 5");
});

// ✔ API routes
app.use("/api", userRoute);
app.use("/api", eventRoute);
app.use("/api", tagRoute);

// ✔ Connect DB
connectDB();

// ✔ Server
>>>>>>> parent of db5ab6c (changed the api routes)
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}, v 2`);
});




// ✔ Legacy endpoints - kept for backward compatibility but routes defined in api/index.js

