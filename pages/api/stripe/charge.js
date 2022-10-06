import verifyJwt from "../../../middlewares/verifyJWT";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

/**
 * @desc   Record stripe order
 * @route  POST /api/stripe/charge
 * @method POST
 * @access Private
 * @param {import("next").NextApiRequest} req
 * @param {import("next").NextApiResponse} res
 */

/**
 * @swagger
 * paths:
 *  /api/stripe/charge:
 *    post:
 *      tags: [Stripe]
 *      summary: Creates charge in Stripe
 *      requestBody:
 *       content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              user:
 *                type: string
 *              amount:
 *                type: integer
 *            required:
 *              - user
 *              - amount
 *      responses:
 *        200:
 *          description: Payment Success
 *        400:
 *          description: Missing required fields | Only POST method allowed
 *        500:
 *          description: Server Error
 */
const handler = async (req, res) => {
  // Validate request method
  if (req.method !== "POST") {
    return res.status(400).json({
      message: "Only POST method allowed",
    });
  }

  // Validate required fields
  const { user, amount } = req.body;

  if (!user || !amount) {
    return res.status(400).json({
      message: "Missing required fields",
    });
  }

  try {
    // Create charge
    const charge = await stripe.charges.create({
      amount: Math.floor(amount * 100),
      currency: "usd",
      source: "tok_amex",
      description: `Order ${new Date()} by ${user}`,
    });

    return res.status(200).json({
      message: "Payment Success",
      charge,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server Error",
      error,
    });
  }
};

export default verifyJwt(handler, "User");
