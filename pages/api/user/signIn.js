import connectDb from "../../../config/connectDb";
import User from "../../../models/userModel";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cookie from "cookie";

/**
 * @desc   User sign in endpoint
 * @route  POST /api/user/signIn
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

    // Verify if user exist
    const targetUser = await User.findOne({ email }).exec();

    if (!targetUser) {
      return res.status(404).json({
        message: "User does not exist",
      });
    }

    // Validate password
    const isValid = await bcrypt.compare(password, targetUser.password);

    if (!isValid) {
      return res.status(401).json({
        message: "Password is not valid",
      });
    }

    // Generate access token
    const accessToken = jwt.sign(
      { id: targetUser.id },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "15m" }
    );

    // Generate refresh token
    const refreshToken = jwt.sign(
      { id: targetUser.id },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "1d" }
    );

    // Update user's refresh token in db
    targetUser.refreshToken = refreshToken;
    await targetUser.save();

    // Set cookie
    res.setHeader(
      "Set-Cookie",
      cookie.serialize("token", refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: 24 * 60 * 60 * 1000,
        path: "/",
      })
    );

    return res.status(200).json({
      message: `Welcome, ${targetUser.firstName} ${targetUser.lastName}!`,
      email: targetUser.email,
      id: targetUser.id,
      refreshToken,
      accessToken,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server Error",
      error,
    });
  }
}
