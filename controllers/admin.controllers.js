// core modules

// local modules

// third-party modules

// post add member
exports.postAddMember = async (req, res, next) => {
  res.status(200).json({ message: "AddMembers" });
};

// patch update member
exports.patchUpdateMember = async (req, res, next) => {
  res.status(200).json({ message: "UpdateMember" });
};

// delete member
exports.deleteMember = async (req, res, next) => {
  res.status(200).json({ message: "DeleteMember" });
};

//post add publication
exports.postAddpublication = async (req, res, next) => {
  res.status(200).json({ message: "AddPublication" });
};

// patch update publication
exports.patchUpdatepublication = async (req, res, next) => {
  res.status(200).json({ message: "UpdatePublication" });
};

// delete publication
exports.deletepublication = async (req, res, next) => {
  res.status(200).json({ message: "DeletePublication" });
};

// post add post project
exports.postAddProject = async (req, res, next) => {
  res.status(200).json({ message: "AddProject" });
};

// patch update post project
exports.patchUpdateProject = async (req, res, next) => {
  res.status(200).json({ message: "UpdateProject" });
};

// delete project
exports.deleteProject = async (req, res, next) => {
  res.status(200).json({ message: "DeleteProject" });
};

// post add post event
exports.postAddEvent = async (req, res, next) => {
  res.status(200).json({ message: "AddEvent" });
};

// patch update post event
exports.patchUpdateEvent = async (req, res, next) => {
  res.status(200).json({ message: "UpdateEvent" });
};

// delete event
exports.deleteEvent = async (req, res, next) => {
  res.status(200).json({ message: "DeleteEvent" });
};

// post add sponsor
exports.postAddSponsor = async (req, res, next) => {
  res.status(200).json({ message: "AddSponsor" });
};

// patch update sponsor
exports.patchUpdateSponsor = async (req, res, next) => {
  res.status(200).json({ message: "UpdateSponsor" });
};

// delete sponsor
exports.deleteSponsor = async (req, res, next) => {
  res.status(200).json({ message: "DeleteSponsor" });
};
