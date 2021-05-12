const mongoose = require('mongoose');
// 몽구스 스키마
const Schema = mongoose.Schema({
  name:{
    type: String,
    maxlength:50,
  },
  email:{
    type:String,
    trim:true, // 공백 제거
    maxlength:60,
    unique:true,
  },
  lastname:{
    type: String,
    maxlength:50,
  },
  role:{
    type:Number,
    default:0,
  },
  image: String,
  token:{
    type:String,
  },
  tokenExp:{
    type:Number,
  }
})

const User = mongoose.model('User',Schema); // 모델로 감싸준다.
module.exports = {Schema}; // 외부에서 사용하도록 export