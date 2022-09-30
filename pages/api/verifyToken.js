import jwt from "jsonwebtoken";

/**
 * @desc   Verify JWT
 * @route  GET /api/verifyToken
 * @access Public
 * @param {import("next").NextApiRequest} req: body {token}
 * @param {import("next").NextApiResponse} res
 */
export default async function handler(req, res) {
  // Validate request method
  if (req.method !== "GET") {
    return res.status(400).json({
      message: "Only GET method allowed",
    });
  }
  // Validate required fields
  const { token } = req.body;

  if (!token) {
    return res.status(200).json({
      isValid: false,
    });
  }

  const isVerified = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

  if (isVerified) {
    return res.status(200).json({
      isValid: true,
    });
  } else {
    return res.status(200).json({
      isValid,
    });
  }
}
