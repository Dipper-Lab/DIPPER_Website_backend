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
exports.getProjects = async (req, res, next) => {
  try {
    // fetch projects
    const projectsData = await prisma.project.findMany({
      orderBy: {
        createdAt: "asc",
      },
    });
    res.status(200).json({ projects: projectsData });
  } catch (err) {
    console.log(err);
    res.status(422).json({ message: err });
  }
};

//get project
exports.getProject = async (req, res, next) => {
  try {
    const id = req.params.id;
    //fetch project by id
    const projectData = await prisma.project.findUnique({
      where: {
        id,
      },
      include: {
        contributors: true,
        sponsors: true,
      },
    });

    res.status(200).json({ project: projectData });
  } catch (err) {
    console.log(err);
    res.status(422).json({ message: err });
  }
};

// get publications
exports.getPublications = async (req, res, next) => {
  try {
    // fetch publications
    const publicationsData = await prisma.publication.findMany({
      orderBy: {
        createdAt: "asc",
      },
    });
    res.status(200).json({ publications: publicationsData });
  } catch (err) {
    console.log(err);
    res.status(422).json({ message: err });
  }
};

//get publication
exports.getPublication = async (req, res, next) => {
  try {
    const id = req.params.id;
    const publicationData = await prisma.publication.findUnique({
      where: {
        id,
      },
      include: {
        authors: true,
      },
    });
    res.status(200).json({ publication: publicationData });
  } catch (err) {
    console.log(err);
    res.status(422).json({ message: err });
  }
};
// get members
exports.getMembers = async (req, res, next) => {
  try {
    // fetch members
    const membersData = await prisma.member.findMany({});
    res.status(200).json({ members: membersData });
  } catch (err) {
    console.log(err);
    res.status(422).json({ message: err });
  }
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
