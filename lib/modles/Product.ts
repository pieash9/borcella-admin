import { Schema, model, models } from "mongoose";

const ProductsSchema = new Schema(
  {
    title: String,
    description: String,
    media: [String],
    category: String,
    collections: [{ type: Schema.Types.ObjectId, ref: "Collection" }],
    tags: [String],
    sizes: [String],
    colors: [String],
    price: {
      type: Schema.Types.Decimal128,
      get: (v: Schema.Types.Decimal128) => parseFloat(v.toString()),
    },
    expense: {
      type: Schema.Types.Decimal128,
      get: (v: Schema.Types.Decimal128) => parseFloat(v.toString()),
    },
  },
  {
    timestamps: true,
    toJSON: { getters: true },
  }
);

const Product = models.Product || model("Product", ProductsSchema);

export default Product;
