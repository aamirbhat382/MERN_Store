const mongoose = require("mongoose");
const crypto = require("crypto");
const uuid = require("uuid");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxlength: 32,
    trim: true,
  },
  lastname: {
    type: String,
    required: true,
    maxlength: 32,
    trim: true,
  },
  userinfo: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  encry_password: {
    type: String,
    required: true,
  },
  salt: String,

  role: {
    type: Number,
    default: 0,
  },
  purchases: {
    type: Array,
    default: [],
  },
});

userSchema
  .virtual("password")
  .set(function (password) {
    this._password = password;
    this.salt = uuid();
    this.encry_password = this.securePassword(password);
  })
  .get(function () {
    return this._password;
  });

userSchema.methods = {
  autheticate: function (planpassword) {
    return this.securePassword(planpassword) === this.encry_password;
  },
  securePassword: function (planpassword) {
    if (!planpassword) return "";
    try {
      return crypto
        .createHmac("sha256", this.salt)
        .update(planpassword)
        .digest("hex");
    } catch (error) {
      return "";
    }
  },
};

module.exports = mongoose.model("User", userSchema);
