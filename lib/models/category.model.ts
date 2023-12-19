const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const categorySchema = new Schema(
  {
    value: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Category =
  mongoose.models.category || mongoose.model("category", categorySchema);
export default Category;
