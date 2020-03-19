// Import Libraries
const
  express = require("express"),
  cors = require("cors"), //https://expressjs.com/en/resources/middleware/cors.html
  mongoose = require("mongoose"),
  bodyParser = require("body-parser"),
  path = require("path");

require('dotenv').config();

const { routes } = require("./src/routes/contactRoutes");

const
  username = process.env.DB_USERNAME,
  password = process.env.DB_PASSWORD;

const Port = process.env.PORT || 3000;

const app = express();

mongoose.Promise = global.Promise;
mongoose.connect(`mongodb+srv://${username}:${password}@cluster0-n7fy6.mongodb.net/test?retryWrites=true&w=majority`, { useNewUrlParser: true, useUnifiedTopology: true });

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// Serve static files from here C:\Users\jvmsu\Desktop\working_contactList/src/views
app.use(express.static(__dirname + "/src/views"));

// Set home page on Heroku to index.html
app.get("/", (req, res) => res.sendFile(path.join(__dirname, "/src/views/index.html")));

routes(app);

const start = () => {
  return app.listen(Port, () => console.log(`server is running on ${Port}`));
}

module.exports = { start }