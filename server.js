const express = require("express");
const bodyParser = require("body-parser");


const app = express();

// parse request of content-type: application/json
app.use(bodyParser.json());

// parse request of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
    res.json({ message: "Welcome to VPNJE application." });
});

require("./app/routes/user.routes")(app);

// set port, listen for requests 
app.listen(3000, ()=> {
    console.log("Server is running on port 3000.");
});
