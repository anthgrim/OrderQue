import connectDb from "../../../config/connectDb";
import Restaurant from "../../../models/restaurantModel";
import verifyJwt from "../../../middlewares/verifyJWT";

/**
 * @desc   Update logo
 * @route  PUT /api/restaurant/updateLogo
 * @method PUT
 * @access Private
 * @param {import("next").NextApiRequest} req
 * @param {import("next").NextApiResponse} res
 */

/**
 * @swagger
 * paths:
 *  /api/restaurant/updateLogo:
 *    put:
 *      tags: [Restaurant]
 *      summary: Updates new url and key from aws for the images
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
 *              url:
 *                type: string
 *              key:
 *                type: string
 *            required:
 *              - url
 *              - key
 *      responses:
 *        200:
 *          description: Image has been linked to restaurant
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
  const { url, key } = req.body;

  if (!url || !key) {
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

    // Update image url and key
    targetRestaurant.image = url;
    targetRestaurant.awsKey = key;
    await targetRestaurant.save();

    return res.status(200).json({
      message: "Image has been linked to restaurant",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};

export default verifyJwt(handler, "Restaurant");
