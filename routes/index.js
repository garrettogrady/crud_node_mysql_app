module.exports = {
	getHomePage: (req, res) => {
		let query = "SELECT * FROM `events` ORDER BY event_id ASC";

		//execute query
		db.query(query, (err, result) => {
            if (err) {
                res.redirect('/');
            }
            res.render('index.ejs', {
                title: "Welcome to whatslit | View events"
                ,event: result
            });
        });
	},
};