import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";


const PORT = process.env.PORT || 5000;
const app = express();

dotenv.config();

app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Connection to MongoDB failed:", err));

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  dateOfBirth: Date, 
});

const User = new mongoose.model("User", userSchema);

app.post("/login", (req, res) => {
    const { email, password } = req.body;
    User.findOne({ email: email }, (err, user) => {
      if (user) {
        bcrypt.compare(password, user.password, (err, result) => {
          if (result) {
            const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, { expiresIn: "1h" });
            res.json({ message: "Login Successfull", user: user, token: token });
          } else {
            res.status(401).json({ message: "Password didn't match" });
          }
        });
      } else {
        res.status(404).json({ message: "User not registered" });
      }
    });
  });
  

  app.post("/register", (req, res) => {
    const { name, email, password, dateOfBirth } = req.body;
    bcrypt.hash(password, 10, (err, hashedPassword) => {
      if (err) {
        res.status(500).send("Error hashing password");
      } else {
        User.findOne({ email: email }, (err, user) => {
          if (user) {
            res.status(400).json({ message: "User already registered" });
          } else {
            const newUser = new User({
              name,
              email,
              password: hashedPassword,
              dateOfBirth,
            });
            newUser.save((err) => {
              if (err) {
                res.status(500).send("Error saving user");
              } else {
                res.status(201).json({ message: "Successfully Registered, Please login now." });
              }
            });
          }
        });
      }
    });
  
});

app.listen(PORT, () => console.log(`Listening on: ${PORT}`));