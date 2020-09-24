const express = require("express"); // import express in this module
const router = new express.Router(); // create an app sub-module (router)
const Sneaker = require("../models/Sneaker");
const Tag = require("../models/Tag");

router.get("/sneakers/create", async (req, res, next) => {
  try {
    const tags = await Tag.find();
    res.render("products_add", { scripts: ["create.js"], tags });
  } catch (error) {
    next(error);
  }
});

router.get("/sneakers/collection", async (req, res, next) => {
  try {
    const tags = await Tag.find();
    const sneakers = await Sneaker.find();

    res.render("products", { tags, sneakers });
  } catch (error) {
    next(error);
  }
});

router.get("/one-product/:id", async (req, res) => {
  try {
    const sneaker = await Sneaker.findById(req.params.id);
    res.render("one_product", {sneaker});
  } catch (error) {}
});

router.get("/prod-manage", async (req, res, next) => {
    try {
        const sneakers = await Sneaker.find();
        res.render("products_manage", {sneakers});
    } catch (error) {
        next(error)
    }
  })

router.post("/tag-add", async (req, res, next) => {
  try {
    const newTag = req.body;
    const createdTag = await Tag.create(newTag);
    res.redirect("/sneakers/create");
  } catch (error) {
    next(error);
  }
});

router.post("/prod-add", async (req, res, next) => {
  try {
    const newSneaker = req.body;
    const createdSneaker = await Sneaker.create(newSneaker);
    res.redirect("/sneakers/collection");
  } catch (error) {
    next(error);
  }
});

module.exports = router;
