const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const passport = require("passport");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);

const userController = require("./users/user.controller");
const betController = require("./bets/bet.controller");

dotenv.config({ path: ".env" });

const passportConfig = require("./config/passport");

const app = express();
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);
mongoose.set("useNewUrlParser", true);
mongoose.set("useUnifiedTopology", true);
mongoose.connect(process.env.MONGODB_URI);
// console.log(process.env.MONGODB_URI);
mongoose.connection.on("error", err => {
  console.error(err);

  console.log("MongoDB connection error. Please make sure MongoDB is running.");
  process.exit();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  session({
    resave: true,
    saveUninitialized: true,
    secret: process.env.SESSION_SECRET,
    cookie: { maxAge: 1209600000 }, // two weeks in milliseconds
    store: new MongoStore({
      url: process.env.MONGODB_URI,
      autoReconnect: true
    })
  })
);

app.disable("x-powered-by");

app.get("/", (req, res) => {
  res.status(200).send("Hello");
});

// Passport
app.use(passport.initialize());
app.use(passport.session());

app.post("/login", userController.loginUser);
app.post("/register", userController.registerUser);

app.post("/bet", betController.placeBet);
app.get("/bet", betController.getBets);

app.listen(process.env.PORT, () =>
  console.log(`App is running on ${process.env.APP_URL}:${process.env.PORT}`)
);
module.exports = app;
