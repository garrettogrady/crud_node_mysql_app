module.exports = {
	getHomePage: (req, res) => {             
        var async = require('async');
        
        let today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth()+1;
        var yyyy = today.getFullYear();
        if(dd<10) dd='0'+dd;
        if(mm<10) mm='0'+mm;
        
        today = mm+'/'+dd+'/'+yyyy;

        sess = req.session;
        current_user_id = sess.signedInUser;

        if(!sess.signedInUser){
            res.redirect('/login_user');
        }
		//execute queries
        async.parallel([
            
            function(callback){
                let future_events_query = "SELECT * FROM `events` e Join `users` u ON e.host_id = u.id Join `invited` i ON i.event_id = e.event_id WHERE e.event_date >= '" + today + "' AND i.guest_id = " + current_user_id;
                db.query(future_events_query, function(err, futureEvents){
                    if(err){
                        return callback(err);
                    }
                    return callback(null, futureEvents);
                });
            },
            function(callback){
                let past_events_query = "SELECT * FROM `events` e Join `users` u ON e.host_id = u.id Join `invited` i ON i.event_id = e.event_id WHERE e.event_date < '" + today + "' AND i.guest_id = " + current_user_id;
                
                db.query(past_events_query, function(err, pastEvents){
                    if(err){
                        return callback(err);
                    }
                    return callback(null, pastEvents);
                });
            },
            function(callback){
                let user_events_query = "SELECT * FROM `events` e Join `users` u ON e.host_id = u.id WHERE e.host_id = " + current_user_id;
                
                db.query(user_events_query, function(err, userEvents){
                    if(err){
                        return callback(err);
                    }
                    return callback(null, userEvents);
                });
            }
            
        ], function(error, callbackResults){
            if(error){
                console.log("error in index page");
                console.log(error);
            } else {
                console.log(callbackResults[0]); //upcoming events
                console.log(callbackResults[1]); //past events
               if(sess.signedInUser){
                  res.render('index.ejs', {
                      title: "Welcome to whatslit | View events",
                      event: callbackResults,
                      currentUser: sess.signedInUser
                  });
               }
            }
        });
        
    }
};