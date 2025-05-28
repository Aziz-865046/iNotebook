const mongoose = require("mongoose");
// const mongoURI = "mongodb://localhost:27017/yourDatabaseName";
const mongoURI = "mongodb://localhost:27017/myDB";

const connectToMongo = () => {
  mongoose
    .connect(mongoURI, {
      // console.log("hi");
      // console.log("Connected to MongoDB successfully");
    })
    .then(() => {
      console.log("Connected to MongoDB successfully");
    })
    .catch((err) => {
      console.error("Error connecting to MongoDB:", err);
    });
};
//   mongoose.connect(mongoURI, () => {
//     console.log("Connected to MongoDB successfully");
//   });
// };
module.exports = connectToMongo;
