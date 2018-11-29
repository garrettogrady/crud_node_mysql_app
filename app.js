const express = require('express');
const fileUpload = require('express-fileupload');
const session = require('express-session');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const path = require('path');
const app = express();

const {getHomePage} = require('./routes/index');
const {addEventPage, addEvent, deleteEvent, editEvent, editEventPage} = require('./routes/event');
const {addUserPage, addUser, deleteUser, editUser, editUserPage, addloginPage, loginUser, logoutUser, showUserPage} = require('./routes/login');
const {addReviewPage, addReview} = require('./routes/review');


const port = 5000;

//create db connection
const db = mysql.createConnection ({
	host: 'localhost',
    user: 'root',
    password: '',
    database: 'whatslit'
},{multipleStatements: true})

//conect to database
db.connect((err) => {
	if (err) throw err;
	console.log('connected to db');
});
global.db = db;

var sess;
// configure middleware
app.set('port', process.env.port || port); // set express to use this port
app.set('views', __dirname + '/views'); // set express to look in this folder to render our view
app.set('view engine', 'ejs'); // configure template engine
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); // parse form data client
app.use(express.static(path.join(__dirname, 'public'))); // configure express to use public folder
app.use(fileUpload()); // configure fileupload

app.use(session({secret: 'Ouch, me knackers!'}));
// routes for the app

app.get('/', getHomePage);

//events
app.get('/add_event', addEventPage);
app.get('/edit_event/:id', editEventPage);
app.get('/delete_event/:id', deleteEvent);
app.post('/add_event', addEvent);
app.post('/edit_event/:id', editEvent);

//users
app.get('/add_user', addUserPage);
app.get('/edit_user/:id', editUserPage);
app.get('/delete_user/:id', deleteUser);
app.get('/login_user', addloginPage);
app.get('/logout_user', logoutUser);
app.get('/show_user/:id', showUserPage);


app.post('/add_user', addUser);
app.post('/edit_user/:id', editUser);
app.post('/login_user', loginUser);

//reviews
app.get('/add_review/:id', addReviewPage);
app.post('/add_review/:id', addReview);

// global.userSignedIn = 2;
// global.currentUser = true;




//set app to listen on port
app.listen(port, () => {
	console.log(`server running on port: ${port}`);
});