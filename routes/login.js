const fs = require('fs');

module.exports = {
    addUserPage: (req, res) => {
        res.render('users/add-user.ejs', {
            title: "Welcome to WhatsLit | Add a new User"
            ,message: ''
        });
    },
    addUser: (req, res) => {

        let message = '';
        let first_name = req.body.first_name;
        let last_name = req.body.last_name;
        let email = req.body.email;
        let password = req.body.password;
          

                // send the player's details to the database
        let query = "INSERT INTO `users` (first_name, last_name, email, password) VALUES ('" + first_name + "', '" + last_name + "', '" + email + "', '" + password + "')";
        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.redirect('/');
        });

    },
    editUserPage: (req, res) => {
        let id = req.params.id;
        let query = "SELECT * FROM `users` WHERE id = '" + id + "' ";
        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.render('users/edit-user.ejs', {
                title: "Edit  User"
                ,user: result[0]
                ,message: ''
            });
        });
    },
    editUser: (req, res) => {
        let id = req.params.id;
        let message = '';
        let first_name = req.body.first_name;
        let last_name = req.body.last_name;
        let email = req.body.email;
        let password = req.body.password;

        let query = "UPDATE `users` SET `first_name` = '" + first_name + "', `last_name` = '" + last_name + "', `email` = '" + email + "', `password` = '" + password + "' WHERE `users`.`id` = '" + id + "'";
        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.redirect('/');
        });
    },
    deleteUser: (req, res) => {
        let id = req.params.id;
        let deleteUserQuery = 'DELETE FROM users WHERE id = "' + id + '"';

    
        db.query(deleteUserQuery, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.redirect('/');
        });
    }
};