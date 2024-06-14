const { PrismaClient } = require("@prisma/client"); //importing prisma client
const jwt = require("jsonwebtoken"); //importing jsonwebtoken
const bcrypt = require("bcrypt"); //importing bcrypt
require("dotenv").config(); //import .env

const prisma = new PrismaClient();

//post register
exports.postRegister = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    //check if there is an existing admin
    const admin = await prisma.admin.findMany({});
    if (admin.length > 0) {
      res.status(422).json({ message: "There is an existing admin" });
    } else {
      // check if email is of valid format
      const emailFormat = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/gi;
      const match = email.match(emailFormat);
      if (match == email) {
        // hash password
        const hashedPassword = await bcrypt.hash(password, 10);
        //create token
        const token = jwt.sign(
          {
            email: email,
            password: hashedPassword,
          },
          process.env.jwt_key,
          {
            expiresIn: "1d",
          }
        );
        // create admin
        const admin = await prisma.admin.create({
          data: {
            email: email,
            password: hashedPassword,
          },
        });
        res.status(200).json({ message: "Admin created successfully", token });
      } else {
        res.status(422).json({ message: "Invalid email format" });
      }
    }
  } catch (err) {
    console.log(err);
    res.status(422).json({ message: err });
  }
};

//post login
exports.postLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    //check if email is of valid format
    const emailFormat = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/gi;
    const match = email.match(emailFormat);
    if (match == email) {
      //find admin by email
      const admin = await prisma.admin.findMany({
        where: {
          email: email,
        },
      });
      //check if admin exists
      if (admin.length > 0) {
        //check if user password matches the hashed password in the database
        const match = await bcrypt.compare(password, admin[0].password);
        //if password matches, create token
        if (match) {
          const token = jwt.sign(
            {
              email: email,
              password: admin[0].password,
            },
            process.env.jwt_key,
            {
              expiresIn: "1d",
            }
          );
          res
            .status(200)
            .json({ message: "Admin logged in successfully", token });
        } else {
          res.status(422).json({ message: "Invalid password" });
        }
      } else {
        res.status(422).json({ message: "Admin not found" });
      }
    } else {
      res.status(422).json({ message: "Invalid email format" });
    }
  } catch (err) {
    console.log(err);
    res.status(200).json({ message: err });
  }
};

//post logout
exports.postLogout = async (req, res, next) => {};

//post forgot password
exports.postForgotPassword = async (req, res, next) => {};

//post reset password
exports.postResetPassword = async (req, res, next) => {};

//post change password
exports.postChangePassword = async (req, res, next) => {};
