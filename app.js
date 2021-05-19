const express = require('express');
const app = express();
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const morgan = require('morgan');
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

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(process.env.NODE_ENV === "production" ? morgan('combined'):morgan('dev'));

app.set('port',process.env.PORT||5000);

app.get('/',(req,res)=>{
  res.send('hello');
});

app.post('/register',(req,res)=>{
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

app.listen(app.get('port'),()=>{
  console.log('listening on port ',app.get('port'));
});