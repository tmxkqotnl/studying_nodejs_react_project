const { User } = require("../models/User");

// 인증 처리 미들웨어
module.exports.auth = (req,res,next)=>{
  // 클라이언트 쿠키의 토큰을 가져와서 복호화한다.
  const token = req.cookies.auth;
  // 토큰을 가진 유저 확인
  User.findByToken(token,(err,doc)=>{
    if(err) throw err;
    if(!doc){
      return res.json({
        isAuth:false,
        error:true,
      });
    }else{
      req.token = token;
      req.user = doc;
      next();
    }
  });
}