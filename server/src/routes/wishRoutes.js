import express from "express";
import Wish from "../models/wishModel.js";

const wishRoutes = express.Router();

wishRoutes.get("/", async (req, res) => {
  const wishes = await Wish.find();
  res.json(wishes);
});

wishRoutes.get("/:id", async (req, res) => {
  const wishes = await Wish.findById(req.params.id); 
  res.json(wishes);
});

wishRoutes.post("/makewish", async (req, res) => {
  try {
    let wishobj = {...req.body.wish};
    wishobj.liked = false;
    const makeWish = await Wish.create(wishobj);
    res.json(makeWish);
    res.status(201);
  } catch (error) {
    res.status(500);
    res.json({ error: "Weird Error on makewish", details: error.toString() });
  }
});

wishRoutes.post("/editwish", async (req, res) => {
  try {
    const makeWish = await Wish.findOneAndUpdate({_id:req.body.id}, req.body.wish);
    res.json(makeWish);
    res.status(201);
  } catch (error) {
    res.status(500);
    res.json({ error: "Weird Error on makewish", details: error.toString() });
  }
});

wishRoutes.post("/makecomment", async (req, res) => {
  try {
    const makecomment = await Wish.findOneAndUpdate({_id:req.body.id}, {$push: {comments: req.body.comment}});
    res.json(makecomment);
    res.status(201);
  } catch (error) {
    res.status(500);
    res.json({ error: "Weird Error on makecomment", details: error.toString() });
  }
});

wishRoutes.post("/like/:id", async (req, res) => {
  try {
    const currentwish = await Wish.findOne({_id:req.params.id});
    const updatedwish = await Wish.findOneAndUpdate({_id:req.params.id}, {liked: !currentwish.liked});
    res.json(updatedwish);
    res.status(201);
  } catch (error) {
    res.status(500);
    res.json({ error: "Weird Error on makecomment", details: error.toString() });
  }
});

wishRoutes.post("/received/:id", async (req, res) => {
  try {
    const currentwish = await Wish.findOne({_id:req.params.id});
    const updatedwish = await Wish.findOneAndUpdate({_id:req.params.id}, {received: !currentwish.received});
    res.json(updatedwish);
    res.status(201);
  } catch (error) {
    res.status(500);
    res.json({ error: "Weird Error on makecomment", details: error.toString() });
  }
});

wishRoutes.post("/delete/:id", async (req, res) => {
  try {
    const currentwish = await Wish.findOneAndDelete({_id:req.params.id});
    res.json(currentwish);
    res.status(201);
  } catch (error) {
    res.status(500);
    res.json({ error: "Weird Error on makecomment", details: error.toString() });
  }
});

wishRoutes.post("/initwishes", async (req, res) => {
  try {
    const makeWish = await Wish.create(...req.body);
    res.json(makeWish);
    res.status(201);
  } catch (error) {
    res.status(500);
    res.json({ error: "Weird Error on makewish", details: error.toString() });
  }
});

export default wishRoutes;