const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define the category schema

// Define the product schema
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
    image: {
      type: String,
    },
    category: Array<String>,
  },
  { timestamps: true }
);

// Create the Product model
const Product = mongoose.models.product || mongoose.model("product", productSchema);
export default Product;
