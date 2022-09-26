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
      type: Buffer,
      contentType: String,
    },
  },
  {
    timestamps: true,
  }
);

const Dish = models.Dish || model("Dish", dishSchema);

export default Dish;
