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
router.patch("/updatemember/:id", adminController.patchUpdateMember);

// delete members
router.delete("/deletemember/:id", adminController.deleteMember);

// post add publications
router.post("/addpublication", adminController.postAddpublication);

// patch update publications
router.patch("/updatepublication/:id", adminController.patchUpdatepublication);

// delete publications
router.delete("/deletepublication/:id", adminController.deletepublication);

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
router.delete("/deleteevent/:id", adminController.deleteEvent);

// post add sponsor
router.post("/addsponsor", adminController.postAddSponsor);

// patch update sponsor
router.patch("/updatesponsor/:id", adminController.patchUpdateSponsor);

// delete sponsor
router.delete("/deletesponsor/:id", adminController.deleteSponsor);

router.post("/addabout", adminController.postAddAbout);

// export router
module.exports = router;
