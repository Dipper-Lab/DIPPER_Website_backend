// local modules

// core modules
const adminRoutes = require("./routes/admin.routes"); //importing admin routes
const mainRoutes = require("./routes/main.routes"); //importing main routes
const authenticationRoutes = require("./routes/authentication.routes"); //importing authentication routes
const checkAuth = require("./middlewares/check-auth");

// third-party modules
const express = require("express"); //importing express
const bodyParser = require("body-parser"); //importing body-parser

// define app
const app = express();

// middleware to use body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// middleware to handle cors errors
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept",
    "token"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow_Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

// middleware to use routes
app.use(mainRoutes); //main routes
app.use("/admin", checkAuth.verifyToken, adminRoutes); //admin routes
app.use("/authentication", authenticationRoutes);

// define port number
const port = process.env.PORT || 3040;

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
