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
export default handler = async (req, res) => {
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
    const targetUSer = await User.findOne({ refreshToken: cookies.jwt }).exec();

    if (!targetUSer) {
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
    targetUSer.refreshToken = "";
    await targetUSer.save();

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
};