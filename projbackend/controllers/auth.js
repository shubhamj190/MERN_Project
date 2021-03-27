const User = require("../models/user");
const { validationResult } = require("express-validator");
const user = require("../models/user");
var jwt = require('jsonwebtoken');
var expressJwt = require('express-jwt');

exports.signout = (req, res) => {
    res.clearCookie("token")
  res.json({
    message: "User signout",
  });
};

exports.signup = (req, res) => {

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({
        error:errors.array()[0].msg
    });
  }

  const user = new User(req.body);
  user.save((err, user) => {
    if (err) {
      return res.status(400).json({
        err: "not able to save the user in db",
      });
    }
    res.json({
      name: user.name,
      email: user.email,
      id: user._id,
    });
  });
};

exports.signin = (req, res)=>{
    // fetching the email and password from the headers
   const {email, password}= req.body

    // valadiating the data using express validator 
   const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({
        error:errors.array()[0].msg
    });
  }

    //finding the user using the emailid 
  User.findOne({email},(err, user)=>{
    if(err || !user){
        return res.status(400).json({
            error:"user email does nor exists"
        })
    }
    if(!user.authenticate(password)){
        return res.status(401).json({
            error:"email and password do not match"
        })
    }

    // creating token
    const token = jwt.sign({_id:user.id}, process.env.SECRET)

    // put token in cookie
    res.cookie("token",token, {expire:new Date()+9999} )

    // send respose to frontend
    const {_id, name, email, role}= user
    return res.json({
        token, user:{_id, name, email, role}
    })
  })
}

// protected routes

exports.isSignedin= expressJwt({
    secret:process.env.SECRET,
    algorithms: ['HS256'] ,
    userProperty:"auth"
})

// custom middleware

exports.isAuthenticated = (req, res, next)=>{
    let checker = req.profile && req.auth && req.profile._id == req.auth._id
    if(!checker){
        return res.status(403).json({
            error:"ACCESS DENIED"
        })
    }
    next()
}

exports.isAdmin = (req, res, next)=>{
    if(req.profile.role==0){
        return res.status(403).json({
            error:"you are not admin, ACCESS DENIED!!!"
        })
    }
    next()
}