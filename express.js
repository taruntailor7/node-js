const express = require('express');

const app = express();

app.get('/', (req, res) => {
    return res.send("Hello, world!");
});

app.get('/about', (req, res) => {
    return res.send(`Hello ${req.query.name}`);
});

app.listen(8000, (req, res) => {console.log("Server is listening!")});

