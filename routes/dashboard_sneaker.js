const express = require("express"); // import express in this module
const { findById } = require("../models/Sneaker");
const router = new express.Router(); // create an app sub-module (router)
const Sneaker = require("../models/Sneaker");
const Tag = require("../models/Tag");
const uploader = require("../config/cloudinary");


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
    res.render("one_product", { sneaker });
  } catch (error) {}
});

router.get("/prod-manage", async (req, res, next) => {
  try {
    const sneakers = await Sneaker.find();
    res.render("products_manage", { sneakers });
  } catch (error) {
    next(error);
  }
});

router.get("/product-delete/:id", async (req, res, next) => {
  try {
    const sneaker = await Sneaker.findByIdAndDelete(req.params.id);
    res.redirect("/prod-manage");
  } catch (error) {
    next(error);
  }
});

router.get("/product-edit/:id", async (req, res, next) => {
  try {
    const tags = await Tag.find();
    const sneaker = await Sneaker.findById(req.params.id);
    res.render("product_edit", { sneaker, tags });
  } catch (error) {
    next(error);
  }
});

router.get("/sneakers/men", async (req, res, next) => {
    try {
      const tags = await Tag.find();
      const sneakers = await Sneaker.find({"category" : "men"});
      res.render("products", { sneakers, tags });
    } catch (error) {
      next(error);
    }
  });

  router.get("/sneakers/women", async (req, res, next) => {
    try {
      const tags = await Tag.find();
      const sneakers = await Sneaker.find({"category" : "women"});
      res.render("products", { sneakers, tags });
    } catch (error) {
      next(error);
    }
  });

  router.get("/sneakers/kids", async (req, res, next) => {
    try {
      const tags = await Tag.find();
      const sneakers = await Sneaker.find({"category" : "kids"});
      res.render("products", { sneakers, tags });
    } catch (error) {
      next(error);
    }
  });

router.post("/tag-add", async (req, res, next) => {
  try {
    const newTag = req.body;
    const createdTag = await Tag.create(newTag);
    res.redirect("/sneakers/create");
  } catch (error) {
    next(error);
  }
});

router.post("/prod-add", uploader.single("image"), async (req, res, next) => {
  try {
    const newSneaker = req.body;
    console.log(req.body);
    console.log(req.file);
    if (req.file) {
        newSneaker.image = req.file.path;
      }
    const createdSneaker = await Sneaker.create(newSneaker);
    res.redirect("/sneakers/collection");
  } catch (error) {
    next(error);
  }
});

router.post("/prod-edit/:id", async (req, res, next) => {
  try {
    const editSneaker = req.body;
    const editedSneaker = await Sneaker.findByIdAndUpdate(
      req.params.id,
      editSneaker
    );
    res.redirect("/sneakers/collection");
  } catch (error) {
    next(error);
  }
});

module.exports = router;
