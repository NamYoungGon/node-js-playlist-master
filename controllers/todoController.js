var bodyParser = require('body-parser');

/*
    Mongoose
    - mlap.com
*/
var mongoose = require('mongoose');

// Connect to the database
mongoose.connect('mongodb://test:1234@ds041160.mlab.com:41160/todos');

// Create a schema - this is like a blueprint
var todoSchema = new mongoose.Schema({
    item: String
});

var Todo = mongoose.model('Todo', todoSchema);

//var data = [{item: 'get milk'}, {item: 'walk dog'}, {item: 'kick some coding ass'}];
var urlencodedParser = bodyParser.urlencoded({ extended: false })

module.exports = (app) => {

    app.get('/todo', (req, res) => {
        // get data from mongodb and pass it to view
        Todo.find({}, (err, data) => {
            if (err) throw err;
            res.render('todo', {todos: data});
        });
    });

    app.post('/todo', urlencodedParser, (req, res) => {
        // get data from the view and add it to mongodb
        var newTodo = Todo(req.body).save((err, data) => {
            if (err) throw err;
            res.json(data);
        });
    });

    app.delete('/todo/:item', (req, res) => {
        // delete the requested item from mongodb
        Todo.find({item: req.params.item.replace(/\-/g, " ")}).remove((err, data) => {
            if (err) throw err;
            res.json(data);
        });
    });

};