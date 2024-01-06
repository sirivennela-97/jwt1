const mongoose = require("mongoose");
const express = require("express");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());
let connectToMDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://webapp:<Siri@123>@cluster0.umld13z.mongodb.net/"
    );
    console.log("sucessfully");
  } catch (error) {
    console.log("unable to connect mdb");
  }
};
connectToMDB();

app.listen(2222, () => {
  console.log("listening to port 2222");
});

let userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  country: String,
});

let User = new mongoose.model("users", userSchema);

app.post("/sign", async (req, res) => {
  console.log(req.body);
  let newuser = new User();
  newuser.firstName = req.body.fn;
  newuser.lastName = req.body.ln;
  newuser.email = req.body.email;
  newuser.password = req.body.password;
  newuser.country = req.body.country;

  let result = await newuser.save();

  let token = await jwt.sign({ id: result._id }, "viratkohli");
  res.json({ token: token });
});

app.post("/validatethruToken", async (req, res) => {
  console.log(req.body);
  let decodedId = await jwt.verify(req.body.token, "viratkohli");
  console.log(decodedId.id);

  let userObj = await User.find({ _id: decodedId.id });
  console.log(userObj);
  res.json({ user: userObj });
});

app.get("/userslist", async (req, res) => {
  let result = await User.find();
  res.json(result);
});
