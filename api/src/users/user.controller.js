const User = require("./user.model");
const { signUp, signIn } = require("./user.validator");
const { joiErrors, mongooseErrors } = require("../utils/errors");
const passport = require("passport");
const jwt = require("jsonwebtoken");

/**
 * POST /login
 * Login registered user.
 */

exports.loginUser = async (req, res, next) => {
  const userData = {
    username: req.body.username,
    password: req.body.password
  };

  const validate = await signIn.validate(userData, { abortEarly: false });

  if (validate.error) {
    res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: joiErrors(validate)
    });
  } else {
    passport.authenticate("local", { session: false }, (err, user, info) => {
      // console.log(err);
      if (err)
        return res
          .status(500)
          .json({ success: false, message: "Somthing went wrong!" });
      if (!user) {
        // return res.redirect("/login");
        return res.status(200).json({
          success: false,
          message: "Invalid username or password"
        });
      }
      req.logIn(user, err => {
        // console.log(user);
        if (err)
          return res
            .status(500)
            .json({ success: false, message: "Somthing went wrong!" });
        // return res.redirect(req.session.returnTo || "/");
        const token = jwt.sign(user.toJSON(), process.env.JWT_SECRET);
        return res.status(200).json({
          success: true,
          message: "User logged in",
          user: user,
          token: token
        });
      });
    })(req, res, next);
  }
};

/**
 * POST /register
 * Create a new account.
 */

exports.registerUser = async (req, res) => {
  const userData = {
    name: req.body.name,
    username: req.body.username,
    email: req.body.email,
    password: req.body.password
  };

  const validate = await signUp.validate(userData, { abortEarly: false });

  if (validate.error) {
    res.status(200).json({
      success: false,
      message: "Validation failed",
      errors: joiErrors(validate)
    });
  } else {
    const user = new User(userData);
    user.save(err => {
      if (err) {
        return res.status(200).json({
          success: false,
          message: "Validation failed",
          errors: mongooseErrors(err)
        });
      }

      res.status(201).json({
        success: true,
        message: "User created successfully",
        user: user
      });
    });
  }
};
