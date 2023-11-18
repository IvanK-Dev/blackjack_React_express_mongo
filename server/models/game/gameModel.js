const mongoose = require('mongoose');
const { nanoid } = require('nanoid');
const BlackJackGameFactory = require('../../services/BlackJackGameFactory');
const createPlayer = require('../../utils/createPlayer');
const dealCardFromDeck = require('../../utils/dealCardFromDeck');
const calculateHand = require('../../services/calculateHand.js');

const Schema = mongoose.Schema;

const gameSchema = new Schema(
  {
    gameId: { type: String },
    deck: { type: Array },

    players: {
      type: [
        {
          playerId: { type: Number, required: true },
          hand: {
            type: [String],
            default: [],
          },
          score: { type: Number, default: 0 },
          stopped: { type: Boolean, default: false },
        },
      ],
      default: [],
      _id: false,
    },

    dealer: {
      hand: {
        type: [String],
        default: [],
      },
      score: { type: Number, default: 0 },
      stopped: { type: Boolean, default: false },
    },

    endGame: { type: Boolean, default: false },
  },
  {
    versionKey: false,
    timestamps: { createdAt: 'createdAt', updatedAt: false },
  }
);

gameSchema.pre('save', async function (next) {
  if (this.isNew) {
    const { deck } = new BlackJackGameFactory();

    const { playerId, playerHand } = createPlayer([], deck);
    this.gameId = nanoid(10);
    this.players.push({ playerId, hand: playerHand });
    this.dealer.hand = dealCardFromDeck(deck, 2);
    this.deck = deck;

    calculateHand.call(this.players[0]);
    calculateHand.call(this.dealer);
  }
  next();
});

gameSchema.pre(['findOneAndUpdate', 'updateOne'], async function (next) {
  const update = this.getUpdate();
  try {
    const game = await this.model.findOne(this.getQuery());

    if (update.$push && update.$push['players']) {
      const newPlayer = game.players[game.players.length - 1];
      console.log('game.players',game.players)
      calculateHand.call(newPlayer);
      await game.save();
    }
    if (update.$push && update.$push['dealer.hand']) {
      calculateHand.call(game.dealer);
    }
  } catch (error) {
    return next(error);
  }

  next();
});

const Game = mongoose.model('Game', gameSchema);

module.exports = Game;
