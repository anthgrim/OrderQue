import connectDb from "../../../config/connectDb";
import User from "../../../models/userModel";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cookie from "cookie";

/**
 * @swagger
 * paths:
 *  /api/user/signIn:
 *    post:
 *      summary: Creates a new user
 *      requestBody:
 *       content:
 *        application/x-www-form-urlencoded:
 *          schema:
 *            type: object
 *            properties:
 *              email:
 *                type: string
 *              password:
 *                type: string
 *            required:
 *              - firstName
 *              - lastName
 *              - email
 *              - password
 *      responses:
 *        200:
 *          description: User created successfully
 *        400:
 *          description: Missing required fields | Only POST method allowed
 *        401:
 *          description: Password is not valid
 *        404:
 *          description: User does not exist
 *        500:
 *          description: Server Error
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

    const user = `${targetUser.firstName} ${targetUser.lastName}`;

    return res.status(200).json({
      message: `Welcome, ${user}!`,
      user,
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
