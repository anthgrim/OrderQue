import connectDb from "../../../config/connectDb";
import Restaurant from "../../../models/restaurantModel";
import verifyJwt from "../../../middlewares/verifyJWT";
import fs from "fs";
import asyncFs from "fs/promises";

/**
 * @desc   Upload logo
 * @route  POST /api/dish/
 * @method POST
 * @access Private
 * @param {import("next").NextApiRequest} req
 * @param {import("next").NextApiResponse} res
 */

const handler = async (req, res) => {
  const { path } = req.body;

  if (!path) {
    return res.status(400).json({
      message: "Missing file path",
    });
  }

  const restaurantId = req.id;

  if (!restaurantId) {
    return res.status(400).json({
      message: "Missing restaurant id",
    });
  }

  try {
    // Connect to db
    await connectDb();

    // Get target restaurant
    const targetRestaurant = await Restaurant.findById(restaurantId).exec();

    if (!targetRestaurant) {
      return res.status(404).json({
        message: "Restaurant not found",
      });
    }

    //Upload image
    targetRestaurant.image = {
      data: fs.readFileSync(path),
    };

    await targetRestaurant.save();

    // Remove file
    await asyncFs.unlink(path);

    return res.status(200).json({
      message: "Image has been uploaded",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};

export default verifyJwt(handler, "Restaurant");
