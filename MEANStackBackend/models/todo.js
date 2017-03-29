var mongoose = require('mongoose');
var db = mongoose.connection;

var TODOSchema = new mongoose.Schema({
    description : {
        type : String,
        index : true
    },
    completed : {
        type : Boolean
    }
});

var TODO = module.exports = mongoose.model('todo', TODOSchema);

module.exports.getTODOList = function (callback) {
    TODO.find({}, function (err, todo_list) {
        if (err) {
            console.log('Couldn\'t fetch TODO list');
            callback(true);
        }
        else {
            callback(false, todo_list);
        }
    })
};

module.exports.addTODO = function (description, callback) {
    var newTODO = new TODO({
        description : description,
        completed : false
    });

    newTODO.save(callback);
};

module.exports.completeTODO = function (todo_id, callback) {
    TODO.update({'_id': todo_id}, {completed: true}, function (err) {
        if (err) {
            callback(false);
        }
        else {
            callback(true);
        }
    });
};