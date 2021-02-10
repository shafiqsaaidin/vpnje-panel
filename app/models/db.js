const mysql = require("mysql");
const dbConfig = require("../config/db.config");

// Create a connection to the database
const conn = mysql.createConnection({
    host: dbConfig.HOST,
    user: dbConfig.USER,
    password: dbConfig.PASSWORD,
    database: dbConfig.DB
});

// Open the mysql connection
conn.connect(error => {
    if (error) throw error;
    console.log("Successfully connected to database.")
});

module.exports = conn;