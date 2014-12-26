/*
 * This Controller deals with all functionalities releted to Details
 */

 function detailsController () {
 	var Details = require('../models/Details.js');

 	/*
 	 * Add New Details
 	 */
 	 this.addDetails = function(req, res, next) {
 	 	var name = req.body.name;
	    var description = req.body.description;
	    var phone = req.body.phone;
	    var email = req.body.email;
	    var address = req.body.address;
	    var image = req.body.image;
	    var category = req.body.category;
	    

	    var details = new Details();
	    details.createDetail(name, description, image, phone, email, address, category, function(err, result) {
	    	if (err) {
                console.log(err);
                return res.json(500, {
                    result: false,
                    httpStatus: 500
                });
            }
            console.log(result);
            return res.json(result);            
	    });
 	 };

 	 /*
 	  * Show All Details
 	  */

 	 this.showDetails = function(req, res, next) {
 	 	var details = new Details();
 	 	details.fetchAllDetail(function(err, result) {
 	 		if (err) {
                console.log(err);
                return res.json(500, {
                    result: false,
                    httpStatus: 500
                });
            }
        res.render('index',{data: result ,title: 'Express', alphabets: ['a','b','c','e','f'] });

            //return res.json(result);
 	 	});
 	 };

 	 /*
 	  * Update/Edit Details
 	  */

 	 this.updateDetails = function(req, res, next) {
 	 	var details = new Details();
 	 	var name = req.body.name;
	    var description = req.body.description;
	    var phone = req.body.phone;
	    var email = req.body.email;
	    var address = req.body.address;
	    var image = req.body.image;
	    var category = req.body.category;
	    var id = req.body.id;
	    details.updateDetail(id, name, description, image, phone, email, address, category, function(err, result) {
	    	if (err) {
                console.log(err);
                return res.json(500, {
                    result: false,
                    httpStatus: 500
                });
            }
            return res.json(result);
	    });
 	 };

 	 /*
 	  * Delete Details
 	  */

 	 this.deleteDetails = function(req, res, next) {
 	 	var details = new Details();
 	 	var id = req.body.id;
 	 	details.deleteDetail(id, function(err, result) {
 	 		if (err) {
                console.log(err);
                return res.json(500, {
                    result: false,
                    httpStatus: 500
                });
            }
            return res.json(result);
 	 	});
 	 }; 


 	return this;
 };	

module.exports = new detailsController();
