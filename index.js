const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dbConfig = require("./config/db.config");
var cors = require('cors')

app.use(cors())

const auth = require("./middlewares/auth.js");
const errors = require("./middlewares/errors.js");
const unless = require("express-unless");


mongoose.Promise = global.Promise;
mongoose
  .connect(dbConfig.db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(
    () => {
      console.log("Database connected");
    },
    (error) => {
      console.log("Database can't be connected: " + error);
    }
  );

// middleware for authenticating token submitted with requests
/**
 * Conditionally skip a middleware when a condition is met.
 */

/*
app.use(
  auth.authenticateToken.unless({
    path: [
      { url: "/users/login", methods: ["POST"] },
      { url: "/users/:id", methods: ["PATCH"]},
      { url: "/users/register", methods: ["POST"] },
      { url: "/users/otpLogin", methods: ["POST"] },
      { url: "/users/verifyOTP", methods: ["POST"] },
    ],
  })
);
*/
app.use(express.json());

// initialize routes
app.use("/users", require("./routes/users.routes"));

// middleware for error responses
app.use(errors.errorHandler);

// listen for requests
app.listen(process.env.port || 4000, function () {
  console.log("http://localhost:4000");
});
