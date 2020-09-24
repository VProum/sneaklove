const express = require("express");
const router = new express.Router();

// const User = require("../models/User");
// const bcrypt = require("bcrypt");

// const salt = 10;

router.post("/signin", async (req, res, next) => {

    // const { email, password } = req.body;
    // const foundUser = await User.findOne({ email: email });
    // console.log(foundUser);
    // if (!foundUser) {

    //   req.flash("error", "Invalid credentials");
    //   res.redirect("/auth/signin");

    // } else {
    //   const isSamePassword = bcrypt.compareSync(password, foundUser.password);
    //   if (!isSamePassword) {

    //     req.flash("error", "Invalid credentials");
        res.redirect("/sneakers/create");

    //   } else {

    //     const userDocument = { ...foundUser };
    //     console.log(userDocument);
    //     const userObject = foundUser.toObject();
    //     delete userObject.password; 

    //     req.session.currentUser = userObject; 

    //     req.flash("success", "Successfully logged in...");
    //     res.redirect("/");
    //   }
    // }
  });
  
//   router.get("/signup", async (req, res, next) => {
//     res.render("auth/signup.hbs");
//   });
  
//   router.post("/signup", async (req, res, next) => {
//     try {
//       const newUser = req.body;
  
//       const foundUser = await User.findOne({ email: newUser.email });
  
//       if (foundUser) {
//         res.render("auth/signup.hbs", { error: "Email already taken" });
//       } else {
//         const hashedPassword = bcrypt.hashSync(newUser.password, salt);
//         newUser.password = hashedPassword;
//         const user = await User.create(newUser);
//         res.redirect("/auth/signin");
//       }
//     } catch (error) {
//       next(error);
//     }
 
//   });
  
//   router.get("/logout", async (req, res, next) => {
//     console.log(req.session.currentUser);
//     req.session.destroy(function (err) {

//       res.redirect("/auth/signin");
//     });
//   });


module.exports = router;
