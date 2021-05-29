const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
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

// custome 메서드를 정의한다.

// 데이터베이스 저장 전에 실행되는 미들웨어
userSchema.pre("save", function (next) {
  const user = this;
  // 새로 생긴 데이터이거나 패스워드를 수정할 경우
  if (user.isModified("password") || user.isNew) {
    bcrypt.genSalt(saltRound, (err, salt) => { // saltRound를 기반으로 소금(?)을 만든다.
      if (err) return next(err);
      bcrypt.hash(this.password, salt, (err, hash) => { // 비밀번호를 암호화 한다.
        if (err) return next(err);
        user.password = hash;
        next();
      });
    });
  }else{
    next();
  }
});

// 암호화된 비밀번호와 요청된 비밀번호를 비교
userSchema.methods.comparePassword = function(plain,cb){
  bcrypt.compare(plain, this.password,(err,isMatch)=>{
    if(err) return cb(err);
    cb(null,isMatch);
  });
}

// 토큰 생성
userSchema.methods.generateToken = function(cb){
  const user = this;

  // objectid는 인스턴스다.
  // 문자열로 변환해줘야 한다.
  const token = jwt.sign(user._id.toHexString(), process.env.JWT_SECRET);
  user.token = token;
  user.save().then(doc=>{
    cb(null,doc);
  }
  ).catch(err=>{
    console.log(err);
    cb(err);
  });
}

// 토큰으로 유저 찾기
// 모델 메소드 생성시에는 statics!
userSchema.statics.findByToken = function(tk,cb){
  const user = this;

  // 복호화
  jwt.verify(tk,process.env.JWT_SECRET,(err,decoded)=>{
    if(err) cb(err);

    user.findOne({_id:decoded, token:tk})
    .then(doc=>cb(null,doc))
    .catch(err=>{
      return cb(err);
    });
  });
}

const User = mongoose.model("User", userSchema); // 모델로 감싸준다.
module.exports = { User }; // 외부에서 사용하도록 export
