import connectDb from "../../../config/connectDb";
import Order from "../../../models/orderModel";
import verifyJwt from "../../../middlewares/verifyJWT";

/**
 * @desc   Create orders by user id enpoint
 * @route  GET /api/order/userOrders
 * @method GET
 * @access Private
 * @param {import("next").NextApiRequest} req
 * @param {import("next").NextApiResponse} res
 */

/**
 * @swagger
 * paths:
 *  /api/order/userOrders:
 *    get:
 *      tags: [Order]
 *      summary: Get User Orders by userId
 *      components:
 *        securitySchemes:
 *          cookieAuth:
 *            type: token
 *            in: cookie
 *            name: token
 *      security:
 *        - cookieAuth: []
 *      description: Returns list of user orders
 *      responses:
 *        200:
 *          description: Array of user orders
 *        400:
 *          description: Missing user id | Only GET method allowed
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
  const userId = req.id;

  if (!userId) {
    return res.status(400).json({
      message: "Missing user id",
    });
  }

  try {
    // Connect to db
    await connectDb();

    // Get target orders
    const targetOrders = await Order.find({ userId }).lean();

    return res.status(200).json({
      orders: targetOrders,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server Error",
      error,
    });
  }
};

export default verifyJwt(handler, "User");
