// core modules

// local modules

// third-party modules
const { PrismaClient } = require("@prisma/client"); //imporing prisma client
const cloudinary = require("cloudinary").v2; //importing cloudinary

const prisma = new PrismaClient();

exports.removeSingleImage = async (req, res, next) => {
  //fetch image url of member by id
  try {
    const { model, id } = req.params;
    // fetch image url of table by id
    const imageUrl = await prisma[model].findUnique({
      where: {
        id,
      },
      select: {
        image: true,
      },
    });
    //split image url into array elements at "/"
    const imageUrlArray = imageUrl.image.split("/");
    // concatenate the last two elements of imageUrlArray
    const lastTwoElements = `${imageUrlArray[imageUrlArray.length - 2]}/${
      imageUrlArray[imageUrlArray.length - 1]
    }`;
    //remove file extention
    const extention =
      lastTwoElements.split(".")[lastTwoElements.split(".").length - 1];
    const imagePublicId = lastTwoElements.slice(0, -extention.length - 1);
    // delete photo from cloudinary
    const del = await cloudinary.uploader.destroy(imagePublicId);
    next();
  } catch (err) {
    console.log(err);
    res.status(422).json({ message: err });
  }
};

// remove multiple images
exports.removeMultipleImages = async (req, res, next) => {
  try {
    const id = req.params.id;
    //array of image public ids
    const imagePublicIds = [];
    //get imageUrls
    const imageUrls = await prisma.event.findUnique({
      where: {
        id,
      },
      select: {
        images: true,
      },
    });

    for (let imageUrl of imageUrls.images) {
      //split image url into array elements at "/"
      const imageUrlArray = imageUrl.split("/");
      const imagePublicId = `${imageUrlArray[imageUrlArray.length - 2]}/${
        imageUrlArray[imageUrlArray.length - 1]
      }`;
      // push imagePublicId to imagePublicIds
      imagePublicIds.push(imagePublicId);
    }
    //delete from cloudinary
    const del = await cloudinary.api.delete_resources(imagePublicIds, {
      invalidate: true,
    });
    next();
  } catch (err) {
    res.status(400).json({ message: err });
  }
};
