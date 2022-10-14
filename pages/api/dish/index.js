import connectDb from "../../../config/connectDb";
import Dish from "../../../models/dishModel";
import verifyJwt from "../../../middlewares/verifyJWT";

/**
 * @desc   Create dish endpoint
 * @route  POST /api/dish/
 * @method POST
 * @access Private
 * @param {import("next").NextApiRequest} req
 * @param {import("next").NextApiResponse} res
 */

/**
 * @swagger
 * paths:
 *  /api/dish:
 *    post:
 *      tags: [Dish]
 *      summary: Creates a new dish
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
 *              price:
 *                type: double
 *            required:
 *              - name
 *              - description
 *              - price
 *      responses:
 *        200:
 *          description: New dish created successfully | Dish object
 *        400:
 *          description: Missing restaurant id | Missing required fields | Only POST method allowed
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
  const restaurantId = req.id;

  if (!restaurantId) {
    return res.status(400).json({
      message: "Missing restaurant Id",
    });
  }

  // Validate required fields
  const { name, description, price, image, awsKey } = req.body;

  if (!name || !description || !price || !image || !awsKey) {
    return res.status(400).json({
      message: "Missing required fields",
    });
  }

  try {
    // Connect to db
    await connectDb();

    // cerate new dish
    const newDish = await Dish.create({
      restaurantId,
      name,
      description,
      price,
      image,
      awsKey,
    });

    return res.status(200).json({
      message: `Dish ${newDish.name} created successfully`,
      dish: newDish,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server Error",
      error,
    });
  }
};

export default verifyJwt(handler, "Restaurant");
