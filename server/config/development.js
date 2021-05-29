const dotenv = require("dotenv");
dotenv.config();

const MONGO_URI =
  process.env.MONGO_METHOD +
  process.env.MONGO_USER +
  ":" +
  process.env.MONGO_PASSWORD +
  process.env.MONGO_DB;

module.exports = {
  MONGO_URI,
};
