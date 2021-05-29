const proxy = require('http-proxy-middleware');

module.exports = app=>{
  app.use(
    '/api',
    proxy({
      target:'https://localhost:5000',
      charngeOrigin:true,
    })
  );
};