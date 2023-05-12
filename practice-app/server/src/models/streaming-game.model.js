// models/game.model.js
import mongoose from 'mongoose';

const gameSchema = new mongoose.Schema({
  name: { type: String, required: true },
  id: { type: String, required: true },
  date: { type: Date, default: Date.now }
});

const Game = mongoose.model('Game', gameSchema);

export default Game;
