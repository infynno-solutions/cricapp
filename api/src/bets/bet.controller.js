const Bet = require("./bet.model");
const { joiErrors, mongooseErrors } = require("../utils/errors");
const { ExtractJwt } = require("passport-jwt");

/**
 * POST /bet
 * Header Bearer Token
 * Places bet on the team.
 */
exports.placeBet = async (req, res) => {
  const betInfo = {
    team1: req.body.team1,
    team2: req.body.team2,
    date: req.body.date,
    amount: req.body.amount,
    beton: req.body.beton,
    user: req.user
  };

  const bet = new Bet(betInfo);

  bet.save(err => {
    if (err) {
      return res.status(200).json({
        success: false,
        message: "Error Occured",
        errors: mongooseErrors(err)
      });
    }

    return res.status(201).json({
      success: true,
      message: "Bet placed successfully",
      bet: bet
    });
  });
};

/**
 * GET /bet
 * Header Bearer Token
 * List bets of user.
 */
exports.getBets = async (req, res) => {
  if (req.user) {
    const bets = await Bet.find({ user: req.user.id });
    return res.status(200).json({
      success: true,
      message: "Bets Found.",
      bets: bets
    });
  } else {
    return res.status(500).json({
      success: false,
      message: "User not found."
    });
  }
};
