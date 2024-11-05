/** @format */

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RecipeSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Please enter the recipe title"],
    },
    // description: {
    //   type: String,
    //   required: [true, "Please enter the recipe description"],
    // },
    ingredients: [
      {
        name: { type: String, required: [true, "Please enter the ingredient name"] },
        // quantity: { type: Number, required: [true, "Please enter the ingredient quantity"] },
        quantity: { type: String, required: [true, "Please enter the ingredient quantity"] },
        unit: { type: String, required: [true, "Please specify the unit for the quantity"] },
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Recipe", RecipeSchema);
