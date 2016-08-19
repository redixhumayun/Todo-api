var express = require('express');
var bodyParser = require('body-parser');
var _ = require('underscore');

var app = express();
var PORT = process.env.PORT || 3000;
var todos = [];
var todoNextId = 1;

app.use(bodyParser.json());

app.get('/', function(req, res){
	res.send('Todo API Root');
});

// GET /todos
app.get('/todos', function(req,res){
	res.json(todos);
});

//GET /todos/:id
app.get('/todos/:id', function(req, res){
	var todoId = parseInt(req.params.id, 10);
	var matchedId = _.findWhere(todos, {id: todoId});


	
	if(matchedId){
		res.json(matchedId);
	}
	else{ 
		res.status(404).send();
	}


	res.send('Asking for todo with id of '+ req.params.id);
});

app.post('/todos', function(req, res){
	//var body = req.body;

	var body = _.pick(req.body, 'description', 'completed');

	if(!_.isBoolean(body.completed) || !_.isString(body.description) || body.description.trim().length === 0){
		return res.status(400).send();
	}

	body.description = body.description.trim();

	console.log('description: '+body.description);

	body.id = todoNextId;

	res.json(body);
	todoNextId++;
	todos.push(body);
});

app.delete('/todos/:id', function(req, res){
	var todoId = parseInt(req.params.id, 10);
	var matchedId = _.findWhere(todos, {id: todoId});

	if(!matchedId){
		res.status(404).send(); 
	}
	else{
		res.json(_.without(todos, matchedId));

		todos = _.without(todos, matchedId);

		console.log('Deleted item: '+matchedId);
	}

	



});

app.listen(PORT, function(){
	console.log('Express listening on port '+PORT+' !');
});