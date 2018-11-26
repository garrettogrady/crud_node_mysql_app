module.exports = {
	getHomePage: (req, res) => {

        if (!global.currentUser) {
            res.redirect('/login_user');
        } else {
            let userId = global.userSignedIn;

    		let query1 = "SELECT * FROM `events` e Join `users` u ON e.host_id = u.id WHERE e.host_id = '" + userId + "' ORDER BY event_id ASC";

    		//execute query
    		db.query(query1, (err1, result1) => {
               let query2 = "SELECT * FROM `events` e Join `invited` i ON e.event_id = i.event_id WHERE i.guest_id = '" + userId + "' ORDER BY e.event_id ASC";
                //execute query
                db.query(query2, (err2, result2) => {
                    if(err2){

                       console.log(err2);
                    }
                    res.render('index.ejs', {
                        title: "Welcome to whatslit | View events"
                        ,hostingEvent: result1
                        ,invitedEvent: result2
                        ,currentUser: global.userSignedIn
                    });
                });
            });
        }
	},
};