const express = require("express");
const bodyParser = require("body-parser");
const login = require("./routes/login.js");
const message = require("./routes/message.js");

const app = express();
const port = 8023;
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/login", login);
app.use("/", message);

app.listen(port, () => {
  console.log("listening to PORT: ", port);
});
