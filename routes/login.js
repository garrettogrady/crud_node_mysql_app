const fs = require('fs');
const crypt = require('bcrypt');

module.exports = {
    addUserPage: (req, res) => {
        res.render('users/add-user.ejs', {
            title: "Welcome to WhatsLit | Add a new User"
            ,message: ''
        });
    },
    addUser: (req, res) => {
        sess = req.session;

        let message = '';
        let first_name = req.body.first_name;
        let last_name = req.body.last_name;
        let email = req.body.email;
        let password = req.body.password;
          
        crypt.hash(password, 10, function(err, hash){
            let query = "INSERT INTO `users` (first_name, last_name, email, password) VALUES ('" + first_name + "', '" + last_name + "', '" + email + "', '" + hash + "')";
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

                sess.signedInUser = result2[0].id;
                //just for safe keepings
                global.userSignedIn = sess.signedInUser;
                /*global.userSignedIn = result2[0].id;
                global.currentUser = true;*/
                res.redirect('/');
            });
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

        crypt.hash(password, 10, function(err, hash){
            let query = "UPDATE `users` SET `first_name` = '" + first_name + "', `last_name` = '" + last_name + "', `email` = '" + email + "', `password` = '" + hash + "' WHERE `users`.`id` = '" + id + "'";
            db.query(query, (err, result) => {
                if (err) {
                    return res.status(500).send(err);
                }
                res.redirect('/');
            });
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
        sess = req.session;

        let email = req.body.email;
        let password = req.body.password;

        crypt.hash(password, 10, function(err, hash){
            console.log(hash);
        });

        //let loginUserQuery = 'SELECT * FROM `users` WHERE email = "' + email + '" AND password =  "' + password + '"';
        let loginUserQuery = 'SELECT * FROM `users` WHERE email = "' + email + '"';
        console.log(loginUserQuery);
        db.query(loginUserQuery, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            console.log(result);
            console.log(result[0])
            if(typeof result[0] == 'undefined'){
                res.redirect('/login_user');
            } else {
                crypt.compare(password, result[0].password, function(err, hashres){
                    if(hashres){
                        sess.signedInUser = result[0].id;
                        res.redirect('/');
                        global.userSignedIn = sess.signedInUser;
                    } else {
                        res.redirect('/login_user');
                    }
                });
            }   
        });
    },
    logoutUser: (req, res) => {
        req.session.destroy();
        sess.destroy();
        global.userSignedIn = null
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