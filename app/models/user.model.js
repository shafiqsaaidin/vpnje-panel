const sql = require("./db");

// constructor
const User = function(user) {
    this.user_name = user.user_name;
    this.user_pass = user.user_pass;
    this.user_start_date = user.user_start_date;
    this.user_end_date = user.user_end_date;
};

User.create = (user, result) => {
    sql.query("INSERT INTO user (user_name, user_pass) VALUES (?, AES_ENCRYPT(?, 'vpnje'))",
    [user.user_name, user.user_pass],
    (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("created user: ", { id: res.insertId, ...user});
        result(null, { id: res.insertId, ...user });
    }
    );
};

User.getAll = result => {
    sql.query(
        "SELECT user_id, user_name, HEX(AES_DECRYPT(user_pass, 'vpnje')) as user_pass, user_online, user_enable, user_start_date, user_end_date from user",
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            console.log("users: ", res);
            result(null, res);
        }
    );
};

User.findById = (userId, result) => {
    sql.query(`SELECT * FROM user WHERE user_id = ${userId}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found user: ", res[0]);
            result(null, res[0]);
            return;
        }

        // not found User with the id
        result({ kind: "not_found"}, null);
    });
};

User.updateById = (id, user, result) => {
    sql.query(
        "UPDATE user SET user_name = ?, user_pass = AES_ENCRYPT(?, 'vpnje') WHERE user_id = ?",
        [user.user_name, user.user_pass, id],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            if (res.affectedRows == 0) {
                // not found user with the id
                result({ kind: "not_found" }, null);
                return;
            }

            console.log("updated user: ", {id: id, ...user });
            result(null, { id: id, ...user });
        }
    );
};

User.remove = (id, result) => {
    sql.query("DELETE FROM user WHERE user_id = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            // not found user with the id
            result({ kind: "not_found" }, null);
            return;
        }

        console.log("deleted customer with id: ", id);
        result(null, res);
    });
};

module.exports = User;