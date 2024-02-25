const User = require("../model/user");

async function handleGetAllUsers(req, res) {
  const allDbUsers = await User.find({});
  return res.json(allDbUsers);
}

async function handleGetUserById(req, res) {
  const user = await User.findById(req.params.id);
  // Always ass X to custom headers
  res.setHeader("X-MyName", "Tarun Tailor");

  return res.status(201).json(user);
}

async function handleUpdateUserById(req, res) {
    const body = req.body;
    console.log("body: ", body); 
    await User.findByIdAndUpdate(req.params.id, {firstName: body.first_name, lastName: body.last_name});
    return res.json({status: "Updated"});
}

async function handleDeleteUserById(req, res) {
    await User.findByIdAndDelete(req.params.id);
    return res.json({status: "Deleted"});
}

async function handleCreateNewUser(req, res) {
    const body = req.body;
    console.log(body, ' :body');
    if(!body || !body.email) {
        return res.status(400).send({msg: "email is required"});
    }
    const result = await User.create({
        firstName: body.first_name,
        lastName: body.last_name,
        email: body.email,
        gender: body.gender,
        jobTitle: body.job_title
    })
    console.log("Result: ", result); 
    return res.status(201).json({msg: "Success", id: result._id});
}

module.exports = {
  handleGetAllUsers,
  handleGetUserById,
  handleUpdateUserById,
  handleDeleteUserById,
  handleCreateNewUser
};
