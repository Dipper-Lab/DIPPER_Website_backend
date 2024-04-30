// core modules

// local modules

// third-party modules
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

// post add member
exports.postAddMember = async (req, res, next) => {
  try {
    const member = await prisma.member.create({
      data: {
        ...req.body,
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
