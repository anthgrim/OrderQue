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

/**
 * @swagger
 * paths:
 *  /api/home/restaurants:
 *    get:
 *      tags: [Home]
 *      summary: Get list of all restaurants
 *      responses:
 *        200:
 *          description: Array of restaurants
 *        400:
 *          description: Only GET method allowed
 *        500:
 *          description: Server Error
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

    const filteredRestaurants =
      restaurants.length > 0
        ? restaurants.map((res) => {
            return {
              _id: res._id,
              name: res.name,
              description: res.description,
              image: res.image || "",
            };
          })
        : [];

    return res.status(200).json({
      restaurants: filteredRestaurants,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Server Error",
      error,
    });
  }
}
