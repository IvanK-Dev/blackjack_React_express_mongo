const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const gameSchema = new Schema(
  {
    gameId: { type: String, required: [true] },
  },
  {
    versionKey: false,
    timestamps: { createdAt: 'createdAt', updatedAt: false },
  }
);

const Game = mongoose.model('Game', gameSchema);
module.exports = Game;
