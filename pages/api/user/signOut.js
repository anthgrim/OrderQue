import connectDb from "../../../config/connectDb";
import User from "../../../models/userModel";
import cookie from "cookie";

/**
 * @desc   User sign out endpoint
 * @route  POST /api/user/signOut
 * @method POST
 * @access Public
 * @param {import("next").NextApiRequest} req
 * @param {import("next").NextApiResponse} res
 */

/**
 * @swagger
 * paths:
 *  /api/user/signOut:
 *    post:
 *      tags: [User]
 *      summary: Sign Out User
 *      components:
 *        securitySchemes:
 *          cookieAuth:
 *            type: token
 *            in: cookie
 *            name: token
 *      security:
 *        - cookieAuth: []
 *      responses:
 *        204:
 *          description: OK, no content
 *        400:
 *          description: Only POST method allowed
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

  // Verify cookies
  const cookies = req.cookies;
  const jwt = cookies.token;

  if (!jwt) {
    return res.status(204).end();
  }

  try {
    // Connect to db
    await connectDb();

    // Get target User
    const targetUSer = await User.findOne({ refreshToken: jwt }).exec();

    if (!targetUSer) {
      res.setHeader(
        "Set-Cookie",
        cookie.serialize("token", "", {
          httpOnly: true,
          secure: true,
          sameSite: "strict",
          maxAge: new Date(0),
          path: "/",
        })
      );
      return res.status(204).end();
    }

    // Remove user's refresh token in db
    targetUSer.refreshToken = "";
    await targetUSer.save();

    // Remove cookie in client
    res.setHeader(
      "Set-Cookie",
      cookie.serialize("token", "", {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: new Date(0),
        path: "/",
      })
    );

    return res.status(204).end();
  } catch (error) {
    return res.status(500).json({
      message: "Server Error",
      error,
    });
  }
}
