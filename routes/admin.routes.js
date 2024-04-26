// core modules

// local modules
const adminController = require("../controllers/admin.controllers");

// third-party modules
const express = require("express"); //importing express

// define router
const router = express.Router();

// post add members
router.post("/addmember", adminController.postAddMember);

// patch update members
router.patch("/updatemember", adminController.patchUpdateMember);

// post add publications
router.post("/addpublication", adminController.postAddpublication);

// patch update publications
router.patch("/updatepublication", adminController.patchUpdatepublication);

// // post add projects
router.post("/addproject", adminController.postAddProject);

// post add event
router.post("/addevent", adminController.postAddEvent);

// post add sponsor
router.post("/addsponsor", adminController.postAddSponsor);

// export router
module.exports = router;
