const fs = require('fs');

module.exports = {
    addEventPage: (req, res) => {
        res.render('events/add-event.ejs', {
            title: "Welcome to WhatsLit | Add a new event"
            ,message: ''
        });
    },
    addEvent: (req, res) => {
        if (!req.files) {
            return res.status(400).send("No files were uploaded.");
        }

        let message = '';
        let name = req.body.event_name;
        let address = req.body.event_address;
        let level = req.body.event_level;
        let date = req.body.event_date;
        let time = req.body.event_time;
        let host_id = req.session.signedInUser;
        let invite_emails = req.body.event_invite;
        let uploadedFile = req.files.image;
        let image_name = uploadedFile.name;
        let fileExtension = uploadedFile.mimetype.split('/')[1];
        image_name = name + '.' + fileExtension;
          
        // check the filetype before uploading it
        if (uploadedFile.mimetype === 'image/png' || uploadedFile.mimetype === 'image/jpeg' || uploadedFile.mimetype === 'image/gif') {
            // upload the file to the /public/assets/img directory
            uploadedFile.mv(`public/assets/img/${image_name}`, (err ) => {
                if (err) {
                    return res.status(500).send(err);
                }
                // send the player's details to the database
                let query = "INSERT INTO `events` (event_name, event_address, event_date, event_time, event_level, image, host_id) VALUES ('" +
                    name + "', '" + address + "', '" + date + "', '" + time + "', '" + level + "', '" + image_name + "', '" + host_id + "')";
                db.query(query, (err, result) => {
                    if (err) {
                        return res.status(500).send(err);
                    }
                    
                });
                let query2 = "SELECT LAST_INSERT_ID();";
                db.query(query2, (err, result) => {
                    if (err) {
                        console.log(err);
                        return res.status(500).send(err);
                    }
                    var resultArray = Object.values(JSON.parse(JSON.stringify(result[0])))
                    console.log(resultArray);
                    var event_id = resultArray[0];
                    console.log(event_id);
                    var invite_email_ary = invite_emails.split(" ");
                    var arrayLength = invite_email_ary.length;
                    for (var i = 0; i < arrayLength; i++) {
                        let invite_email = invite_email_ary[i];
                        let query3 = "SELECT * FROM `users` WHERE email = '" + invite_email + "' ";
                        db.query(query3, (err, result2) => {
                        
                            if (err) {
                                console.log(err);
                                return;
                            } 

                            if (result2[0] == null) {
                                console.log(err);
                                return;
                            }

                            let query4 = "INSERT INTO `invited` (event_id, guest_id) VALUES ('" +
                                event_id + "', '" + result2[0].id + "')";
                            db.query(query4, (err, result3) => {
                                if (err) {
                                    console.log(err);
                                    return res.status(500).send(err);
                                }
                            });
                        });

                } 

                });

                res.redirect('/');  
        
            });
        } else {
            message = "Invalid File format. Only 'gif', 'jpeg' and 'png' images are allowed.";
            res.render('events/add-event.ejs', {
                message,
                title: "Enjoy the event | Add a new event"
            });
        }

    },
    editEventPage: (req, res) => {
        let eventId = req.params.id;
        let query = "SELECT * FROM `events` WHERE event_id = '" + eventId + "' ";
        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.render('events/edit-event.ejs', {
                title: "Edit  event"
                ,event: result[0]
                ,message: ''
            });
        });
    },
    editEvent: (req, res) => {
        let eventId = req.params.id;
        let name = req.body.event_name;
        let address = req.body.event_address;
        let level = req.body.event_level;
        let date = req.body.event_date;
        let time = req.body.event_time;

        let query = "UPDATE `events` SET `event_name` = '" + name + "', `event_address` = '" + address + "', `event_date` = '" + date + "', `event_time` = '" + time + "', `event_level` = '" + level + "' WHERE `events`.`event_id` = '" + eventId + "'";
        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.redirect('/');
        });
    },
    deleteEvent: (req, res) => {
        let eventId = req.params.id;
        let getImageQuery = 'SELECT image from `events` WHERE event_id = "' + eventId + '"';
        let deleteEventQuery = 'DELETE FROM events WHERE event_id = "' + eventId + '"';
        console.log(eventId);
        db.query(getImageQuery, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }

            let image = result[0].image;

            fs.unlink(`public/assets/img/${image}`, (err) => {
                if (err) {
                    return res.status(500).send(err);
                }
                db.query(deleteEventQuery, (err, result) => {
                    if (err) {
                        return res.status(500).send(err);
                    }
                    res.redirect('/');
                });
            });
        });
    }
};
