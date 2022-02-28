const Product = require("../models/product");
const formidable = require("formidable");
const _ = require("lodash");
const fs = require("fs");

exports.getProductById = (req, res, next, id) => {
  Product.findById(id)
    .populate("category")
    .exec((err, product) => {
      if (err) {
        return res.status(400).json({
          error: "Product not found",
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
        error: "problem with image",
      });
    }

    //TODO: restrictions on field
    let product = new Product(fields);

    //handle file here
    if (file.photo) {
      if (file.photo.size > 3000000) {
        return res.status(400).json({
          error: "File size too big!",
        });
      }
      product.photo.data = fs.readFileSync(file.photo.path);
      product.photo.contentType = file.photo.type;
    }

    //save to the DB
    product.save((err, product) => {
      if (err) {
        res.status(400).json({
          error: "Saving tshirt in DB failed",
        });
      }
      res.json(product);
    });
  });
};

exports.getProduct = (req, res) => {
  req.product.photo = undefined;
  return res.json(req.product);
};

exports.photo = (req, res, next) => {
  if (req.product.photo.data) {
    res.set("Content-Type", req.product.photo.contentType);
    return res, send(req.product.photo.data);
  }
};

exports.removeProduct = (req, res) => {
  let product = re.product;
  product.remove((err, deleted) => {
    if (err) {
      return res.status(400).json({
        error: "Failed to Delete",
      });
    }
    res.json({ message: "Delete successfully" });
  });
};

exports.updateProduct = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;

  form.parse(req, (err, fields, file) => {
    if (err) {
      return res.status(400).json({
        error: "problem with image",
      });
    }

    let product = req.product;
    product = _.extend(product, fields);
    //handle file here
    if (file.photo) {
      if (file.photo.size > 3000000) {
        return res.status(400).json({
          error: "File size too big!",
        });
      }
      product.photo.data = fs.readFileSync(file.photo.path);
      product.photo.contentType = file.photo.type;
    }

    //save to the DB
    product.save((err, product) => {
      if (err) {
        res.status(400).json({
          error: "Updation tshirt in DB failed",
        });
      }
      res.json(product);
    });
  });
};

exports.getAllProducts = (req, res) => {
  let limit = req.query.limit ? parseInt(req.query.limit) : 8;
  let sortBy = req.query.sortBy ? req.query.sortBy : "_id";
  Product.find()
    .select("-photo")
    .populate("category")
    .sort([[sortBy, "asc"]])
    .limit(limit)
    .exec((err, products) => {
      if (err) {
        return res.status(400).json({ error: "No Products Found" });
      }
      res.json(products);
    });
};
exports.getAllCategorys = (req, res) => {
  product.distinct("category", {}, (err, categorys) => {
    if (err) {
      return res.status(400).json({ error: "No Category Found" });
    }
    res.json(categorys);
  });
};

exports.updateStock = (req, res, next) => {
  let myOprtations = req.body.order.products.map((prod) => {
    return;
    updateOne(
      { filter: { _id: prod._id } },
      { update: { $inc: { stock: -prod.count, sold: +prod.count } } }
    );
  });

  product.bulkWrite(myOprtations, {}, (err, products) => {
    if (err) {
      return res.status(400).json({ error: "Bulk Operation Failed" });
    }
  });
};

exports.getProducts = async (req, res) => {
  // console.log(req.body)
  let documents;
  try {
    documents = await Product.find({
      _id: { $in: req.body.ids },
    }).select("-updatedAt -__v");
  } catch (err) {
    return res.status(400).json({ err: "Something went wrong" });
  }
  // console.log(documents)
  return res.json(documents);
  
};
