import connectDb from "../../../config/connectDb";
import Restaurant from "../../../models/restaurantModel";
import verifyJwt from "../../../middlewares/verifyJWT";
import aws from "aws-sdk";

/**
 * @desc   Upload logo
 * @route  POST /api/restaurant/uploadLogo
 * @method PUT
 * @access Private
 * @param {import("next").NextApiRequest} req
 * @param {import("next").NextApiResponse} res
 */

const handler = async (req, res) => {
  const { url, key } = req.body;

  if (!url || !key) {
    return res.status(400).json({
      message: "Missing required fields",
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

    // Update image url and key
    targetRestaurant.image = url;
    targetRestaurant.awsKey = key;
    await targetRestaurant.save();

    return res.status(200).json({
      message: "Image has linked to restaurant",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};

export default verifyJwt(handler, "Restaurant");
