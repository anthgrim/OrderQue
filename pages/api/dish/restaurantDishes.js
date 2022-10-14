import connectDb from "../../../config/connectDb";
import Dish from "../../../models/dishModel";
import verifyJwt from "../../../middlewares/verifyJWT";

/**
 * @desc   Get restaurant dishes by restaurant id
 * @route  GET /api/dish/restaurantDishes
 * @method GET
 * @access Private
 * @param {import("next").NextApiRequest} req
 * @param {import("next").NextApiResponse} res
 */

/**
 * @swagger
 * paths:
 *  /api/dish/restaurantDishes:
 *    get:
 *      tags: [Dish]
 *      summary: Get restaurant dishes by restaurant id
 *      components:
 *        securitySchemes:
 *          cookieAuth:
 *            type: token
 *            in: cookie
 *            name: token
 *      security:
 *        - cookieAuth: []
 *      responses:
 *        200:
 *          description: Ok
 *        400:
 *          description: Missing restaurant id | Only GET method allowed
 *        500:
 *          description: Server Error
 */
const handler = async (req, res) => {
  // Validate request method
  if (req.method !== "GET") {
    return res.status(400).json({
      message: "Only GET method allowed",
    });
  }

  // Validate user id
  const restaurantId = req.id;

  if (!restaurantId) {
    return res.status(400).json({
      message: "Missing restaurant Id",
    });
  }

  try {
    // Connect to db
    await connectDb();

    // Get all dishes
    const targetDishes = await Dish.find({ restaurantId }).lean();

    return res.status(200).json({
      dishes: targetDishes,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server Error",
      error,
    });
  }
};

export default verifyJwt(handler, "Restaurant");
