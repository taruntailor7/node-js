const express = require("express");
const fs = require('fs');
// const users = require("./MOCK_DATA.json");
const mongoose = require("mongoose");

const app = express();
const PORT = 5000;


// Connection 
mongoose
.connect("mongodb://127.0.0.1:27017/practice")
.then(() => console.log("MongoDB Connected"))
.catch((err) => console.log("Mongo Error: ", err));

// Schema
const userSchema = new mongoose.Schema({
    firstName : {
        type : String,
        required : true
    },
    lastName : {
        type : String
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    jobTitle : {
        type : String
    },
    gender : {
        type : String
    }
}, {timestamps: true});

// Model
const User = new mongoose.model("user", userSchema);

//Middleware
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
    fs.appendFile("log.txt", `\n${Date.now()} : ${req.method} : ${req.path}`, (err, data) => {
        next();
    });
})

app.get("/users", async (req, res) => {
    const allDbUsers = await User.find({});
    const html = `
    <ul>
        ${allDbUsers.map((user)=> `<li>${user.firstName} = ${user.email}</li>`).join("")}
    </ul>
    `
    res.send(html);
});

app.get("/api/users", async (req, res) => {
    const allDbUsers = await User.find({});
    return res.json(allDbUsers);
});

app.post("/api/users", async (req, res) => {
    const body = req.body;
    console.log(body, ' :body');
    if(!body || !body.email) {
        return res.status(400).send({msg: "email is required"});
    }
    // users.push({...body, id:users.length+1});
    // fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
    //     return res.json({status: "Success", id: users.length});
    // });
    const result = await User.create({
        firstName: body.first_name,
        lastName: body.last_name,
        email: body.email,
        gender: body.gender,
        jobTitle: body.job_title
    })
    console.log("Result: ", result); 
    return res.status(201).json({msg: "Success"});
});

app
.route("/api/users/:id")
.get(async (req, res) => {
    const user = await User.findById(req.params.id);
    res.setHeader("X-MyName", "Tarun Tailor");
    // Always ass X to custom headers
    return res.status(201).json(user);
})
.patch(async (req,res) => {
    // const id = Number(req.params.id);
    const body = req.body;
    console.log("body: ", body); 
    // const userIndex = users.findIndex((user) => user.id === id);

    // users[userIndex] = {
    //     ...users[userIndex], // Keep the existing properties
    //     ...body // Overwrite with the updated properties
    // };

    await User.findByIdAndUpdate(req.params.id, {firstName: body.first_name, lastName: body.last_name});
    return res.json({status: "Updated"});
    // fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
    //     return res.json({status: "Updated"});
    // });
})
.delete(async (req,res) => {
    // const userIndex = users.findIndex((user) => user.id === id);

    // const deletedUser = users.splice(userIndex, 1)[0];

    // fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
    //     return res.json({status: "Deleted", deletedUser});
    // });
    await User.findByIdAndDelete(req.params.id);
    return res.json({status: "Deleted"});
});

app.listen(PORT, () => {
  console.log(`Server started at PORT: ${PORT}`);
});
