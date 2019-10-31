var express = require("express");

var app = express();
var PORT = process.env.PORT || 8000;

var db = require("./models")

app.use(express.static("public"));

app.use(express.urlencoded({ extended: true}));
app.use(express.json());

var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs( {defaultLayout: "main"}));
app.set("view engine", "handlebars");

require("./routes/api-routes.js")(app);

db.sequelize.sync({force: false}).then(function() {
    app.listen(PORT, function() {
      console.log("App listening on PORT " + PORT);
    });
  });