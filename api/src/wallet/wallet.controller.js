const Wallet = require("./wallet.model");
const User = require("../users/user.model");
const { joiErrors, mongooseErrors } = require("../utils/errors");
const { ExtractJwt } = require("passport-jwt");

/**
 * POST /addcash
 *  request:  amount
 */
exports.addCash = async (req, res) => {
  const cashInfo = {
    transaction_type: "addcash",
    amount: Number(req.body.amount),
    user: req.user,
    status: "success"
  };

  const addCash = new Wallet(cashInfo);
  addCash.save(async err => {
    if (err) {
      return res.status(200).json({
        success: false,
        message: "Error Occured",
        errors: mongooseErrors(err)
      });
    }

    const user = await User.findById(req.user.id);
    const oldBalance = user.balance;

    const newBalance = oldBalance + cashInfo.amount;

    await User.updateOne({ balance: newBalance });

    return res.status(201).json({
      success: true,
      message: "Cash added successfully",
      transacation: addCash,
      balance: Number(newBalance)
    });
  });
};

/**
 * GET /balance
 */

exports.getBalance = async (req, res) => {
  const user = await User.findById(req.user.id);

  return res.status(200).json({
    success: true,
    message: "Wallet Found.",
    balance: user.balance
  });
};
