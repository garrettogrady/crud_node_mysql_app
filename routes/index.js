module.exports = {
	getHomePage: (req, res) => {
		let query = "SELECT * FROM `events` e Join `users` u ON e.host_id = u.id ORDER BY event_id ASC";

        sess = req.session;
		//execute query
		db.query(query, (err, result) => {
            if (err) {
                res.redirect('/');
            }
            if(sess.signedInUser){
                console.log(sess.signedInUser)
                res.render('index.ejs', {
                    title: "Welcome to whatslit | View events"
                    ,event: result
                    ,currentUser: sess.signedInUser
                });
            }
            else {
                res.redirect('/login_user')
            }
            
        });
	},
};