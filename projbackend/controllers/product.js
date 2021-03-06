const Product = require("../models/product");
const formidable = require("formidable");
const _ = require("lodash");
const fs = require("fs");
const category = require("../models/category");


exports.getProductById = (req, res, next, id) => {
  Product.findById(id)
    // .populate("category")
    .exec((err, product) => {
      if (err) {
        return res.status(400).json({
          error: "Product not found"
        });
      }
      req.product = product;
      next();
    });
};

exports.createProduct = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;

  form.parse(req, (err, fields, file) => {
    if (err) {
      return res.status(400).json({
        error: "problem with image"
      });
    }
    //destructure the fields
    const { name, description, price, stock, sold } = fields;

    if (!name || !description || !price  || !stock || !sold) {
      return res.status(400).json({
        error: "Please include all fields"
      });
    }

    let product = new Product(fields);

    //handle file here
    if (file.photo) {
      if (file.photo.size > 3000000) {
        return res.status(400).json({
          error: "File size too big!"
        });
      }
      product.photo.data = fs.readFileSync(file.photo.path);
      product.photo.contentType = file.photo.type;
    }
    console.log(product);

    //save to the DB
    product.save((err, product) => {
        console.log("inside save db")
      if (err) {
        res.status(400).json({
          error: "Saving product in DB failed"
        });
        console.log("outside the if block")

      }
      res.json(product) 
    });
  });
};
