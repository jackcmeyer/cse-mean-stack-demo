var express = require('express');
var router = express.Router();

var TODO = require('../models/todo');

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});

router.get('/all', function (req, res) {
    TODO.getTODOList(function (err, todo_list) {
        if (err) {
            res.send(null);
        }
        else {
            res.send(todo_list);
        }
    });
});

router.post('/add', function (req, res) {
    TODO.addTODO(req.body.description, function (err, todo) {
        if (err) {
            res.send(null);
        }
        else {
            res.send(todo);
        }
    });
});

router.post('/complete', function (req, res) {
    TODO.completeTODO(req.body.id, function (completed) {
        res.send(completed);
    })
});

module.exports = router;
