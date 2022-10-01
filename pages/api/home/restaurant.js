import connectDb from "../../../config/connectDb";
import Restaurant from "../../../models/restaurantModel";
import Dish from "../../../models/dishModel";

/**
 * @desc   Get all dishes for restaurant
 * @route  GET /api/home/restaurant/:restaurantId
 * @method GET
 * @access Private
 * @param {import("next").NextApiRequest} req
 * @param {import("next").NextApiResponse} res
 */
export default async function handler(req, res) {
  // Validate request method
  if (req.method !== "GET") {
    return res.status(400).json({
      message: "Only GET method allowed",
    });
  }

  const { restaurantId } = req.query;

  if (!restaurantId) {
    return res.status(400).json({
      message: "Missing restaurant id",
    });
  }

  try {
    // Connect to db
    await connectDb();

    // Verify if restaurant exist
    const targetRestaurant = await Restaurant.findById(restaurantId).exec();

    if (!targetRestaurant) {
      return res.status(404).json({
        message: "Restaurant does not exist",
      });
    }

    // Getl all restaurant dishes
    const dishes = await Dish.find({ restaurantId }).lean();

    // Prepare restaurant response
    const restaurant = {
      name: targetRestaurant.name,
      description: targetRestaurant.description,
    };

    return res.status(200).json({
      restaurant,
      dishes,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server Error",
      error,
    });
  }
}
