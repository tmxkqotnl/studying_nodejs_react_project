const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://Admin:ZNc4d7rE9VK9vxUK@mongodbtutorial.5lxlo.mongodb.net/react",{
  useNewUrlParser:true,
  useCreateIndex:true,
  useUnifiedTopology:true,
  useFindAndModify:false,
},()=>{
  console.log("DB Connected...");
});


app.set('port',process.env.PORT||5000);

app.listen(app.get('port'),()=>{
  console.log('listening on port ',app.get('port'));
});