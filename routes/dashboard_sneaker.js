const express = require("express"); // import express in this module
const { findById } = require("../models/Sneaker");
const router = new express.Router(); // create an app sub-module (router)
const Sneaker = require("../models/Sneaker");
const Tag = require("../models/Tag");
const Collection = require("../models/Collection");
const uploader = require("../config/cloudinary");


router.get("/sneakers/create", async (req, res, next) => {
  try {
    const tags = await Tag.find();
    const collections = await Collection.find();
    res.render("products_add", { tags, collections});
  } catch (error) {
    next(error);
  }
});

router.get("/tags", async (req, res, next) => {
    try {
        console.log(req.query);
      const tags = await Sneaker.find(req.query);
      res.send(tags);
    } catch (error) {
      next(error);
    }
  });

  router.get("/tags/:gender", async (req, res, next) => {
    try {
      const tags = await Sneaker.find({$and: [{"category" : req.params.gender}, req.query]});
      res.send(tags);
    } catch (error) {
      next(error);
    }
  });
  

router.get("/sneakers/collection", async (req, res, next) => {
  try {
    const tags = await Tag.find();
    const sneakers = await Sneaker.find();
    const collections = await Collection.find();

    res.render("products", { scripts: ["ajax.styles.js"], tags, sneakers, collections });
  } catch (error) {
    next(error);
  }
});

router.get("/one-product/:id", async (req, res) => {
  try {
    const collections = await Collection.find();
    const sneaker = await Sneaker.findById(req.params.id);
    res.render("one_product", { sneaker, collections });
  } catch (error) {}
});

router.get("/prod-manage", async (req, res, next) => {
  try {
    const collections = await Collection.find();
    const sneakers = await Sneaker.find();
    res.render("products_manage", { sneakers, collections });
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
    const collections = await Collection.find();
    const sneaker = await Sneaker.findById(req.params.id);
    res.render("product_edit", { sneaker, tags, collections });
  } catch (error) {
    next(error);
  }
});

router.get("/sneakers/:collection", async (req, res, next) => {
    try {
      const tags = await Tag.find();
      const collections = await Collection.find();
      const sneakers = await Sneaker.find({"category" : req.params.collection});
      res.render("products", { scripts: ["ajax.styles.gender.js"], sneakers, tags, collections });
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

router.post("/collection-add", async (req, res, next) => {
    try {
      const newCollection = req.body;
      const createdCollection = await Collection.create(newCollection);
      res.redirect("/sneakers/create");
    } catch (error) {
      next(error);
    }
  });

router.post("/prod-add", uploader.single("image"), async (req, res, next) => {
  try {
    const newSneaker = req.body;
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
