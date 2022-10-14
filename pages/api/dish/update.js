import connectDb from "../../../config/connectDb";
import Dish from "../../../models/dishModel";
import verifyJwt from "../../../middlewares/verifyJWT";

/**
 * @desc   Update restaurant dish by dish id
 * @route  PUT /api/dish/edit
 * @method PUT
 * @access Private
 * @param {import("next").NextApiRequest} req
 * @param {import("next").NextApiResponse} res
 */

/**
 * @swagger
 * paths:
 *  /api/dish/update:
 *    put:
 *      tags: [Dish]
 *      summary: Update dish by id
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
 *              dishId:
 *                type: string
 *              name:
 *                type: string
 *              description:
 *                type: string
 *              price:
 *                type: number
 *              image:
 *                type: string
 *              awsKey:
 *                type: string
 *            required:
 *              - dishId
 *              - name
 *              - description
 *              - price
 *              - image
 *              - awsKey
 *      responses:
 *        200:
 *          description: Dish updated successfully
 *        400:
 *          description: Missing restaurant id | Missing dish id | Missing required fields | Only PUT method allowed
 *        404:
 *          description: Dish does not exist
 *        500:
 *          description: Server Error
 */
const handler = async (req, res) => {
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

  const { dishId, name, description, price, image, awsKey } = req.body;

  // Validate dish id
  if (!dishId) {
    return res.status(400).json({
      message: "Missing dish id",
    });
  }

  // Validate required fields
  if (!name || !description || !price || !image || !awsKey) {
    return res.status(400).json({
      message: "Missing required fields",
    });
  }

  try {
    // Get target dish
    const targetDish = await Dish.findById(dishId).exec();

    if (!targetDish) {
      return res.status(404).json({
        message: "Dish does not exist",
      });
    }

    // Perform update
    targetDish.name = name;
    targetDish.description = description;
    targetDish.price = price;
    targetDish.image = image;
    targetDish.awsKey = awsKey;
    await targetDish.save();

    return res.status(200).json({
      message: "Dish updated successfully",
      dish: targetDish,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server Error",
      error,
    });
  }
};

export default verifyJwt(handler, "Restaurant");
