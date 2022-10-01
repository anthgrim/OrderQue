import connectDb from "../../../config/connectDb";
import Restaurant from "../../../models/restaurantModel";

/**
 * @desc   Get all restaurants
 * @route  GET /api/home/restaurants
 * @method GET
 * @access Public
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

  try {
    // Connect to db
    await connectDb();

    // Get restaurants
    const restaurants = await Restaurant.find().lean();

    return res.status(200).json({
      restaurants,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Server Error",
      error,
    });
  }
}
