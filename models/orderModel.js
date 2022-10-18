import { Schema, models, model } from "mongoose";

const orderSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    restaurantId: {
      type: Schema.Types.ObjectId,
      ref: "Restaurant",
      required: true,
    },
    restaurantName: {
      type: String,
      required: true,
    },
    number: {
      type: String,
      required: true,
      unique: true,
    },
    date: {
      type: Date,
      required: true,
    },
    total: {
      type: Number,
      required: true,
    },
    dishes: {
      type: Array,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Order = models.Order || model("Order", orderSchema);

export default Order;
