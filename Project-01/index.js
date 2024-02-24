const express = require("express");
const fs = require('fs');
const users = require("./MOCK_DATA.json");

const app = express();
const PORT = 5000;


//Middleware
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
    fs.appendFile("log.txt", `\n${Date.now()} : ${req.method} : ${req.path}`, (err, data) => {
        next();
    });
})

app.get("/users", (req, res) => {
    const html = `
    <ul>
    ${users.map((user)=> `<li>${user.first_name}</li>`).join("")}
    </ul>
    `
    res.send(html);
});

app.get("/api/users", (req, res) => {
    return res.send(users);
});

app.post("/api/users", (req, res) => {
    const body = req.body;
    console.log(body, ' :body');
    if(!body || !body.email) {
        return res.status(400).send({msg: "email is required"});
    }
    users.push({...body, id:users.length+1});
    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
        return res.json({status: "Success", id: users.length});
    });
});

app
.route("/api/users/:id")
.get((req, res) => {
    res.setHeader("X-MyName", "Tarun Tailor");
    // Always ass X to custom headers
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id);
    return res.status(201).json(user);
})
.patch((req,res) => {
    const id = Number(req.params.id);
    const body = req.body;

    const userIndex = users.findIndex((user) => user.id === id);

    users[userIndex] = {
        ...users[userIndex], // Keep the existing properties
        ...body // Overwrite with the updated properties
    };

    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
        return res.json({status: "Updated"});
    });
})
.delete((req,res) => {
    const id = Number(req.params.id);

    const userIndex = users.findIndex((user) => user.id === id);

    const deletedUser = users.splice(userIndex, 1)[0];

    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
        return res.json({status: "Deleted", deletedUser});
    });
});

app.listen(PORT, () => {
  console.log(`Server started at PORT: ${PORT}`);
});
