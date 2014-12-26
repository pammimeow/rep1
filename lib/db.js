var mongoose = require('mongoose');

function connect(config, callbackvalue) {
    mongoose.connect(config.mongodbUrl, {
        server: {
            poolSize: config.mongoPoolSize
        }
    });
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', callbackvalue);
}

function insert(schema, json, callbackvalue) {
    var db = mongoose.connection;
    var objmodel = db.model(schema.options.collection, schema);

    objmodel.create(json, function(err, result) {
        var args = Array.prototype.slice.call(arguments);
        console.log("args "+args);
        args.shift();
        if (args.length > 1) {
            callbackvalue(err, args);
        } else {
            callbackvalue(err, args[0]);
        }
    });
}

function update(schema, json, callbackvalue) {
    var db = mongoose.connection;
    var objmodel = db.model(schema.options.collection, schema);
    id = json._id;
    delete json._id;
    objmodel.update({
        _id: id
    }, json, function(err, n, result) {
        callbackvalue(err, n, result);
    });
}

function fetchOne(schema, query, callbackvalue) {
    var db = mongoose.connection;
    var objmodel = db.model(schema.options.collection, schema);
    objmodel.findOne(query, function(err, result) {
        callbackvalue(err, result);
    });
}

function countData(schema, query, callbackvalue) {
    var db = mongoose.connection;
    var objmodel = db.model(schema.options.collection, schema);
    objmodel.count(query, function(err, result) {
        callbackvalue(err, result);
    });
}

function fetchAll(schema, query, opt, callbackvalue) {
    var db = mongoose.connection;
    var objmodel = db.model(schema.options.collection, schema);
    objmodel.find(query, {}, opt, function(err, result) {
        callbackvalue(err, result);
    });
}

function remove(schema, json, callbackvalue) {
    var db = mongoose.connection;
    var objmodel = db.model(schema.options.collection, schema);
    objmodel.remove({
        _id: json._id
    }, function(err, result) {
        callbackvalue(err, result);
    });
}


function fetchOneAndUpdate(schema, query, update, options, callbackvalue) {
    var db = mongoose.connection;
    var objmodel = db.model(schema.options.collection, schema);
    objmodel.findOneAndUpdate(query, update, options, function(err, result) {
        callbackvalue(err, result);
    });
}

module.exports.connect = connect;
module.exports.insert = insert;
module.exports.remove = remove;
module.exports.update = update;
module.exports.fetchOne = fetchOne;
module.exports.fetchAll = fetchAll;
module.exports.fetchOneAndUpdate = fetchOneAndUpdate;
module.exports.countData = countData;
module.exports.mongoose = mongoose;