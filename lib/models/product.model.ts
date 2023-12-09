const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductModelInfoSchema = new Schema({
  parameters: [
    {
      type: Map,
      of: String,
    },
  ],
  title: {
    type: String,
  },
  price: {
    type: String,
  },
});

const ProductSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: [
      {
        type: String,
        required: true,
      },
    ],
    price: {
      type: Number,
      required: true,
    },
    models: [
      {
        title: {
          type: String,
        },
        info: {
          type: ProductModelInfoSchema,
        },
      },
    ],
  },
  { timestamps: true }
);

export const Product = mongoose.models.Product || mongoose.model("Product", ProductSchema);
