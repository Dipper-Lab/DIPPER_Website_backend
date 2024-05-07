// core modules

// local modules

// third-party modules
const { PrismaClient } = require("@prisma/client"); //importing prisma client

const prisma = new PrismaClient();

// get home page
exports.getHomePage = async (req, res, next) => {
  try {
    // fetch about
    const about = await prisma.about.findMany({});
    //fetch events
    const eventsData = await prisma.event.findMany({
      orderBy: {
        date: "asc",
      },
    });
    //fetch sponsors
    const sponsorsData = await prisma.sponsor.findMany({});

    // extract about description
    const aboutDescription = about[0].description;

    res.status(200).json({
      about: aboutDescription,
      events: eventsData,
      sponsors: sponsorsData,
    });
  } catch (err) {
    console.log(err);
    res.status(422).json({ message: err });
  }
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
