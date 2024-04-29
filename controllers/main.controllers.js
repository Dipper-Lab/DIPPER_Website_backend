// core modules

// local modules

// third-party modules

// get home page
exports.getHomePage = (req, res, next) => {
  res.status(200).json({ message: "HomePage" });
};

// get projects
exports.getProjects = (req, res, next) => {
  res.status(200).json({ message: "Projects" });
};

// get publications
exports.getPublications = (req, res, next) => {
  res.status(200).json({ message: "Publications" });
};

// get members
exports.getMembers = (req, res, next) => {
  res.status(200).json({ message: "Members" });
};

// get events
exports.getEvents = (req, res, next) => {
  res.status(200).json({ message: "Events" });
};

// get about
exports.getAbout = (req, res, next) => {
  res.status(200).json({ message: "About" });
};

// get contact us
exports.getContactUs = (req, res, next) => {
  res.status(200).json({ message: "ContactUs" });
};

// post contact us
exports.postContactUs = (req, res, next) => {
  res.status(200).json({ message: "ContactUs" });
};
