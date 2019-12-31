const { Schema, model } = require("mongoose");

const betSchema = new Schema(
  {
    team1: { type: String, required: true },
    team2: { type: String, required: true },
    date: { type: String, required: true },
    amount: { type: String, required: true },
    beton: { type: String, required: true },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true
    }
  },
  {
    timestamps: true
  }
);

const Bet = model("bets", betSchema);

module.exports = Bet;
