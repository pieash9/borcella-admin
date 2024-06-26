import { Schema, model, models } from "mongoose";

const orderSchema = new Schema(
  {
    customerClerkId: String,
    products: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: "Product",
        },
        color: String,
        size: String,
        quantity: Number,
      },
    ],
    shippingAddress: {
      street: String,
      city: String,
      state: String,
      postCode: String,
      country: String,
    },
    shippingRate: String,
    totalAmount: Number,
  },
  { timestamps: true }
);

const Order = models.Order || model("Order", orderSchema);

export default Order;
