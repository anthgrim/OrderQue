import connectDb from "../../../config/connectDb";
import Restaurant from "../../../models/restaurantModel";
import verifyJwt from "../../../middlewares/verifyJWT";
import { DeleteObjectCommand } from "@aws-sdk/client-s3";
import { S3Client } from "@aws-sdk/client-s3";

/**
 * @desc   Delete aws key
 * @route  DELETE /api/restaurant/deletePrevKey
 * @method DELETE
 * @access Private
 * @param {import("next").NextApiRequest} req
 * @param {import("next").NextApiResponse} res
 */

/**
 * @swagger
 * paths:
 *  /api/restaurant/deletePrevKey:
 *    delete:
 *      tags: [Restaurant]
 *      summary: Deletes current aws key for image
 *      components:
 *        securitySchemes:
 *          cookieAuth:
 *            type: token
 *            in: cookie
 *            name: token
 *      security:
 *        - cookieAuth: []
 *      responses:
 *        200:
 *          description: OK
 *        400:
 *          description: Only DELETE method allowed || Missing restaurant id
 *        404:
 *          description: Restaurant does not exist
 *        500:
 *          description: Server Error
 *        501:
 *          description: Could not delete previous image in s3
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

  try {
    // Connect to db
    await connectDb();

    // Get restaurant
    const targetRestaurant = await Restaurant.findById(restaurantId).exec();

    if (!targetRestaurant) {
      return res.status(404).json({
        message: "Restaurant does not exist",
      });
    }

    // Delete previous image in aws s3 bucket
    const targetKey = targetRestaurant.awsKey;
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

    return res.status(200).json({
      message: "OK",
      s3Data,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};

export default verifyJwt(handler, "Restaurant");
