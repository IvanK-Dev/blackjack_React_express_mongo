const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const gameSchema = new Schema(
  {
    gameId: { type: String, required: true },
    deck: { type: Array, required: true },
    players: {
      type: [
        {
          playerId: { type: String, required: true },
          hand: {
            type: [String],
            default: [],
          },
        },
      ],
      default: [],
      _id: false,
    },
    endGame: { type: Boolean, default: false },
  },
  {
    versionKey: false,
    timestamps: { createdAt: 'createdAt', updatedAt: false },
  }
);

const Game = mongoose.model('Game', gameSchema);

module.exports = Game;
