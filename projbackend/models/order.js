const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema

const porductCartSchema = new mongoose.Schema({
    product:{
        type:ObjectId,
        ref:"Product",

    },
    name:String,
    count:Number,
    price:Number
})

ProductCart=mongoose.model("ProductCart", porductCartSchema)

const orderSchema =new mongoose.Schema({
  
  products:[porductCartSchema],
  transaction_id:{},
  amount:{type:Number},
  address:String,
  update:Date,
  user:{
      type:ObjectId,
      ref:"User"
  }  
},{timestamps:true})

Orders=mongoose.model("Order", orderSchema)

module.exports = {Orders, ProductCart}