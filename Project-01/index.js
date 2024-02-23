const express = require("express");
const fs = require('fs');
const users = require("./MOCK_DATA.json");

const app = express();
const PORT = 5000;


//Middleware
app.use(express.urlencoded({ extended: true }));


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
    users.push({...body, id:users.length+1});
    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
        return res.json({status: "Success", id: users.length});
    });
});

// app.get("/api/users/:id", (req, res) => {
//     const id = Number(req.params.id);
//     const user = users.find((user) => user.id === id);
//     return res.json(user);
// });

// app.patch("/api/users/:id", (req, res) => {
//     return res.json({status: "pending"});
// });

// app.delete("/api/users/:id", (req, res) => {
//     return res.json({status: "pending"});
// });


app
.route("/api/users/:id")
.get((req, res) => {
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id);
    return res.json(user);
})
.patch((req,res) => {
    return res.json({status: "pending"});
})
.delete((req,res) => {
    return res.json({status: "pending"});
});

app.listen(PORT, () => {
  console.log(`Server started at PORT: ${PORT}`);
});
