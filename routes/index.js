const express = require("express");
const router = express.Router();

console.log(`\n\n
-----------------------------
-----------------------------
     wax on / wax off !
-----------------------------
-----------------------------\n\n`
);

router.get("/", (req, res) => {
  res.render("index");
});




router.get("/signup", (req, res) => {
  res.render("signup");
});

router.get("/signin", (req, res) => {
  res.render("signin");
});


router.get("/prod-add", (req, res, next) => {
  res.redirect("/sneakers/create");
})


module.exports = router;
