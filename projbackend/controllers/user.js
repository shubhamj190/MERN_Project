const user = require("../models/user");
const orders = require("../models/order");

exports.getUserById = (req, res, next, id) => {
  user.findById(id).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "unable to fetch the user from the DB",
      });
    }
    req.profile = user;
    next();
  });
};

exports.getUser = (req, res) => {
  req.profile.salt = undefined;
  req.profile.encry_password = undefined;
  req.profile.createdAt = undefined;
  req.profile.updatedAt = undefined;
  return res.json(req.profile);
};

exports.UpdateUser=(req, res)=>{
    User.findByIdAndUpdate(
        {_id:req.profile._id},
        {$set:req.body},
        {new:true, useFindAndModify:false},
        (err, user)=>{
            if(err || !user){
                return res.status(400).json({
                    error:"your are not authorized to edit this user"
                })
            }
            user.salt=undefined
            user.encry_password=undefined
            res.json(user)
        }
    )
}

exports.UserParchaseList=(req, res)=>{
  orders.find({user:req.profile._id})
  .populate("user","_id, name")
  .exec((err, order)=>{
    if(err || !order){
      return res.status(400).json({
        error:"no order for this account"
      })
    }
    return res.json(order)
  })
}

exports.pushOrdersInPurchaseList=(req, res, next)=>{

  let purchases=[]
  req.body.order.products.forEach(product => {
    purchases.push({
      _id:product._id,
      name:product.name,
      description:product.description,
      category:product.category,
      quantity:product.quantity,
      amout:req.body.order.amout,
      transaction_id:req.body.order.transaction_id
    })

  });
  // store this in db
  User.findOneAndUpdate(
    {_id:req.profile._id},
    {$push:{purchases:purchases}},
    {new:true},
    (err, purchaseList)=>{
      if(err || !purchaseList){
        return res.status(400).json({
          error:"unable to save purchase list"
        })
      }
      next()
    }
  )
  
}