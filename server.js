const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const app = express();
const PORT = process.env.PORT || 8000;
const mongoose = require("mongoose");

//middleware
app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

//static files
app.use(express.static("public"));
app.use("/css", express.static(__dirname + "public/css"));
app.use("/js", express.static(__dirname + "public/js"));
app.use("/image", express.static(__dirname + "public/image"));

//set views
app.set("views", "./views");
app.set("view engine", "ejs");

//routing
app.use(require("./routes/register"));
app.use(require("./routes/login"));
app.use(require("./routes/zodiac"));
app.use(require("./routes/profile"));
app.use(require("./routes/todo"));
app.use(require("./routes/newTodo"));
app.use(require("./routes/admin"));

runServer();

async function runServer() {
  await mongoose
    .connect(
      "mongodb+srv://kitsunereyna:hailhydra8@cluster0.yxwd5.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    )
    .then(() => {
      app.listen(PORT, () => {
        console.log("Running on port 8000");
      });
    });
}
