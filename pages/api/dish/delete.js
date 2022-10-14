import connectDb from "../../../config/connectDb";
import Dish from "../../../models/dishModel";
import verifyJwt from "../../../middlewares/verifyJWT";
import { DeleteObjectCommand } from "@aws-sdk/client-s3";
import { S3Client } from "@aws-sdk/client-s3";

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
 *      components:
 *        securitySchemes:
 *          cookieAuth:
 *            type: token
 *            in: cookie
 *            name: token
 *      security:
 *        - cookieAuth: []
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
    let s3Data;

    if (targetKey !== "") {
      const s3Client = new S3Client({
        region: process.env.S3_UPLOAD_REGION,
        credentials: {
          secretAccessKey: process.env.S3_UPLOAD_SECRET,
          accessKeyId: process.env.S3_UPLOAD_KEY,
        },
      });

      const bucketParams = {
        Bucket: process.env.S3_UPLOAD_BUCKET,
        Key: targetKey,
      };

      s3Data = await s3Client.send(new DeleteObjectCommand(bucketParams));
    }

    // Delete dish
    await targetDish.delete();

    return res.status(200).json({
      message: "Dish deleted successfully",
      s3Data,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server Error",
      error,
    });
  }
};

export default verifyJwt(handler, "Restaurant");
