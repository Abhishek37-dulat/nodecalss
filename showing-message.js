const http = require("http");
const HandleMessage = require("./route.js");

const server = http.createServer(HandleMessage);

server.listen(8000);
