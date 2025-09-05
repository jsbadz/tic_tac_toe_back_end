import { GameSession } from "../model/gameSessionModel.js";

export async function getAllSession(req, res) {
  try {
    const sessions = await GameSession.find().sort({ createdAt: -1 });

    res.json(sessions);
  } catch (error) {
    console.error("❌ Error fetching players:", error);
    res.status(500).json({ message: "❌ Error fetching players" });
  }
}

export const createSession = async (req, res) => {
  try {
    const { playerOne, playerTwo, rounds = [] } = req.body;

    const session = new GameSession({
      playerOne: { name: playerOne, symbol: "X" },
      playerTwo: { name: playerTwo, symbol: "O" },
      rounds,
      playerStats: {
        [playerOne]: { wins: 0, losses: 0, draws: 0 },
        [playerTwo]: { wins: 0, losses: 0, draws: 0 },
      },
    });

    const savedSession = await session.save();
    res.status(201).json(savedSession);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateSession = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const updatedSession = await GameSession.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    if (!updatedSession) {
      return res.status(404).json({ message: "Session not found" });
    }

    res.json(updatedSession);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getSessionById = async (req, res) => {
  try {
    const { id } = req.params;
    const session = await GameSession.findById(id);
    if (!session) {
      return res.status(404).json({ message: "Session not found" });
    }
    res.json(session);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteSession = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedSession = await GameSession.findByIdAndDelete(id);
    if (!deletedSession) {
      return res.status(404).json({ message: "Session not found" });
    }
    res.json({ message: "Session deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/*

// Add a new round to a session
export const addRound = async (req, res) => {
  try {
    const { sessionId } = req.params;
    const { winner, moves } = req.body;

    const session = await GameSession.findById(sessionId);
    if (!session) return res.status(404).json({ message: "Session not found" });

    const roundNumber = session.rounds.length + 1;
    session.rounds.push({ roundNumber, winner, moves, createdAt: new Date() });

    // Update player stats
    if (winner) {
      session.playerStats[winner].wins += 1;
      const loser = winner === session.player1 ? session.player2 : session.player1;
      session.playerStats[loser].losses += 1;
    } else {
      // Draw
      session.playerStats[session.player1].draws += 1;
      session.playerStats[session.player2].draws += 1;
    }

    const updatedSession = await session.save();
    res.json(updatedSession);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Stop a session
export const stopSession = async (req, res) => {
  try {
    const { sessionId } = req.params;

    const session = await GameSession.findById(sessionId);
    if (!session) return res.status(404).json({ message: "Session not found" });

    session.status = "stopped";
    const updatedSession = await session.save();

    res.json(updatedSession);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

*/
