import connectDb from "../../../config/connectDb";
import Restaurant from "../../../models/restaurantModel";
import verifyJwt from "../../../middlewares/verifyJWT";

/**
 * @desc   Update Restaurant Information
 * @route  PUT /api/home/update
 * @method PUT
 * @access Private
 * @param {import("next").NextApiRequest} req
 * @param {import("next").NextApiResponse} res
 */
const handler = async (req, res) => {
  // Validate request method
  if (req.method !== "PUT") {
    return res.status(400).json({
      message: "Only PUT method allowed",
    });
  }

  // Validate restaurant id
  const restaurantId = req.id;

  if (!restaurantId) {
    return res.status(400).json({
      message: "Missing restaurant id",
    });
  }

  // Validate required fields
  const { name, description } = req.body;

  if (!name || !description) {
    return res.status(400).json({
      message: "Missing required fields",
    });
  }

  try {
    // Connect to db
    await connectDb();

    // Get target restaurant
    const targetRestaurant = await Restaurant.findByIdAndUpdate(restaurantId, {
      name,
      description,
    });

    if (!targetRestaurant) {
      return res.status(404).json({
        message: "Restaurant does not exist",
      });
    }

    return res.status(200).json({
      message: "Restaurant updated successfully",
      restaurant: targetRestaurant,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server Error",
      error,
    });
  }
};

export default verifyJwt(handler, "Restaurant");
