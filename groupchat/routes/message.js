const express = require("express");
const fs = require("fs");

const route = express.Router();
let usernameSet = "";
route.post("/", (req, res) => {
  const { username, message } = req.body;
  console.log(username);
  usernameSet = username !== undefined ? username : usernameSet;
  const data = {
    username: usernameSet,
    message: message !== undefined ? message : "",
  };
  // console.log(data);
  fs.appendFile("messages.txt", JSON.stringify(data), (err) => {
    console.log(err);
  });

  res.write("<html>");
  res.write("<body>");
  fs.readFile("message.txt", (err, d) => {
    if (err) {
      return res.status(500).send("Internal server error");
    }
    console.log(d);
  });
  res.write(`<p>${usernameSet}: ${message !== undefined ? message : ""}</p>`);
  res.write(
    "<form action='/' method='post'><input type='text' name='message'/><button type='submit'>send</button></form>"
  );
  res.write("</body>");
  res.write("</html>");
  res.end();
});

module.exports = route;
