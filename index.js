const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
    const log = `${Date.now()}: ${req.url} New Req Received\n`;
    fs.appendFile("log.txt", log, (error, data) => {
        switch(req.url) {
            case "/": res.end("HomePage"); break;
            case "/about": res.end("About Page"); break;
            default: res.end("404 Not Found");
        }
    });
})

server.listen(5000, () => {
    console.log("Server listening on port 5000");
});