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

    this.players[0].score = calculateHand(this.players[0].hand);
    this.dealer.score = calculateHand(this.dealer.hand);
  }
  next();
});

gameSchema.pre(['findOneAndUpdate'], async function (next) {
  const update = this.getUpdate();


  if (update.$push && update.$push['players']) {
    const updatePlayer = update.$push.players;

    updatePlayer.score = calculateHand(updatePlayer.hand);
  }

  if (update.$push && update.$push['dealer']) {
    const updateDealer = update.$push.dealer;
    updateDealer.score = calculateHand(updateDealer.hand);
  }

  next();
});

const Game = mongoose.model('Game', gameSchema);

module.exports = Game;
