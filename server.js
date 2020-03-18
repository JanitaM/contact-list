// Import Libraries
const
  express = require("express"),
  cors = require("cors"), //https://expressjs.com/en/resources/middleware/cors.html
  mongoose = require("mongoose"),
  bodyParser = require("body-parser"),
  path = require("path");

require('dotenv').config();
console.log(process.env);

const { routes } = require("./src/routes/contactRoutes");

const
  app = express(),
  PORT = 3000;

const
  username = process.env.DB_USERNAME,
  password = process.env.DB_PASSWORD;

mongoose.Promise = global.Promise;
mongoose.connect(`mongodb+srv://${username}:${password}@cluster0-n7fy6.mongodb.net/test?retryWrites=true&w=majority`, { useNewUrlParser: true, useUnifiedTopology: true });

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

routes(app);

const start = () => {
  return app.listen(PORT, () => console.log(`server is running on ${PORT}`));
}

module.exports = { start }