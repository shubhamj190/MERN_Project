const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const { signout, signup, signin, isSignedin } = require("../controllers/auth");

router.get("/signout", signout);
router.post(
  "/signup",
  [
    check("name", "name should be atleat of 3 character").isLength({ min: 3 }),
    check("email", "put your email correctly").isEmail(),
    check("password", "password should of atleat of 5 char").isLength({
      min: 5,
    }),
  ],
  signup
);

router.post(
  "/signin",
  [
    check("email", "please provide your email id correctly").isEmail(),
    check("password", "please enter your password").isLength({
      min: 1,
    }),
  ],
  signin
);

router.get('/testroute',isSignedin, (req, res)=>{
res.json(req.auth)
})

module.exports = router;
