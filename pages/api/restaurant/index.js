import connectDb from "../../../config/connectDb";
import Restaurant from "../../../models/restaurantModel";
import bcrypt from "bcrypt";

/**
 * @desc   Restaurant sign up endpoint
 * @route  POST /api/restaurant/
 * @method POST
 * @access Public
 * @param {import("next").NextApiRequest} req
 * @param {import("next").NextApiResponse} res
 */
export default handler = async (req, res) => {
  // Validate request method
  if (req.method !== "POST") {
    return res.status(400).json({
      message: "Only POST method allowed",
    });
  }

  // Validate required fields
  const { name, description, email, password } = req.body;

  if (!name || !description || !email || !password) {
    return res.status(400).json({
      message: "Missing required fields",
    });
  }

  try {
    // Conenct to db
    await connectDb();

    // Validate duplicates
    const isDuplicate = await Restaurant.findOne({ name, email }).exec();

    if (isDuplicate) {
      return res.status(409).json({
        message: `Restaurant with name ${name} and email ${email} is already registered`,
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new restaurant
    const newRestaurant = await Restaurant.create({
      name,
      description,
      email,
      password: hashedPassword,
    });

    return res.status(200).json({
      message: `Restaurant ${newRestaurant.name} created successfully`,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server Error",
      error,
    });
  }
};