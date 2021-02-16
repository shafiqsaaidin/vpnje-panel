module.exports = app => {
    const users = require("../controllers/user.controller");

    // Create a new user
    app.post("/user", users.create);

    // Retrive all users
    app.get("/users", users.findAll);

    // Retrieve a single user with userId
    app.get("/user/:userId", users.findOne);

    // Update a user with user id
    app.put("/user/:userId", users.update);

    // Delete a user with userId
    app.delete("/user/:userId", users.delete);
}