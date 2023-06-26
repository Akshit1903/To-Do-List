//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const date = require(__dirname + "/date.js");
const path = require("path");

const app = express();

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "/public")));
app.set("views", path.join(__dirname, "/views"));
app.use(bodyParser.urlencoded({ extended: true }));

var items = ["Buy food", "Cook Food", "Eat food"];
var workItems = [];

app.get("/", function (req, res) {
  let day = date.getDay();
  res.render("list", { listTitle: day, newListItems: items });
});

app.post("/", function (req, res) {
  var item = req.body.newItem;
  if (req.body.submitButton === "Work") {
    if (item !== "") {
      workItems.push(item);
    }
    res.redirect("/work");
  } else {
    if (item !== "") {
      items.push(item);
    }
    res.redirect("/");
  }
});

app.get("/work", function (req, res) {
  res.render("list", { listTitle: "Work", newListItems: workItems });
});

app.get("/about", function (req, res) {
  res.render("about");
});

app.listen(process.env.PORT || 3000, function () {
  console.log("listening on port 3000");
});
module.exports = app;
