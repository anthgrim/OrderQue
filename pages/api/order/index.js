import connectDb from "../../../config/connectDb";
import Order from "../../../models/orderModel";
import Restaurant from "../../../models/restaurantModel";
import verifyJwt from "../../../middlewares/verifyJWT";

/**
 * @desc   Create order endpoint
 * @route  POST /api/order/
 * @method POST
 * @access Private
 * @param {import("next").NextApiRequest} req
 * @param {import("next").NextApiResponse} res
 */

/**
 * @swagger
 * paths:
 *  /api/order:
 *    post:
 *      tags: [Order]
 *      summary: Creates a new Order
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
 *              restaurantId:
 *                type: string
 *              date:
 *                type: Date
 *              total:
 *                type: number
 *              dishes:
 *                type: array
 *            required:
 *              - restaurantId
 *              - date
 *              - total
 *              - dishes
 *      responses:
 *        200:
 *          description: Order created successfully
 *        400:
 *          description: Missing required fields | Only POST method allowed
 *        500:
 *          description: Server Error
 */
const handler = async (req, res) => {
  // Validate request method
  if (req.method !== "POST") {
    return res.status(400).json({
      message: "Only POST method allowed",
    });
  }

  // Validate user id
  const userId = req.id;

  if (!userId) {
    return res.status(400).json({
      message: "Missing user id",
    });
  }

  // Validate required fields
  const { restaurantId, date, total, dishes } = req.body;

  if (!restaurantId || !date || !total || !dishes) {
    return res.status(400).json({
      message: "Missing required fields",
    });
  }

  try {
    // Connect to db
    await connectDb();

    // Create new order id
    let number = Math.floor(Math.random() * 10000);
    number = number + "ORD";

    // Get restaurant name
    const restaurant = await Restaurant.findById(restaurantId).exec();

    // Create new order
    const newOrder = await Order.create({
      userId,
      restaurantId,
      restaurantName: restaurant.name,
      number,
      date,
      total,
      dishes,
    });

    return res.status(200).json({
      message: `Order ${newOrder.number} created successfully`,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server Error",
      error,
    });
  }
};

export default verifyJwt(handler, "User");
