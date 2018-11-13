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
          

        let query = "INSERT INTO `users` (first_name, last_name, email, password) VALUES ('" + first_name + "', '" + last_name + "', '" + email + "', '" + password + "')";
        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
        });

        let getIdQuery = "SELECT id FROM `users` WHERE email = '" + email + "' ";
        db.query(getIdQuery, (err2, result2) => {
            if (err2) {
                return res.status(500).send(err2);
            }

            global.userSignedIn = result2[0].id;
            global.currentUser = true;
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
        console.log(id);
        let deleteUserQuery = 'DELETE FROM users WHERE id = "' + id + '"';

    
        db.query(deleteUserQuery, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.redirect('/');
        });
    },
    addloginPage: (req, res) => {
        res.render('users/login-user.ejs', {
            title: "Welcome to WhatsLit | Login"
            ,message: ''
        });
    },
    loginUser: (req, res) => {
        let email = req.body.email;
        let password = req.body.password;
        let loginUserQuery = 'SELECT * FROM `users` WHERE email = "' + email + '" AND password =  "' + password + '"';
        console.log(loginUserQuery);
        db.query(loginUserQuery, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            console.log(result);
            res.redirect('/');
            global.userSignedIn = result[0].id;
            global.currentUser = true;
            console.log(global.userSignedIn);
           
        });
    },
    logoutUser: (req, res) => {
        global.userSignedIn = null
        global.currentUser = false;
        res.redirect('/');
    },
    showUserPage: (req, res) => {
        let id = req.params.id;
        let query = 'SELECT * FROM `users` WHERE id = "' + id + '"';
        //execute query
        console.log(query);
        db.query(query, (err, result) => {
            if (err) {
                res.redirect('/');
            }
            console.log(result);
            res.render('users/show-user.ejs', {
                title: "Welcome to whatslit | View events"
                ,user: result[0]
            });
        });
    },
};