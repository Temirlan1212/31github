const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const categorySchema = new Schema({
  type: String,
  required: true,
});

const productSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: [categorySchema],
    price: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

export const Product = mongoose.models.product || mongoose.model("product", productSchema);
