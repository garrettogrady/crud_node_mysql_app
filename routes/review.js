const fs = require('fs');

module.exports = {
    addReviewPage: (req, res) => {
        res.render('reviews/add-review.ejs', {
            title: "Welcome to WhatsLit | Add a new event"
            ,message: ''
        });
    },
    addReview: (req, res) => {
       
        let current_user_id = global.userSignedIn;

        if (!current_user_id) {
            res.redirect('/login_user');
        }

        let stars = parseInt(req.body.review_stars);
        let comment = req.body.review_comment;
        let eventId = req.params.id;

        let query4 = "INSERT INTO `reviews` (event, reviewee_id, rating, comment) VALUES ('" +
            eventId + "', '" + current_user_id + "', '" + stars + "', '" + comment + "')";
        db.query(query4, (err, result3) => {
            if (err) {
                console.log(err);
                return res.status(500).send(err);
            }
        });
                       

        res.redirect('/');  
        
    }
};
