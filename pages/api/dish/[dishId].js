import connectDb from "../../../config/connectDb";
import Dish from "../../../models/dishModel";
import verifyJwt from "../../../middlewares/verifyJWT";

/**
 * @desc   Get, Update or Delete restaurant dish by dish id
 * @route  GET PUT DELETE /api/dish/:dishId
 * @method GET PUT DELETE
 * @access Private
 * @param {import("next").NextApiRequest} req
 * @param {import("next").NextApiResponse} res
 */
const handler = async (req, res) => {
  // Validate request method
  if (req.method === "POST") {
    return res.status(400).json({
      message: "Only GET PUT and DELETE methods allowed",
    });
  }

  // Validate user id
  const restaurantId = req.id;

  if (!restaurantId) {
    return res.status(400).json({
      message: "Missing restaurant Id",
    });
  }

  // Validate dish id
  const { dishId } = req.query;

  if (!dishId) {
    return res.status(400).json({
      message: "Missing dish id",
    });
  }

  try {
    // Connect to db
    await connectDb();

    // Get target dish
    const targetDish = await Dish.findById(dishId).exec();

    if (!targetDish) {
      return res.status(404).json({
        message: "Dish does not exist",
      });
    }

    switch (req.method) {
      case "GET":
        res.status(200).json({
          dish: targetDish,
        });
        break;

      case "PUT":
        // Validate required fields
        const { name, description, price } = req.body;

        if (!name || !description || !price) {
          return res.status(400).json({
            message: "Missing required fields",
          });
        }

        // Update dish in db
        targetDish.name = name;
        targetDish.description = description;
        targetDish.price = price;
        await targetDish.save();

        res.status(200).json({
          message: "Dish updated successfully",
        });

        break;

      case "DELETE":
        // Delete dish in db
        await targetDish.delete();

        res.status(200).json({
          message: "Dish deleted successfully",
        });
        break;
      default:
        res.status(400).json({
          message: "Invalid request",
        });
        break;
    }
  } catch (error) {
    return res.status(500).json({
      message: "Server Error",
      error,
    });
  }
};

export default verifyJwt(handler, "Restaurant");
