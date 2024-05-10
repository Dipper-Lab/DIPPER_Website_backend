// core modules

// local modules

// third-party modules
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

// post add member
exports.postAddMember = async (req, res, next) => {
  try {
    // create member
    const member = await prisma.member.create({
      data: {
        ...req.body,
        image: req.file.path,
      },
    });
    res.status(200).json({
      message: `${
        member.fname + " " + member.lname
      } has been successfully added as a member`,
    });
  } catch (err) {
    res.status(422).json({ message: err });
    console.log(err);
  }
};

// patch update member
exports.patchUpdateMember = async (req, res, next) => {
  try {
    const id = req.params.id;
    // update member by id
    const updatedMember = await prisma.member.update({
      where: {
        id,
      },
      data: {
        ...req.body,
        image: req.file.path,
      },
    });
    res.status(200).json({
      message: `${
        updatedMember.fname + " " + updatedMember.lname
      } has been successfully updated`,
    });
  } catch (err) {
    res.status(404).json({ message: err });
    console.log(err);
  }
};

// delete member
exports.deleteMember = async (req, res, next) => {
  try {
    const id = req.params.id;
    // delete member by id
    const deletedMember = await prisma.member.delete({
      where: {
        id,
      },
    });
    res.status(200).json({
      message: `${
        deletedMember.fname + " " + deletedMember.lname
      } has been successfully deleted}`,
    });
  } catch (err) {
    res.status(404).json({ message: err });
    console.log(err);
  }
};

//post add publication
exports.postAddpublication = async (req, res, next) => {
  try {
    const publicationData = {
      title: req.body.title,
      abstract: req.body.abstract,
      link: req.body.link,
      publicationDate: new Date(req.body.publicationDate),
      image: req.body.image,
      non_lab_authors: req.body.nonLabAuthors,
      createdAt: new Date(),
    };
    const publication = await prisma.publication.create({
      data: {
        ...publicationData,
        authors: {
          connect: req.body.authors,
        },
      },
    });
    res.status(200).json({ message: "Publication added successfully " });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: err });
  }
};

// patch update publication
exports.patchUpdatepublication = async (req, res, next) => {
  try {
    //update publication by id
    const id = req.params.id;
    const updatedPublicationData = {
      title: req.body.title,
      abstract: req.body.abstract,
      link: req.body.link,
      publicationDate: new Date(req.body.publicationDate),
      image: req.body.image,
      non_lab_authors: req.body.nonLabAuthors,
    };
    const updatedpublication = await prisma.publication.update({
      where: {
        id,
      },
      data: {
        ...updatedPublicationData,
        authors: {
          set: req.body.authors,
        },
      },
    });

    res
      .status(200)
      .json({ message: `${updatedpublication.title} updated successfully` });
  } catch (err) {
    console.log(err);
    res.status(304).json({ message: err });
  }
};

// delete publication
exports.deletepublication = async (req, res, next) => {
  try {
    const id = req.params.id;
    // delete publication by id
    const deletedpublication = await prisma.publication.delete({
      where: {
        id,
      },
    });
    res.status(200).json({ message: `${deletedpublication.title} deleted` });
  } catch (err) {
    console.log(err);
    res.status(304).json({ message: err });
  }
};

// post add post project
exports.postAddProject = async (req, res, next) => {
  try {
    const projectData = {
      title: req.body.title,
      funding: req.body.funding,
      currency: req.body.currency,
      startDate: new Date(req.body.startDate),
      endDate: new Date(req.body.endDate),
      description: req.body.description,
      image: req.body.image,
      non_lab_contributors: req.body.nonLabContributors,
      createdAt: new Date(),
    };
    const project = await prisma.project.create({
      data: {
        ...projectData,
        contributors: {
          connect: req.body.contributors,
        },
        sponsors: {
          connect: req.body.sponsors,
        },
      },
    });
    res.status(200).json({ message: `${project.title} added successfully` });
  } catch (err) {
    console.log(err);
    res.status(422).json({ message: err });
  }
};

// patch update post project
exports.patchUpdateProject = async (req, res, next) => {
  try {
    //update project by id
    const id = req.params.id;
    const updatedProjectData = {
      title: req.body.title,
      funding: req.body.funding,
      currency: req.body.currency,
      startDate: new Date(req.body.startDate),
      endDate: new Date(req.body.endDate),
      description: req.body.description,
      image: req.body.image,
      non_lab_contributors: req.body.nonLabContributors,
    };
    const updatedProject = await prisma.project.update({
      where: {
        id,
      },
      data: {
        ...updatedProjectData,
        contributors: {
          set: req.body.contributors,
        },
        sponsors: {
          set: req.body.sponsors,
        },
      },
    });
    res.status(200).json({
      message: `Project ${updatedProject.title} updated successfully`,
    });
  } catch (err) {
    console.log(err);
    res.status(304).json({ message: err });
  }
};

