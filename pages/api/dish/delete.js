import connectDb from "../../../config/connectDb";
import Dish from "../../../models/dishModel";
import verifyJwt from "../../../middlewares/verifyJWT";
import aws from "aws-sdk";

/**
 * @desc   Delete restaurant dish by dish id
 * @route  DELETE /api/dish/delete
 * @method DELETE
 * @access Private
 * @param {import("next").NextApiRequest} req
 * @param {import("next").NextApiResponse} res
 */

/**
 * @swagger
 * paths:
 *  /api/dish/delete:
 *    delete:
 *      tags: [Dish]
 *      summary: Delete dish by dish id
 *      requestBody:
 *       content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              dishId:
 *                type: string
 *            required:
 *              - dishId
 *      responses:
 *        200:
 *          description: Dish deleted successfully
 *        400:
 *          description: Missing restaurant id | Missing dish id | Only DELETE method allowed
 *        404:
 *          description: Dish does not exist
 *        500:
 *          description: Server Error
 *        501:
 *          description: Could not delete image in s3
 */
const handler = async (req, res) => {
  // Validate request method
  if (req.method !== "DELETE") {
    return res.status(400).json({
      message: "Only DELETE method allowed",
    });
  }

  // Validate restaurant id
  const restaurantId = req.id;

  if (!restaurantId) {
    return res.status(400).json({
      message: "Missing restaurant id",
    });
  }

  // Validate dish id
  const { dishId } = req.body;

  if (!dishId) {
    return res.status(400).json({
      message: "Missing dish id",
    });
  }

  try {
    // Connect to db
    await connectDb();

    // Get target dish
    const targetDish = await Dish.findById(dishId).exec();

    if (!targetDish) {
      return res.status(400).json({
        message: "Dish does not exist",
      });
    }

    // Delete image in s3 bucket
    const targetKey = targetDish.awsKey;

    if (targetKey !== "") {
      const s3 = new aws.S3();

      await s3.deleteObject(
        {
          Bucket: process.env.S3_UPLOAD_BUCKET,
          Key: targetKey,
        },
        (err, data) => {
          if (err) {
            return res.status(501).json({
              message: "Could not delete image in s3",
              err,
            });
          }
        }
      );
    }

    // Delete dish
    await targetDish.delete();

    return res.status(200).json({
      message: "Dish deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server Error",
      error,
    });
  }
};

export default verifyJwt(handler, "Restaurant");
