const authenticationController = require("../controllers/authentication.controllers"); //importing authentication controllers

const express = require("express"); //importing express

const router = express.Router(); //define router

//post register
router.post("/register", authenticationController.postRegister);

//post login
router.post("/login", authenticationController.postLogin);

//export router
module.exports = router;
