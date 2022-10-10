import connectDb from "../../../config/connectDb";
import Dish from "../../../models/dishModel";
import verifyJwt from "../../../middlewares/verifyJWT";
import aws from "aws-sdk";

/**
 * @desc   Get, Update or Delete restaurant dish by dish id
 * @route  GET PUT DELETE /api/dish/:dishId
 * @method GET PUT DELETE
 * @access Private
 * @param {import("next").NextApiRequest} req
 * @param {import("next").NextApiResponse} res
 */

/**
 * @swagger
 * paths:
 *  /api/dish/:dishId:
 *    get:
 *      tags: [Dish]
 *      summary: Get dish by id
 *      responses:
 *        200:
 *          description: Ok
 *        400:
 *          description: Missing restaurant id | Missing dish id | Only GET method allowed
 *        404:
 *          description: Dish does not exist
 *        500:
 *          description: Server Error
 */
const handler = async (req, res) => {
  // Validate user id
  const restaurantId = req.id;

  if (!restaurantId) {
    return res.status(400).json({
      message: "Missing restaurant Id",
    });
  }

  // Validate dish id
  const { dishId } = req.query;

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
      return res.status(404).json({
        message: "Dish does not exist",
      });
    }

    switch (req.method) {
      case "GET":
        res.status(200).json({
          dish: targetDish,
        });
        break;

      case "PUT":
        // Validate required fields
        const { name, description, price } = req.body;

        if (!name || !description || !price) {
          return res.status(400).json({
            message: "Missing required fields",
          });
        }

        // Update dish in db
        targetDish.name = name;
        targetDish.description = description;
        targetDish.price = price;
        await targetDish.save();

        res.status(200).json({
          message: "Dish updated successfully",
        });

        break;

      case "DELETE":
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

        // Delete dish in db
        await targetDish.delete();

        res.status(200).json({
          message: "Dish deleted successfully",
        });
        break;
      default:
        res.status(400).json({
          message: "Invalid request",
        });
        break;
    }
  } catch (error) {
    return res.status(500).json({
      message: "Server Error",
      error,
    });
  }
};

export default verifyJwt(handler, "Restaurant");
