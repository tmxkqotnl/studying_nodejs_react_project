const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltRound = 15;

// 몽구스 스키마
const userSchema = mongoose.Schema({
  name: {
    type: String,
    maxlength: 50,
    require: true,
  },
  email: {
    type: String,
    trim: true, // 공백 제거
    maxlength: 60,
    unique: true,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  lastname: {
    type: String,
    maxlength: 50,
  },
  role: {
    type: Number,
    default: 0,
  },
  image: String,
  token: {
    type: String,
  },
  tokenExp: {
    type: Number,
  },
});

userSchema.pre("save", function (next) {
  const user = this;
  if (user.isModified("password") || user.isNew) {
    bcrypt.genSalt(saltRound, (err, salt) => {
      if (err) return next(err);
      bcrypt.hash(this.password, salt, (err, hash) => {
        if (err) return next(err);
        user.password = hash;
        next();
      });
    });
  }
});

const User = mongoose.model("User", userSchema); // 모델로 감싸준다.
module.exports = { User }; // 외부에서 사용하도록 export
