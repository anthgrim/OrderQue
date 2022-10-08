import verifyJwt from "../../../middlewares/verifyJWT";
import multer from "multer";
import connectDb from "../../../config/connectDb";
import Restaurant from "../../../models/restaurantModel";
import nextConnect from "next-connect";

const upload = multer({
  storage: multer.diskStorage({
    destination: "./uploads",
    filename: (req, file, cb) => cb(null, `${req.id}_${file.originalname}`),
  }),
});

// const hand = async (req, res) => {

// }

const handler = nextConnect({
  onError(error, req, res) {
    res.status(500).json({
      message: "Server Error",
      err: error.message,
    });
  },
  onNoMatch(req, res) {
    res.status(400).json({
      message: `Method ${req.method} not allowed`,
    });
  },
});

//handler.use(upload.array("logo"));

handler.post(async (req, res) => {
  await connectDb();

  const targetRestaurant = await Restaurant.findById(req.id).exec();

  if (!targetRestaurant) {
    return res.status(404).json({
      message: "Restaurant not found",
    });
  }

  const bufferImage = Buffer.from(req.files[0], "base64");

  targetRestaurant.image = {
    data: bufferImage,
  };

  await targetRestaurant.save();

  res.status(200).json({
    message: "Success",
  });
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default verifyJwt(handler, "Restaurant");
