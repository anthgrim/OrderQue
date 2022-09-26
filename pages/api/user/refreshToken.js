import connectDb from "../../../config/connectDb";
import User from "../../../models/userModel";
import jwt from "jsonwebtoken";

/**
 * @desc   User refresh token endpoint
 * @route  GET /api/user/refreshToken
 * @method GET
 * @access Public
 * @param {import("next").NextApiRequest} req
 * @param {import("next").NextApiResponse} res
 */
export default handler = async (req, res) => {
  // Validate request method
  if (req.method !== "GET") {
    return res.status(400).json({
      message: "Only GET method allowed",
    });
  }

  // Verify cookies
  const cookies = req.cookies;

  if (!cookies?.jwt) {
    return res.status(401).json({
      message: "Not authorized",
    });
  }

  try {
    // Connect to db
    await connectDb();

    // Get token from cookies
    const refreshToken = cookies.jwt;

    // Get target user
    const targetUser = await User.findOne({ refreshToken }).exec();

    if (!targetUser) {
      return res.status(403).json({
        message: "Unable to authenticate",
      });
    }

    // Validate token
    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      (err, decoded) => {
        if (err || targetUser.id !== decoded.id) {
          return res.status(403).json({
            message: "Unable to authenticate",
          });
        }

        // Create new access token
        const accessToken = jwt.sign(
          { id: decoded.id },
          process.env.ACCESS_TOKEN_SECRET,
          { expiresIn: "15m" }
        );

        return res.status(200).json({ accessToken });
      }
    );
  } catch (error) {
    return res.status(500).json({
      message: "Server Error",
      error,
    });
  }
};
