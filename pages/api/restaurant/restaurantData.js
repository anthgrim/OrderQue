import connectDb from "../../../config/connectDb";
import Restaurant from "../../../models/restaurantModel";
import verifyJWT from "../../../middlewares/verifyJWT";

/**
 * @desc   Get restaurant information
 * @route  GET /api/restaurant/restaurantData
 * @method GET
 * @access Private
 * @param {import("next").NextApiRequest} req
 * @param {import("next").NextApiResponse} res
 */

/**
 * @swagger
 * paths:
 *  /api/restaurant/restaurantData:
 *    get:
 *      tags: [Restaurant]
 *      summary: Get restaurant information
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
 *          description: Restaurant Object
 *        400:
 *          description: Only GET method allowed || Missing restaurant id
 *        404:
 *          description: Restaurant does not exist
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

  // Verify restaurant id
  const restaurantId = req.id;

  if (!restaurantId) {
    return res.status(400).json({
      message: "Missing restaurant id",
    });
  }

  try {
    // Connect to Db
    await connectDb();

    // Get restaurant data
    const targetRestaurant = await Restaurant.findById(restaurantId).exec();

    if (!targetRestaurant) {
      return res.status(404).json({
        message: "Restaurant does not exist",
      });
    }

    return res.status(200).json({
      restaurant: targetRestaurant,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server Error",
      error,
    });
  }
};

export default verifyJWT(handler, "Restaurant");
