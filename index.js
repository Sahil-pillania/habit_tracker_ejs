const express = require("express");
const mongoose = require("mongoose");
const expressLayouts = require("express-ejs-layouts");

const app = express();

//-----DB Config---------//
const db =
  "mongodb+srv://mongo:mongodb@cluster0.yopwdu5.mongodb.net/tracker?retryWrites=true&w=majority";

//------Connect to Mongo--------//
mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB successfully!"))
  .catch((err) => console.log(err));

//-----EJS---------//
app.use(expressLayouts);
app.use("/assets", express.static("./assets"));
app.set("view engine", "ejs");

//------BodyParser----------
app.use(express.urlencoded({ extended: false }));

//-----Accessing Routes--------------------------------
app.use("/", require("./routes/index"));
app.use("/users", require("./routes/users"));

const PORT = process.env.PORT || 3001;

app.listen(PORT, console.log(`Server started on port  ${PORT}`));
