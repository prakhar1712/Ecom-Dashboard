const express = require("express");
const mongoose = require("mongoose");
require("./db/connection.js");
const Product = require("./model/product.js");
const User = require("./model/user.js");
const app = express();
const cors = require("cors");
const e = require("express");
app.use(express.json());
app.use(cors());
mongoose.set("strictQuery", true);

// const createProductDocument = async () => {
//   try {
//     const productlist = new Product({
//       name: "watch",
//       price: 2673,
//       brand: "boat",
//       category: "watch",
//     });

//     const result = await productlist.save();
//     console.log(result);
//   } catch (err) {
//     console.log(err);
//   }
// };

// const createUserDocument = async () => {
//   try {
//     const Userlist = new User({
//       name: "prakhar",
//       email: "prakhar@gmail.com",
//       password: "prakhar17",
//     });

//     const result = await Userlist.save();
//     console.log(result);
//   } catch (err) {
//     console.log(err);
//   }
// };

// createUserDocument();
// createProductDocument();

app.post("/register", async (req, res) => {
  try {
    const new_User = new User(req.body);
    const createUser = await new_User.save();
    console.log(createUser);
    res.send(createUser);
  } catch (err) {
    res.send(err);
    console.log(err);
  }
});

app.post("/add", async (req, res) => {
  try {
    const new_product = new Product(req.body);
    const CreateProduct = await new_product.save();
    console.log(CreateProduct);
    res.send(CreateProduct);
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});

app.post("/login", async (req, res) => {
  if (req.body.password && req.body.email) {
    const login_User = await User.findOne(req.body).select("-password");
    if (login_User) {
      res.send(login_User);
    } else {
      res.send("NO USER FOUND ");
    }
  } else {
    res.send("NO USER FOUND ");
  }
});

app.get("/add", (req, res) => {
  res.send("hello to get register ");
});

app.get("/register", (req, res) => {
  res.send("hello to get register ");
});

app.get("/login", (req, res) => {
  res.send("HELLO FROM OTHERSIDE");
});

app.get("/", async (req, res) => {
  const products = await Product.find();
  if (products.length > 0) {
    res.send(products);
  } else {
    res.send("NO PRODUCT FOUND ");
  }
});

app.delete("/:id", async (req, res) => {
  let result = await Product.deleteOne({ _id: req.params.id });
  res.send(result);
});

app.get("/update/:id", async (req, res) => {
  let result = await Product.findOne({ _id: req.params.id });
  if (result) {
    res.send(result);
  } else {
    res.send("NO RECORDS ");
  }
});

app.put("/update/:id", async (req, res) => {
  let result = await Product.updateOne(
    { _id: req.params.id },
    { $set: req.body }
  );
  res.send(result);
});

app.get("/search/:key", async (req, res) => {
  let result = await Product.find({
    $or: [
      {
        name: { $regex: req.params.key, $options: "i" },
      },
      {
        category: { $regex: req.params.key, $options: "i" },
      },
      {
        brand: { $regex: req.params.key, $options: "i" },
      },
    ],
  });
  res.send(result);
});

app.listen("5000", () => {
  console.log("SERVER IS RUNNING ");
});
