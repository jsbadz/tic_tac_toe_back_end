import mongoose from "mongoose";

// Round schema
const roundSchema = new mongoose.Schema(
  {
    roundNumber: { type: Number, required: true },
    winner: { type: String, default: null },
    moves: { type: [String], default: [] },
    createdAt: { type: Date, default: Date.now },
  },
  { _id: true }
);

// Player stats schema
const playerStatsSchema = new mongoose.Schema(
  {
    wins: { type: Number, default: 0 },
    losses: { type: Number, default: 0 },
    draws: { type: Number, default: 0 },
  },
  { _id: false }
);

// Player schema
const playerSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    symbol: { type: String, enum: ["X", "O"], required: true },
  },
  { _id: false }
);

// Game session schema
const gameSessionSchema = new mongoose.Schema(
  {
    playerOne: { type: playerSchema, required: true }, // always X
    playerTwo: { type: playerSchema, required: true }, // always O
    rounds: { type: [roundSchema], default: [] },
    playerStats: { type: Map, of: playerStatsSchema, default: {} },
    status: { type: String, enum: ["active", "stopped"], default: "active" },
  },
  { timestamps: true }
);

export const GameSession = mongoose.model("GameSession", gameSessionSchema);
