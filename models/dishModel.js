import { Schema, models, model } from "mongoose";

const dishSchema = new Schema(
  {
    restaurantId: {
      type: Schema.Types.ObjectId,
      ref: "Restaurant",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
      default: "",
    },
    awsKey: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const Dish = models.Dish || model("Dish", dishSchema);

export default Dish;
