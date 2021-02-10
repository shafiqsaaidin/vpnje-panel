module.exports = app => {
    const users = require("../controllers/user.controller");

    // Retrieve a single user with userId
    app.get("/user/:userId", users.findOne);

    // Update a user with user id
    app.put("/user/:userId", users.update);
}