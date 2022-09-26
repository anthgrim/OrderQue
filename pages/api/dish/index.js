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
  const { name, description, price } = req.body;

  if (!name || !description || !price) {
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
    });

    return res.status(200).json({
      message: `Dish ${newDish.name} created successfully`,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server Error",
      error,
    });
  }
};

export default verifyJwt(handler, "Restaurant");
