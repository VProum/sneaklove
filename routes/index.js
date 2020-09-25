const express = require("express");
const router = express.Router();
const Collection = require("../models/Collection");

console.log(`\n\n
-----------------------------
-----------------------------
     wax on / wax off !
-----------------------------
-----------------------------\n\n`
);

router.get("/", async (req, res) => {
  const collections = await Collection.find();
  res.render("index", {collections});
});




router.get("/signup", async (req, res) => {
  const collections = await Collection.find();
  res.render("signup", {collections});
});

router.get("/signin", async (req, res) => {
  const collections = await Collection.find();
  res.render("signin", {collections});
});


router.get("/prod-add", async (req, res, next) => {
  const collections = await Collection.find();
  res.redirect("/sneakers/create", {collections});
})


module.exports = router;
