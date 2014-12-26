module.exports = function(app) {

	var db = require('./lib/db.js');
	var detail = require('./controller/detailsController.js');

	app.get('/', function(req, res, next) {
		//return res.send("Welcome to my First App");
		res.render('index', { title: 'Express', alphabets: ['a','b','c','e','f'] });
	});

	app.post('/addDetail',detail.addDetails);
	app.get('/showDetail',detail.showDetails);
	app.post('/updateDetail',detail.updateDetails);
	app.post('/deleteDetail',detail.deleteDetails);
	app.get('/addnew', function(req, res) { 
    res.render("addnew", {message:""});
	});
	app.get('/', function(req, res, next) {
 	 //return res.send("Welcome to my First App");
  	res.render('index', { title: 'Express', alphabets: ['a','b','c','e','f'] });
    });

};