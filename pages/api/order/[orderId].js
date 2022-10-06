import connectDb from "../../../config/connectDb";
import Order from "../../../models/orderModel";
import verifyJwt from "../../../middlewares/verifyJWT";

/**
 * @desc   Get order by order id endpoint
 * @route  GET /api/order/:orderId
 * @method GET
 * @access Private
 * @param {import("next").NextApiRequest} req
 * @param {import("next").NextApiResponse} res
 */

/**
 * @swagger
 * paths:
 *  /api/order/:orderId:
 *    get:
 *      tags: [Order]
 *      summary: Get Order by Order id
 *      responses:
 *        200:
 *          description: OK, Order
 *        400:
 *          description: Missing user Id | Missing order id | Only GET method allowed
 *        404:
 *          description: Order does not exist
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

  // Validate order id
  const { orderId } = req.query;

  if (!orderId) {
    return res.status(400).json({
      message: "Missing order id",
    });
  }

  try {
    // Connect to db
    await connectDb();

    // Get target order
    const targetOrder = await Order.findById(orderId).exec();

    if (!targetOrder) {
      return res.status(404).json({
        message: "Order does not exist",
      });
    }

    return res.status(200).json({
      order: targetOrder,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server Error",
      error,
    });
  }
};

export default verifyJwt(handler, "User");