// delete project
exports.deleteProject = async (req, res, next) => {
  try {
    // delete project by id
    const id = req.params.id;
    const deletedProject = await prisma.project.delete({
      where: {
        id,
      },
    });
    res.status(200).json({
      message: `Project ${deletedProject.title} deleted successfully`,
    });
  } catch (err) {
    console.log(err);
    res.status(404).json({ message: err });
  }
};

// post add post event
exports.postAddEvent = async (req, res, next) => {
  try {
    // eventData object
    const eventData = {
      title: req.body.title,
      location: req.body.location,
      link: req.body.link,
      date: new Date(req.body.date),
      writeUp: req.body.writeUp,
      images: req.body.images,
      non_lab_speakers: req.body.nonLabSpeakers,
    };

    // create event
    const event = await prisma.event.create({
      data: {
        ...eventData,
        speakers: {
          connect: req.body.speakers,
        },
      },
    });

    res.status(200).json({ message: `${event.title} added successfully` });
  } catch (err) {
    console.log(err);
    res.status(422).json({ message: err });
  }
};

// patch update post event
exports.patchUpdateEvent = async (req, res, next) => {
  try {
    //update event by id
    const id = req.params.id;
    const updatedEventData = {
      title: req.body.title,
      location: req.body.location,
      link: req.body.link,
      date: new Date(req.body.date),
      writeUp: req.body.writeUp,
      non_lab_speakers: req.body.nonLabSpeakers,
    };

    // update event
    const updatedEvent = await prisma.event.update({
      where: {
        id,
      },
      data: {
        ...updatedEventData,
        speakers: {
          set: req.body.speakers,
        },
        images: {
          set: req.body.images,
        },
      },
    });
    res
      .status(200)
      .json({ message: `${updatedEvent.title} updated successfully` });
  } catch (err) {
    console.log(err);
    res.status(304).json({ message: err });
  }
};

// delete event
exports.deleteEvent = async (req, res, next) => {
  try {
    // delete event by id
    const id = req.params.id;
    const deletedEvent = await prisma.event.delete({
      where: {
        id,
      },
    });
    res
      .status(200)
      .json({ message: `${deletedEvent.title} deleted successfully` });
  } catch (err) {
    console.log(err);
    res.status(404).json({ message: err });
  }
};

// post add sponsor
exports.postAddSponsor = async (req, res, next) => {
  try {
    const sponsorData = {
      name: req.body.name,
      image: req.body.image,
      url: req.body.url,
    };
    // create sponsor
    const sponsor = await prisma.sponsor.create({
      data: {
        ...sponsorData,
      },
    });
    res
      .status(200)
      .json({ message: `sponsor ${sponsor.name} added successfully` });
  } catch (err) {
    console.log(err);
    res.status(422).json({ message: err });
  }
};

// patch update sponsor
exports.patchUpdateSponsor = async (req, res, next) => {
  try {
    //update sponsor by id
    const id = req.params.id;

    const updatedSponsorData = {
      name: req.body.name,
      image: req.body.image,
      url: req.body.url,
    };

    // update sponsor
    const updatedSponsor = await prisma.sponsor.update({
      where: {
        id,
      },
      data: {
        ...updatedSponsorData,
      },
    });
    res
      .status(200)
      .json({ message: `Sponsor ${updatedSponsor.name} updated successfully` });
  } catch (err) {
    console.log(err);
    res.status(304).json({ message: err });
  }
};

// delete sponsor
exports.deleteSponsor = async (req, res, next) => {
  try {
    // delete sponsor by id
    const id = req.params.id;
    const deletedSponsor = await prisma.sponsor.delete({
      where: {
        id,
      },
    });
    res
      .status(200)
      .json({ message: `Sponsor ${deletedSponsor.name} deleted successfully` });
  } catch (err) {
    console.log(err);
    res.status(404).json({ message: err });
  }
};

// add about
exports.postAddAbout = async (req, res, next) => {
  try {
    const about = await prisma.about.create({
      data: {
        ...req.body,
      },
    });
    res.status(200).json({ message: `About added successfully` });
  } catch (err) {
    console.log(err);
    res.status(422).json({ message: err });
  }
};

// update about
exports.patchUpdateAbout = async (req, res, next) => {
  try {
    //update about by id
    const id = req.params.id;
    const updatedAbout = await prisma.about.update({
      where: {
        id,
      },
      data: {
        ...req.body,
      },
    });
    res.status(200).json({ message: `About updated successfully` });
  } catch (err) {
    console.log(err);
    res.status(304).json({ message: err });
  }
};

//post contact
exports.postContact = async (req, res, next) => {
  try {
    //add contact details
    const phone = req.body.phone.toString();
    const contact = await prisma.contact.create({
      data: {
        phone: phone,
        email: req.body.email,
        facebook: req.body.facebook,
        twitter: req.body.twitter,
      },
    });
    res.status(200).json({ message: `Contact added successfully` });
  } catch (err) {
    console.log(err);
    res.status(422).json({ message: err });
  }
};
