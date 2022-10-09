import connectDb from "../../../config/connectDb";
import Restaurant from "../../../models/restaurantModel";
import verifyJwt from "../../../middlewares/verifyJWT";
import aws from "aws-sdk";

/**
 * @desc   Delete aws key
 * @route  POST /api/restaurant/deletePrevKey
 * @method PUT
 * @access Private
 * @param {import("next").NextApiRequest} req
 * @param {import("next").NextApiResponse} res
 */
const handler = async (req, res) => {
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
        message: "Restaurant not found",
      });
    }

    // Delete previous image in aws s3 bucket
    const targetKey = targetRestaurant.awsKey;

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
              message: "Could not delete previous image in s3",
              err,
            });
          }
        }
      );
    }

    return res.status(200).json({
      message: "OK",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};

export default verifyJwt(handler, "Restaurant");
