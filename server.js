const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const passport = require("passport");
const config = require("config");
const connectDB = require('./config/db');
const cookieSession = require('cookie-session')


// Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Express Session
const sessionSecret = config.get("session-secret");
// app.use(
//   session({
//     secret: sessionSecret,
//     saveUninitialized: false,
//     resave: false,
//   })
// );

// Passport init
app.use(passport.initialize());
app.use(passport.session());
app.use(cookieSession({
  name: 'idea-session',
  keys: ['key1', 'key2']
}))
 

//Connect to database
connectDB();

app.get("/", (req, res) => res.send("API Running"));

// Define Routes
app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on PORT ${PORT}`));

// Start the backend server with "npm run server"
