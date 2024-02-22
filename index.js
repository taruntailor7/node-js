const http = require("http");
const fs = require("fs");
const url = require("url");

const server = http.createServer((req, res) => {
  if (req.url === "/favicon.ico") return res.end();
  const log = `${Date.now()}: ${req.url} New Req Received\n`;

  const myUrl = url.parse(req.url, true);
  console.log("My URL: " + myUrl);

  fs.appendFile("log.txt", log, (error, data) => {
    switch (myUrl.pathname) {
      case "/":
        res.end("HomePage");
        break;
      case "/about":
        const username = myUrl.query.myname;
        res.end(`Hi ${username}`);
        break;
        case "/search":
        const search = myUrl.query.search_query;
        res.end("Here are your rsults for search: ", search);
        break;
        default:
        res.end("404 Not Found");
    }
  });
});

server.listen(5000, () => {
  console.log("Server listening on port 5000");
});
