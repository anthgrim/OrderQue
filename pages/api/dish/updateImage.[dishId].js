import connectDb from "../../../config/connectDb";
import Dish from "../../../models/dishModel";
import verifyJwt from "../../../middlewares/verifyJWT";

/**
 * @desc   Update dish image
 * @route  PUT /api/dish/updateImage
 * @method PUT
 * @access Private
 * @param {import("next").NextApiRequest} req
 * @param {import("next").NextApiResponse} res
 */
const handler = async (req, res) => {
  // Validate request method
  if (req.method === "PUT") {
    return res.status(400).json({
      message: "Only PUT methods allowed",
    });
  }

  // Validate user id
  const restaurantId = req.id;

  if (!restaurantId) {
    return res.status(400).json({
      message: "Missing restaurant Id",
    });
  }

  // Validate dish id
  const { dishId } = req.query;

  if (!dishId) {
    return res.status(400).json({
      message: "Missing dish id",
    });
  }

  // Validate files
  const files = req.files;

  if (!files?.image) {
    return res.status(400).json({
      message: "Missing image file",
    });
  }

  try {
    // Connect to db
    await connectDb();

    // Get target dish
    const targetDish = await Dish.findById(dishId).exec();

    if (!targetDish) {
      return res.status(404).json({
        message: "Dish does not exist",
      });
    }

    // Update image buffer in dish document
    targetDish.image = {
      data: Buffer.from(files.image, "ascii"),
      contentType: "image/png",
    };
    await targetDish.save();

    return res.status(200).json({
      message: "Dish image updated successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server Error",
      error,
    });
  }
};

export default verifyJwt(handler, "Restaurant");
