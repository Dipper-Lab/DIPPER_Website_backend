// core modules

// local modules
const mainController = require("../controllers/main.controllers"); //importing main controller

// third-party modules
const express = require("express"); //importing express

// define router
const router = express.Router();

// get home page
router.get("/", mainController.getHomePage);

// get projects
router.get("/projects", mainController.getProjects);

// get publications
router.get("/publications", mainController.getPublications);

// get members
router.get("/members", mainController.getMembers);

// get events
router.get("/events", mainController.getEvents);

// get about
router.get("/about", mainController.getAbout);

// get contact us
router.get("/contact-us", mainController.getContactUs);

// post contact us
router.post("/contact-us", mainController.postContactUs);

// export router
module.exports = router;
