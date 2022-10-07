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
 *      tags: [User]
 *      summary: Sing In User
 *      requestBody:
 *       content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              email:
 *                type: string
 *              password:
 *                type: string
 *            required:
 *              - email
 *              - password
 *      responses:
 *        200:
 *          description: This sets a jwt token as a httpOnly cookie which is the refresh token, and an access Token that can be added to the auth state
 *          response:
 *            application/json
 *          headers:
 *            Set-Cookie:
 *              description: JWT token as a refreshToken in cookies
 *              schema:
 *                type: string
 *                example: token=asdfasdfeqerqfadfasd; path=/; HttpOnly
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
      accessToken,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server Error",
      error,
    });
  }
}
