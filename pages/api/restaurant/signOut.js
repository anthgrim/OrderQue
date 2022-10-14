import connectDb from "../../../config/connectDb";
import Restaurant from "../../../models/restaurantModel";
import cookie from "cookie";

/**
 * @desc   Restaurant sign out endpoint
 * @route  POST /api/restaurant/signOut
 * @method POST
 * @access Public
 * @param {import("next").NextApiRequest} req
 * @param {import("next").NextApiResponse} res
 */

/**
 * @swagger
 * paths:
 *  /api/restaurant/signOut:
 *    post:
 *      tags: [Restaurant]
 *      summary: Sign Out Restaurant
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

  if (!cookie?.jwt) {
    return res.status(204).end();
  }

  try {
    // Connect to db
    await connectDb();

    // Get target User
    const targetRestaurant = await Restaurant.findOne({
      refreshToken: cookies.jwt,
    }).exec();

    if (!targetRestaurant) {
      res.setHeader(
        "Set-Cookie",
        cookie.serialize("jwt", "", {
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
    targetRestaurant.refreshToken = "";
    await targetRestaurant.save();

    // Remove cookie in client
    res.setHeader(
      "Set-Cookie",
      cookie.serialize("jwt", "", {
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
