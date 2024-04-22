import { Schema, model, models } from "mongoose";

const collectionSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    description: String,
    image: {
      type: String,
      required: true,
    },
    products: [{ type: Schema.Types.ObjectId, ref: "Product" }],
  },
  {
    timestamps: true,
  }
);

const Collection = models.Collection || model("Collection", collectionSchema);

export default Collection;
