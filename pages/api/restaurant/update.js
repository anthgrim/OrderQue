import connectDb from "../../../config/connectDb";
import Restaurant from "../../../models/restaurantModel";
import verifyJwt from "../../../middlewares/verifyJWT";

/**
 * @desc   Update Restaurant Information
 * @route  PUT /api/restaurant/update
 * @method PUT
 * @access Private
 * @param {import("next").NextApiRequest} req
 * @param {import("next").NextApiResponse} res
 */

/**
 * @swagger
 * paths:
 *  /api/restaurant/update:
 *    put:
 *      tags: [Restaurant]
 *      summary: Updates name and description of the restaurant
 *      components:
 *        securitySchemes:
 *          cookieAuth:
 *            type: token
 *            in: cookie
 *            name: token
 *      security:
 *        - cookieAuth: []
 *      requestBody:
 *       content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              name:
 *                type: string
 *              description:
 *                type: string
 *            required:
 *              - name
 *              - description
 *      responses:
 *        200:
 *          description: Restaurant updated successfully
 *        400:
 *          description: Only PUT method allowed || Missing restaurant id || Missing required fields
 *        404:
 *          description: Restaurant does not exist
 *        500:
 *          description: Server Error
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
    const targetRestaurant = await Restaurant.findById(restaurantId).exec();

    if (!targetRestaurant) {
      return res.status(404).json({
        message: "Restaurant does not exist",
      });
    }

    targetRestaurant.name = name;
    targetRestaurant.description = description;
    await targetRestaurant.save();

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
