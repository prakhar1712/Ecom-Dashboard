const mongoose = require("mongoose");
const validator = require("validator");

const ProductSchema = new mongoose.Schema({
  name: String,
  price: Number,
  brand: String,
  category: String,
});

const Product = new mongoose.model("Product", ProductSchema);
module.exports = Product;
