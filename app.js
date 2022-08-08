const express = require("express");
const cors = require("cors");
const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerDocument = require("./swagger-outputfile.json");
const passport = require("passport");
const userRouter = require("./routes/users.route");
const singupRouter = require("./routes/signup.route");
const loginUser = require("./routes/login.route");
const resetPassword = require("./routes/passwordreset.route");
const config = require("./config-env/config-env");
require("./middleware/passport.middleware");
const jwt = require("jsonwebtoken");
const session = require("express-session");
const userLoginData = require("./service/userauth.service");
const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(passport.initialize());
app.use(
  session({
    secret: config.cookie_secret,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true },
  })
);
app.set('view engine', 'ejs');


app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument));
require("./middleware/passport");

//google login

app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect: `${config.client_side_url}/login`,
  }),
  (req, res) => {
    console.log(req.user)
    userLoginData(req, res);
  }
);

//facebook login

app.get(
  "/auth/facebook",
  passport.authenticate("facebook", { scope: ["email"] })
);

app.get(
  "/auth/facebook/callback",
  passport.authenticate("facebook", {
    session: false,
    failureRedirect: `${config.client_side_url}/login`,
  }),
  function (req, res) {
    // Successful authentication, redirect home.

    userLoginData(req, res);
  }
);

//linkedin login

app.get(
  "/auth/linkedin",
  passport.authenticate("linkedin", {
    session: false,
    state: "",
  })
);

app.get(
  "/auth/linkedin/callback",
  passport.authenticate("linkedin", {
    failureRedirect: `${config.client_side_url}/login`,
  }),
  (req, res) => {
    userLoginData(req, res);
  }
);


app.get('/auth/github',
  passport.authenticate('github', { scope: [ 'user:email' ] }));

app.get('/auth/github/callback', 
  passport.authenticate('github', { failureRedirect: `${config.client_side_url}/login`,}),
  function(req, res) {
    // Successful authentication, redirect home.
    userLoginData(req, res);
  });


app.use(
  "/api/user",
  passport.authenticate("jwt", { session: false }),
  userRouter
);
app.use("/user-signup", singupRouter);
app.use("/login-user", loginUser);
app.use("/reset-password", resetPassword);
//get server home page
app.get("/", (req, res) => {
  // #swagger.ignore = true

  res.sendFile(__dirname + "/./views/index.html");
  // res.render('email');
});

//routes not found
app.use((req, res, next) => {
  res.status(404).json({ message: "Not Found Routes" });
});

//default error handler

app.use((error, req, res, next) => {
  res.status(500).json({ message: "Sumthing wrong Not Found File!" });
});

module.exports = app;
