import connectDb from "../../../config/connectDb";
import Restaurant from "../../../models/restaurantModel";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cookie from "cookie";

/**
 * @desc   Restaurant sign in endpoint
 * @route  POST /api/restaurant/signIn
 * @method POST
 * @access Public
 * @param {import("next").NextApiRequest} req
 * @param {import("next").NextApiResponse} res
 */
export default async function handler(req, res) {
  // Validate request method
  if (req.method !== "POST") {
    return res.status(400).json({
      message: "Only POST method allowed",
    });
  }

  // Validate required fields
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      message: "Missing required fields",
    });
  }

  try {
    // Connect to db
    await connectDb();

    // Verify if restaurant exist
    const targetRestaurant = await Restaurant.findOne({ email }).exec();

    if (!targetRestaurant) {
      return res.status(404).json({
        message: "Restaurant does not exist",
      });
    }

    // Validate password
    const isValid = await bcrypt.compare(password, targetRestaurant.password);

    if (!isValid) {
      return res.status(401).json({
        message: "Password is not valid",
      });
    }

    // Generate access token
    const accessToken = jwt.sign(
      { id: targetRestaurant.id },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "15m" }
    );

    // Generate refresh token
    const refreshToken = jwt.sign(
      { id: targetRestaurant.id },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "1d" }
    );

    // Update user's refresh token in db
    targetRestaurant.refreshToken = refreshToken;
    await targetRestaurant.save();

    // Set cookie
    res.setHeader(
      "Set-Cookie",
      cookie.serialize("jwt", refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: 24 * 60 * 60 * 1000,
        path: "/",
      })
    );

    return res.status(200).json({
      message: `Welcome, ${targetRestaurant.name}!`,
      accessToken,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server Error",
      error,
    });
  }
}
