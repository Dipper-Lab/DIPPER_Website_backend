const jwt = require("jsonwebtoken"); //importing jsonwebtoken
require("dotenv").config(); //import .env
const bcrypt = require("bcrypt"); //importing bcrypt

const { PrismaClient } = require("@prisma/client"); //importing prisma client
const prisma = new PrismaClient();

//middleware to check admin token
exports.verifyToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    // decode token
    const decoded = jwt.verify(token, process.env.JWT_key);
    //find admin by email
    const admin = await prisma.admin.findMany({
      where: {
        email: decoded.email,
      },
    });
    // compare admin data with token data
    if (
      admin[0].email === decoded.email &&
      admin[0].password === decoded.password
    ) {
      next();
    } else {
      res.status(401).json({ message: "Authentication failed: Invalid token" });
    }
  } catch (err) {
    res.status(401).json({ message: "Authentication failed", err: err });
  }
};
