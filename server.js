var express = require('express');
var app = express();
var PORT = process.env.PORT || 3000;
var todos = [{
	id: 1,
	description: 'Go pick up groceries to cook',
	completed: false
},{
	id: 2,
	description: 'Finish creating database of schools',
	completed: false
},{
	id: 3,
	description: 'Finish creating database of volunteers',
	completed: true
}];

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

app.listen(PORT, function(){
	console.log('Express listening on port '+PORT+' !');
});