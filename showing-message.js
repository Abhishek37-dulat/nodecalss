const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
  const url = req.url;
  const method = req.method;
  if (url === "/") {
    const messageData = fs.readFileSync("message.txt").toString().split(",");
    console.log(messageData);
    res.write("<html>");
    res.write("<head><title>Enter Message</title></head>");
    res.write("<body>");
    for (let x of messageData) {
      res.write(`<div>${x}</div>`);
    }

    res.write(
      '<form action="/message" method="POST" ><input type="text" name="message" /><button type="submit">send</button></form>'
    );
    res.write("</body>");
    res.write("</html>");
    return res.end();
  }
  if (url === "/message" && method === "POST") {
    const body = [];
    req.on("data", (chunk) => {
      console.log(chunk);
      body.push(chunk);
    });
    return req.on("end", () => {
      const parsedBody = Buffer.concat(body).toString();
      const message = parsedBody.split("=")[1];
      fs.appendFile("message.txt", `${message},`, (err) => {
        if (err) {
          console.log(err);
          res.end("server error");
        } else {
          res.statusCode = 302;
          res.setHeader("Location", "/");
          return res.end();
        }
      });
      //   fs.writeFile("message.txt", message, (err) => {
      //     res.statusCode = 302;
      //     res.setHeader("Location", "/");
      //     return res.end();
      //   });
    });
  }
  res.setHeader("Content-Type", "text/html");
  res.write("<html>");
  res.write("<head><title>First Page</title></head>");
  res.write("<body><h1>Hello from my Node.js Server!</h1></body>");
  res.write("</html>");
  res.end();
});

server.listen(8000);
