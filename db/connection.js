const mongoose = require("mongoose");
mongoose
  .connect("mongodb://localhost:27017/e-comm")
  .then(() => {
    console.log("CONNECTED THE SERVER");
  })
  .catch((err) => {
    console.log(err);
  });
