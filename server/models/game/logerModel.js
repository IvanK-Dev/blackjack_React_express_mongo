const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const logerSchema = new Schema(
  {
    gameId: { type: String },
    log: {
      type: [String],
      default: [],
    },
  },
  {
    versionKey: false,
    timestamps: { createdAt: 'createdAt', updatedAt: false },
  }
);


const Loger = mongoose.model('Loger', logerSchema);

module.exports = Loger;
