import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import sessionRoutes from "./routes/sessionRoute.js";
import { connectDatabase } from "./config/connectDatabase.js";

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

// ✅ Middleware
app.use(express.json());
app.use(
  cors({
    origin: [
      process.env.CLIENT_URL ||
        "http://localhost:3000" ||
        "https://tic-tac-toe-front-end-pi.vercel.app",
    ], // use env var for flexibility
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// ✅ Routes
app.use("/api/session", sessionRoutes);

// ✅ Start server
const startServer = async () => {
  try {
    await connectDatabase();
    app.listen(PORT, () =>
      console.log(`🚀 Server running on http://localhost:${PORT}`)
    );
  } catch (error) {
    console.error("❌ Failed to start server:", error);
    process.exit(1); // exit on failure
  }
};

startServer();

// mongodb+srv://ch0oyax_db_user:zeenp9swEybNU0mP@cluster0.ulxo778.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
