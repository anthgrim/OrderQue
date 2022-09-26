import connectDb from "../../../config/connectDb";
import User from "../../../models/userModel";
import bcrypt from "bcrypt";

/**
 * @desc   User sign up endpoint
 * @route  POST /api/user/
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
  const { firstName, lastName, email, password } = req.body;

  if (!firstName || !lastName || !email || !password) {
    return res.status(400).json({
      message: "Missing required fields",
    });
  }

  try {
    // Connect to db
    await connectDb();

    // Validate duplicates
    const isDuplicate = await User.findOne({ email }).exec();

    if (isDuplicate) {
      return res.status(409).json({
        message: `Email ${email} is already registered`,
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const newUser = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    return res.status(200).json({
      message: `User ${newUser.email} created successfully!`,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server Error",
      error,
    });
  }
};
