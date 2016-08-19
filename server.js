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
	var queryParams = req.query;
	var filteredTodos = todos;

	if(queryParams.hasOwnProperty('completed') && queryParams.completed === 'true'){
		filteredTodos = _.where(filteredTodos, {completed:true});
	}else if(queryParams.hasOwnProperty('completed') && queryParams.completed === 'false'){
		filteredTodos = _.where(filteredTodos, {completed:false});
	}

	console.log(filteredTodos);
	res.json(filteredTodos);
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

	}

});

app.put('/todos/:id', function(req, res){
	var body = _.pick(req.body, 'description', 'completed');
	var validAttributes = {};
	var todoId = parseInt(req.params.id, 10);
	var matchedId = _.findWhere(todos, {id: todoId});

	if(!matchedId){
		return res.status(404).send();
	}

	if(body.hasOwnProperty('completed') && _.isBoolean(body.completed)){
		validAttributes.completed = body.completed;
	}else if(body.hasOwnProperty('completed')){
		return res.status(400).send();
	}else{

	}

	if(body.hasOwnProperty('description') && _.isString(body.description) && body.description.trim().length > 0){
		validAttributes.description = body.description;
	}else if(body.hasOwnProperty('description')){
		return res.status(400).send();
	}

	
	_.extend(matchedId, validAttributes);
	res.json(matchedId);

});


app.listen(PORT, function(){
	console.log('Express listening on port '+PORT+' !');
});