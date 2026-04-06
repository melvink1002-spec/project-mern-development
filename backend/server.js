import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/connection.js";
import authRoutes from "./routes/authRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";

dotenv.config();
connectDB();

const app = express(); 
const port = process.env.PORT || 5001;

app.use(cors({
  origin: ["http://localhost:5173",
   "https://project-mern-development-frontend.onrender.com"],
  credentials: true,

}));

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);

app.listen(port, () =>
  console.log(`Server running on http://localhost:${port}`)
);