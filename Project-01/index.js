const express = require("express");
const { connectMongoDb } = require("./connection");
const {logReqRes} = require("./middlewares") // it takes function by default index.js file so no need to  mention /middlewares/index.js
const userRouter = require("./routes/user");

const app = express();
const PORT = 5000;

// Connection
const url = "mongodb://127.0.0.1:27017/practice";
connectMongoDb(url);

//Middleware
app.use(express.urlencoded({ extended: true }));
app.use(logReqRes("log.txt"));

//Routes
app.use("/user", userRouter);

app.listen(PORT, () => {
  console.log(`Server started at PORT: ${PORT}`);
});
