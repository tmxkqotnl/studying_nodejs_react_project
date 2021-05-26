const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const {auth} = require('./routes/middleware');
const {User} = require('./models/User');
const {MONGO_URI} = require('./config/Key');

dotenv.config();

mongoose.connect(MONGO_URI,{
  useNewUrlParser:true,
  useCreateIndex:true,
  useUnifiedTopology:true,
  useFindAndModify:false,
},(err)=>{
  if(!err){
    console.log("DB Connected...");
  }else{
    console.error(err);
  }
});

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cookieParser());
app.use(process.env.NODE_ENV === "production" ? morgan('combined'):morgan('dev'));

app.set('port',process.env.PORT||5000);

// 인덱스 페이지 라우터
app.get('/',(req,res)=>{
  res.send('hello');
});

// 회원가입 라우터
app.post('/api/user/register',(req,res)=>{
  // 회원가입 정보를 DB에 저장한다.
  const newUser = new User(
    req.body
  );
  newUser.save((err,result)=>{
    if(err) return res.json({success:false, err});
    return res.status(200).json({
      success:true
    });
  });
});
// 로그인 라우터
app.post('/api/user/login',(req,res)=>{
  // 데이터베이스에 이메일이 존재하는지 확인한다.
  User.findOne({email:req.body.email})
  .then(doc=>{
    // 이메일이 존재한다면 비밀번호를 확인한다.
    if(doc){
      doc.comparePassword(req.body.password,(err,isMatch)=>{
        // 일치한다면 토큰을 생성한다.
        if(isMatch){
          // JWT
          doc.generateToken((err,doc)=>{ 
            if(err) return res.status(400).send(err);
            // 쿠키에 토큰을 저장한다.
            // 다른 곳에도 가능..
            res.cookie("auth", doc.token)
            .status(200)
            .json({
              loginSuccess:true,
              userId:doc._id,
            });
          });
        }else{
          res.json({
            loginSuccess:false,
            message:"이메일이나 비밀번호를 확인해주세요."
          });
        }
      });
    }else{
      res.json({
        loginSuccess:false,
        message:"이메일이나 비밀번호를 확인해주세요."
      })
    }
  }).catch(err=>{
    console.error(err);
  })
});

// 인증 라우터
app.get('/api/user/auth',auth,(req,res)=>{
  res.status(200).json({
    _id:req.user._id,
    isAdmin:req.user.role === 1 ? false : true,
    isAuth:true,
    email:req.user.email,
    name:req.user.name,
    lastname:req.user.lastname,
    role:req.user.role,
    image:req.user.image,
  });
});
// 로그아웃 라우터
app.get('/api/user/logout',auth,(req,res)=>{
  User.findOneAndUpdate({_id:req.user._id}, {token:""})
  .then(doc=>{
    return res.status(200).json({
      success:true,
    })
  })
  .catch(err=>{
    return res.json({
      success:false,
      err,
    })
  }) 
});

app.listen(app.get('port'),()=>{
  console.log('listening on port ',app.get('port'));
});