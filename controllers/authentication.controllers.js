const { PrismaClient } = require("@prisma/client"); //importing prisma client
const jwt = require("jsonwebtoken"); //importing jsonwebtoken
const bcrypt = require("bcrypt"); //importing bcrypt
const nodemailer = require("nodemailer"); //importing nodemailer
require("dotenv").config(); //import .env

const prisma = new PrismaClient();

//transporter for sending email
const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.email_user,
    pass: process.env.email_pass,
  },
});

//post register
exports.postRegister = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    //check if there is an existing admin
    const admins = await prisma.admin.findMany();
    if (admins.length > 0) {
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
          process.env.JWT_key,
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
            process.env.JWT_key,
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
exports.postForgotPassword = async (req, res, next) => {
  try {
    //find admin by id
    const email = req.body.email;
    const admin = await prisma.admin.findFirst({
      where: {
        email: email,
      },
    });
    //if admin not found send a response message to the user that email does not exist
    if (!admin) {
      res.status(422).json({ message: "Email does not exist" });
    }
    // else send an email to the admin with a link to reset the password
    else {
      //sign a token with adnin id
      const token = jwt.sign(
        {
          id: admin.id,
        },
        process.env.JWT_key,
        {
          expiresIn: "1h",
        }
      );
      // reset password url
      const resetPasswordUrl = `${process.env.production_base_url}/reset-password/${token}`;
      //send email with token as param of the url
      const mailOptions = {
        from: `DIPPER Lab: <${process.env.email_user}>`,
        to: admin.email,
        replyTo: "noreply@noreply.com",
        subject: "Password Reset",
        text: `Please click on the following link to reset your password: ${resetPasswordUrl} \n If you did not request a password reset, please ignore this email. DO NOT REPLY.`,
      };
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log(error);
          res.status(422).json({ message: error });
        } else {
          console.log("Email sent: " + info.response);
          res.status(200).json({ message: "Email sent" });
        }
      });
    }
  } catch (err) {
    res.status(422).json({ message: err });
  }
};

//post reset password
exports.postResetPassword = async (req, res, next) => {};

//post change password
exports.postChangePassword = async (req, res, next) => {};
