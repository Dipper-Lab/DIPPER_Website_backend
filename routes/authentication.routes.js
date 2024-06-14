const authenticationController = require("../controllers/authentication.controllers"); //importing authentication controllers

const express = require("express"); //importing express

const router = express.Router(); //define router

//post register
router.post("/register", authenticationController.postRegister);

//export router
module.exports = router;
