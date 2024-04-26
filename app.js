// local modules

// core modules
const adminRoutes = require("./routes/admin.routes"); //importing admin routes

// third-party modules
const express = require("express"); //importing express

// define app
const app = express();

// middleware to handle cors errors
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow_Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

// niddleware to use admin routes
app.use("/admin", adminRoutes);

// define port number
const port = process.env.PORT || 3040;

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
