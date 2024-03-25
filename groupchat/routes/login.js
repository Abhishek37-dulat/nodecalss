const fs = require("fs");

const express = require("express");

const route = express.Router();

route.get("/", (req, res) => {
  res.write("<html>");
  res.write("<body>");
  res.write(
    "<form action='/' method='post'><input type='text' name='username'/><button type='submit'>login</button></form>"
  );
  res.write("</body>");
  res.write("</html>");
  res.end();
});

module.exports = route;
