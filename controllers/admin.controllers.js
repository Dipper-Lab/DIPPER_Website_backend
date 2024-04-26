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

//post add publication
exports.postAddpublication = async (req, res, next) => {
  res.status(200).json({ message: "AddPublication" });
};

// patch update publication
exports.patchUpdatepublication = async (req, res, next) => {
  res.status(200).json({ message: "UpdatePublication" });
};

// post add post project
exports.postAddProject = async (req, res, next) => {
  res.status(200).json({ message: "AddProject" });
};

// post add post event
exports.postAddEvent = async (req, res, next) => {
  res.status(200).json({ message: "AddEvent" });
};

// post add sponsor
exports.postAddSponsor = async (req, res, next) => {
  res.status(200).json({ message: "AddSponsor" });
};
