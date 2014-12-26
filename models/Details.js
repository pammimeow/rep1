var config = require('../config.json');
var db = require('../lib/db.js');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var detailSchema = new Schema({
    name: String,
    description: String,
    image: String,
    phone: Number,
    email: String,
    address: String,
    category: String
}, {
    collection: 'Details'
});

var Details = function() {
    this.createDetail = function(name, description, image, phone, email, address, category, done) {
        
        db.insert(detailSchema, {
            name: name,
            description: description,
            image: image,
            phone: phone,
            email: email,
            address: address,
            category: category
        }, function(err, result) {
            if (err) {
                return done(err);
                
            }
            
            return done(null, result);
        });
    };
    this.getDetail = function(id, done) {
        db.fetchOne(detailSchema, {
            _id: id
        }, function(err, res) {
            if (err) {
                return done(err);
            }
            if (res === null) {
                return done(new Error('Details not found'));
            }
            return done(null, res);
        });
    };
    this.fetchAllDetail = function(done) {
        db.fetchAll(detailSchema, function(err, res) {
            if (err) {
                return done(err);
            }
            return done(null, res);
        });
    };
    this.deleteDetail = function(id, done) {
        db.remove(detailSchema, {
            _id: id
        }, function(err, res) {
            if (err) {
                return done(err);
            }
            if (res === null) {
                return done(new Error('Detail ID not found'));
            }
            return done(null, res);
        });
    };
    this.updateDetail = function(id, name, description, image, phone, email, address, category, done) {
        var updateObj = {};
        if (id) {
            updateObj._id = id;
        }
        if (name) {
            updateObj.name = name;
        }
        if (description) {
            updateObj.description = description;
        }
        if (image) {
            updateObj.image = image;
        }
        if (phone) {
            updateObj.phone = phone;
        }
        if (email) {
            updateObj.email = email;
        }
        if (address) {
            updateObj.address = address;
        }
        if (category) {
            updateObj.category = category;
        }
        if (updateObj === {}) {
            return done(new Error('No update parameters given'));
        }
        db.update(detailSchema, updateObj, function(err, n, res) {
            if (err) {
                return done(err);
            }
            if (n === 0) {
                return done(new Error('No Details found'));
            }
            return done(null, res);
        });

    };
};
module.exports = Details;