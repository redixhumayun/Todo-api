var express = require('express');
var bodyParser = require('body-parser');

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
	var matchedId;
	//iterate over todos array looking for a match
	todos.forEach(function(todo){
		if(todoId === todo.id){
			matchedId = todo;
		}
	});
	if(matchedId){
		res.json(matchedId);
	}
	else{
		res.status(404).send();
	}

	//to send 404
	//res.status(404.send());

	res.send('Asking for todo with id of '+ req.params.id);
});

app.post('/todos', function(req, res){
	var body = req.body;

	console.log('description: '+body.description);

	res.json(body);

	body.id = todoNextId;
	todoNextId++;
	todos.push(body);
});

app.listen(PORT, function(){
	console.log('Express listening on port '+PORT+' !');
});