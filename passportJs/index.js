import session from "express-session";
import express from "express";
import mongoose from "mongoose";
import { User } from "./model/User.js";
import MongoStore from "connect-mongo";
import "./config/passport.js";
import cors from "cors";
import passport from "passport";
import jwt from "jsonwebtoken";
const app = express();

app.use(cors());

app.use(express.json());

// app.use(
//   session({
//     secret: "keyboard cat",
//     resave: false,
//     saveUninitialized: true,
//     store: MongoStore.create({
//       mongoUrl: "mongodb://localhost:27017/PassportDB",
//       collectionName: "sessions",
//     }),
//     cookie: {
//       maxAge: 1000 * 60 * 60 * 24,
//     },
//   }),
// );

app.use(passport.initialize());
// app.use(passport.session());

(async () => {
  const mongoInstance = await mongoose.connect(
    "mongodb://localhost:27017/PassportDB",
  );

  console.log(mongoInstance.connection.host, "database connected successfully");
})();

// app.post(
//   "/login",
//   passport.authenticate("local", { successRedirect: "/protected" }),
// );

app.post(
  "/login",
  passport.authenticate("jwt", {
    session: false,
    successRedirect: "/protected",
  }),
);

app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile"] }),
);

app.get(
  "/auth/callback",
  passport.authenticate("google", {
    failureRedirect: "/login",
    successRedirect: "/protected",
  }),
);

app.post("/register", async (req, res) => {
  const { username, password } = req.body;

  const user = await User.create({ username, password });

  const token = jwt.sign(
    {
      id: user._id,
      username: username,
      password: password,
    },
    "secret",
    { expiresIn: "1d" },
  );

  return res.status(200).json({
    user,
    token,
  });
});

app.get("/protected", (req, res) => {
  return res.status(200).json({
    message: "Hii I am protected route!",
  });
});

app.listen(5000, () => {
  console.log("server started");
});
