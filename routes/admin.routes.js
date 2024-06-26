// core modules

// local modules
const adminController = require("../controllers/admin.controllers"); //impporting admin controllers
const { storage } = require("../middlewares/imageUploader"); //importing image uploader middleware
const imageRemover = require("../middlewares/imageRemover"); //importing image remover middleware

// third-party modules
const express = require("express"); //importing express
const multer = require("multer"); //importing multer

// define router
const router = express.Router();

//define multer
const upload = multer({ storage });

// post add members
router.post("/addmember", adminController.postAddMember);

// patch update members
router.patch("/updatemember/:id", adminController.patchUpdateMember);

//deactivate member
router.patch("/deactivatemember/:id", adminController.deactivateMember);

// delete member
router.delete(
  "/delete/member/:id",
  // imageRemover.removeSingleImage,
  adminController.deleteMember
);

// post add publications
router.post("/addpublication", adminController.postAddpublication);

// patch update publications
router.patch("/updatepublication/:id", adminController.patchUpdatepublication);

// delete publications
router.delete(
  "/delete/publication/:id",
  // imageRemover.removeSingleImage,
  adminController.deletepublication
);

// post add projects
router.post("/addproject", adminController.postAddProject);

// patch update projects
router.patch("/updateproject/:id", adminController.patchUpdateProject);

// delete projects
router.delete("/deleteproject/:id", adminController.deleteProject);

// post add event
router.post("/addevent", adminController.postAddEvent);

// patch update event
router.patch("/updateevent/:id", adminController.patchUpdateEvent);

// delete event
router.delete(
  "/deleteevent/:id",
  imageRemover.removeMultipleImages, //remove multiple images
  adminController.deleteEvent
);

// post add sponsor
router.post("/addsponsor", adminController.postAddSponsor);

// patch update sponsor
router.patch("/updatesponsor/:id", adminController.patchUpdateSponsor);

// delete sponsor
router.delete("/deletesponsor/:id", adminController.deleteSponsor);

// post add about
router.post("/addabout", adminController.postAddAbout);

// patch update about
router.patch("/updateabout/:id", adminController.patchUpdateAbout);

// post contact
router.post("/contact-us", adminController.postContact);

// export router
module.exports = router;
