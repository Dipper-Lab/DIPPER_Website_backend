// core modules

// local modules

// third-party modules
const { PrismaClient } = require("@prisma/client"); //importing prisma client
const nodemailer = require("nodemailer"); //importing nodemailer

//transporter for sending email
const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.email_user,
    pass: process.env.email_pass,
  },
});

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
      include: {
        contributors: true,
        sponsors: true,
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
      include: {
        authors: true,
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
    // fetch activemembers
    const membersData = await prisma.member.findMany({
      where: {
        isActive: true,
      },
      include: {
        projects: true,
        publications: true,
        events: true,
      },
    });
    res.status(200).json({ members: membersData });
  } catch (err) {
    console.log(err);
    res.status(422).json({ message: err });
  }
};

//get member
exports.getMember = async (req, res, next) => {
  try {
    //fetch member by id
    const id = req.params.id;
    const memberData = await prisma.member.findUnique({
      where: {
        id,
      },
      include: {
        projects: true,
        publications: true,
      },
    });
    res.status(200).json({ member: memberData });
  } catch (err) {
    console.log(err);
    res.status(422).json({ message: err });
  }
};

// get events
exports.getEvents = async (req, res, next) => {
  try {
    // fetch events
    const eventsData = await prisma.event.findMany({
      orderBy: {
        date: "asc",
      },
      include: {
        speakers: true,
      },
    });
    res.status(200).json({ events: eventsData });
  } catch (err) {
    console.log(err);
    res.status(422).json({ message: err });
  }
};

// get event
exports.getEvent = async (req, res, next) => {
  try {
    const id = req.params.id;
    //fetch event by id
    const eventData = await prisma.event.findUnique({
      where: {
        id,
      },
      include: {
        speakers: true,
      },
    });
    res.status(200).json({ event: eventData });
  } catch (err) {
    console.log(err);
    res.status(422).json({ message: err });
  }
};

// get about
exports.getAbout = async (req, res, next) => {
  try {
    //fetch about
    const about = await prisma.about.findMany({});
    res.status(200).json({ about: about[0] });
  } catch (err) {
    console.log(err);
    res.status(422).json({ err });
  }
};

// get contact us
exports.getContactUs = async (req, res, next) => {
  try {
    //fetch contact us
    const contactData = await prisma.contact.findMany({});
    res.status(200).json({ contacts: contactData[0] });
  } catch (err) {
    console.log(err);
    res.status(422).json({ err });
  }
};

// get sponsors
exports.getSponsors = async (req, res, next) => {
  try {
    //fetch sponsors
    const sponsorsData = await prisma.sponsor.findMany({});
    res.status(200).json({ sponsors: sponsorsData });
  } catch (err) {
    console.log(err);
    res.status(422).json({ err });
  }
};

// post message us
exports.postMessage = async (req, res, next) => {
  try {
    // send email
    const mailOptions = {
      from: `<${req.body.firstName} ${req.body.lastName}>`,
      to: process.env.email_user,
      replyTo: req.body.email,
      subject: req.body.subject,
      text: req.body.message,
    };
    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        res.status(422).json({ message: err });
      } else {
        res.status(200).json({ message: "Message Sent" });
      }
    });
  } catch (err) {
    console.log(err);
  }
};
