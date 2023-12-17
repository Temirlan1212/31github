const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productModelInfoSchema = new Schema({
  name: {
    type: String,
    required: true,
    minlength: 1,
  },
  value: {
    type: String,
    required: true,
    minlength: 1,
  },
  description: {
    type: String,
    minlength: 0,
    maxlength: 50,
  },
});

const productModelSchema = new Schema(
  {
    price: {
      currency: {
        type: String,
        required: true,
      },
      value: {
        type: String,
        required: true,
      },
    },
    title: {
      type: String,
      required: true,
    },
    productId: {
      type: String,
      required: true,
    },
    parameteres: [productModelInfoSchema], // Define info as an array of productModelInfoSchema
  },
  { timestamps: true }
);

const ProductModel = mongoose.models.productModel || mongoose.model("productModel", productModelSchema);
export default ProductModel;
