const User = require("./user.model");
const { signUp, signIn } = require("./user.validator");
const { joiErrors, mongooseErrors } = require("../utils/errors");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
/**
 * POST /login
 * Login registered user.
 */

exports.loginUser = async (req, res, next) => {
  const userData = {
    username: req.body.username,
    password: req.body.password
  };

  const validate = signIn.validate(userData, { abortEarly: false });

  if (validate.error) {
    res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: joiErrors(validate)
    });
  } else {
    passport.authenticate("local", { session: false }, (err, user, info) => {
      if (err)
        return res
          .status(500)
          .json({ success: false, message: "Somthing went wrong!" });
      if (!user) {
        return res.status(200).json({
          success: false,
          message: "Invalid username or password"
        });
      }
      if (user.emailVerified === false) {
        return res.status(200).json({
          success: false,
          message: "Email verification pending."
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

  const validate = signUp.validate(userData, { abortEarly: false });

  if (validate.error) {
    return res.status(200).json({
      success: false,
      message: "Validation failed",
      errors: joiErrors(validate)
    });
  } else {
    userData.emailVerificationToken = crypto.randomBytes(16).toString("hex");
    const user = new User(userData);
    user.save(err => {
      if (err) {
        return res.status(200).json({
          success: false,
          message: "Validation failed",
          errors: mongooseErrors(err)
        });
      }
      let transporter = nodemailer.createTransport({
        // host: process.env.MAIL_HOST,
        // port: process.env.MAIL_PORT,
        // secure: false,
        service: "SendGrid",
        auth: {
          user: process.env.SENDGRID_USER,
          pass: process.env.SENDGRID_PASSWORD
        }
        // auth: {
        //   user: process.env.MAIL_USERNAME,
        //   pass: process.env.MAIL_PASSWORD
        // }
      });

      const mailOptions = {
        to: user.email,
        from: "sales@infynno.com",
        subject: "CricApp Account Verification Code",
        // text: `Thank you for registering with CricApp.\n\n To verify your email address please click on the following link, or paste this into your browser:\n\nhttp://${req.headers.host}/user/verify/${userData.emailVerificationToken}\n\n\n\nThank You!`
        html: `Thank you for registering with <b>CricApp</b>.<br/> To verify your email address please click on the following link, or paste this into your browser:<br/>http://${req.headers.host}/user/verify/${userData.emailVerificationToken}<br/><br/>Thank You!`
      };

      transporter
        .sendMail(mailOptions)
        .then(() => {
          return res.status(201).json({
            success: true,
            message: "User created successfully",
            user: user
          });
        })
        .catch(err => {
          return res.status(400).json({
            success: false,
            message: "User created successfully",
            errors: err
          });
        });
    });
  }
};

/**
 * GET /user/verify/:token
 * Create a new account.
 */

exports.verifyEmail = async (req, res) => {
  const user = await User.findOne({ emailVerificationToken: req.params.token });
  if (user === null) {
    return res.status(200).json({
      success: false,
      message: "Token invalid or expired."
    });
  }
  await User.updateOne(
    { _id: user.id },
    { emailVerificationToken: null, emailVerified: true }
  );
  return res.status(200).json({
    success: true,
    message: "Email verified sucessfully."
  });
};
