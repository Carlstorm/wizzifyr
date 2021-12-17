import express from "express";
import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const secret = process.env.MONGODB_SECRET;

const userRoutes = express.Router();

userRoutes.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500);
    res.json({error: "Users could not be found", details: error.toString()});
  }
});

// RYD OP
userRoutes.post("/register", async (req, res) => {
  try {
    const username = req.body.username;
    const password = req.body.password;
    const userExists = await User.exists({username:username});
    if (userExists) {
      res.status(409);
      res.json({ error: "Username allready taken" });
    } else {

      async function genUserWithHash() {
        const userlocal = req.body;
        const hashedPassword = await new Promise((resolve, reject) => {
          bcrypt.hash(userlocal.password, 10, function (err, hash) {
            if (err) reject(err);
            else resolve(hash);
          });
        });
        userlocal.hash = hashedPassword;
        delete userlocal.password;

        return userlocal
      }

      if (!username || !password) {
        let error = "Username or password missing!";
        res.status(401).json({ error: error });
      } else {
        const user = await User.create(await genUserWithHash());
        res.status(201);
        res.json(user);
      }
    }

  } catch (error) {
    res.status(500);
    res.json({ error: "Error on registration", details: error.toString() });
  }
});


userRoutes.post("/authenticate", async (req, res) => {
  try {
    const username = req.body.username;
    const password = req.body.password;

    if (!username || !password) {
      let error = "Username or password missing!";
      res.status(401).json({ error: error });
      return;
    }
    const user = await User.findOne({username:username});
    if (user) {
      if (bcrypt.compareSync(password, user.hash)) {
        const payload = { username: username };
        const token = jwt.sign(payload, secret, {
          algorithm: "HS512",
          expiresIn: "1h",
        });

        res.json({
          msg: `User '${username}' authenticated successfully`,
          token: token,
          user: user
        });
      } else {
        res.status(401).json({ error: "Wrong Password" });
      }
    } else {
      res.status(404).json({ error: "User not found!" });
    }
  } catch (error) {
    res.status(500);
    res.json({ error: "Error on Authenthication", details: error.toString() });
  }
});

export default userRoutes;
