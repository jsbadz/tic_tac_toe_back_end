import express from "express";
import {
  createSession,
  getAllSession,
  updateSession,
} from "../controller/gameSessionController.js";

const router = express.Router();

router.get("/", getAllSession);
router.post("/post", createSession);
router.put("/update/:id", updateSession); // Placeholder for update route
router.get("/update/:id", updateSession); // Placeholder for get by ID route
router.delete("/delete/:id", updateSession); // Placeholder for delete route

export default router;
