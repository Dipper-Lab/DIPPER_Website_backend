const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

//post register
exports.postRegister = async (req, res, next) => {
  try {
    res.status(200).json({ message: "User created successfully" });
  } catch (err) {
    console.log(err);
    res.status(422).json({ message: err });
  }
};

//post login
exports.postLogin = async (req, res, next) => {};

//post logout
exports.postLogout = async (req, res, next) => {};

//post forgot password
exports.postForgotPassword = async (req, res, next) => {};

//post reset password
exports.postResetPassword = async (req, res, next) => {};

//post change password
exports.postChangePassword = async (req, res, next) => {};
