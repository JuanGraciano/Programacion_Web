var pizza = require('../model/pizzaModel.js');
var utility = require("../utility.js");
var error = require('../messages.js');
var errorToken = error.token;
var errorPizza = error.pizza;
var warning = error.warning;
var success = error.success;
var errorDatabase = error.database;

module.exports = function(app) {

	//GET - Return all pizza in the DB
	findAllPizza = function(req, res) {
		pizza.find(function(err, current) {
			if (err){
				res.status(errorPizza.pizzaEmpty[0].send(errorPizza.pizzaEmpty[0]));
			}
			else {
				console.log('GET /pizzas');
				res.status(success.ok).json(current);
			}
		});
	};

	//GET - Return a Pizza with specified title
	findPizzaByTitle = function(req, res) {
		console.log(req.params.title);
		pizza.findOne({title : req.params.title}, function(err, current) {
			if (err) {
				return res.status(errorPizza.pizzaNotFound[0]).send(errorPizza.pizzaNotFound[1]);
			}
			else {
				console.log('GET /pizza' + req.params.title);
				res.status(success.ok).json(current);
			}
		});
	};

		//GET - Return a Pizza with specified id
	findPizzaById = function(req, res) {
		console.log(req.params.id);
		pizza.findById(req.params.id, function(err, current) {
			if (err) {
				return res.status(errorPizza.pizzaNotFound[0]).send(errorPizza.pizzaNotFound[1]);
			}
			else {
				console.log('GET /pizza' + req.params.id);
				res.status(success.ok).json(current);
			}
		});
	};

	//POST - Insert a new pizza in the DB
	addPizza = function(req, res) {
		// console.log(req.body);
		pizza.findOne({title : req.body.title}, function(err, current) {
			if(err){
				res.status(warning.badRequest[0]).send(err);
			}
			if (current != null){
				res.status(errorPizza.pizzaExist[0]).send(errorPizza.pizzaExist[1]);
			}
			else {
				console.log('POST');
				var newPizzaObj = new pizza({
					url: req.body.url,
		            title: req.body.title,
		            description: {
		            	crust: req.body.description.crust,
				        sauce: req.body.description.sauce,
				        toppings: [req.body.description.toppings],
				        cheese: [req.body.description.cheese]
		            }, //not yet found
		            price: req.body.price
				});
				newPizzaObj.save(function(err, resultObj) {
					if (err){
						res.status(errorDatabase.create[0]).send(errorDatabase.create[1]);
					}
					else{
						res.status(success.created).json(resultObj);
					}
				});
			}
		});
	};


	//POST - Insert a new pizza in the DB
	addPizzaNueva1 = function(req, res) {
		// console.log(req.body);
		console.log('POST');
		var newPizzaObj = new pizza({
			url: 'static/img/v.jpg',
            title: 'Genius',
            description: {
            	crust: 'Thick',
		        sauce: 'gooey',
		        toppings: ['onion'],
		        cheese: ['Bacon']
            }, 
            price: 25
		});
		newPizzaObj.save(function(err, resultObj) {
			if (err){
				res.status(errorDatabase.create[0]).send(errorDatabase.create[1]);
			}
			else{
				res.status(success.created).json(resultObj);
			}
		});
	};

	addPizzaNueva2 = function(req, res) {
		// console.log(req.body);
		console.log('POST');
		var newPizzaObj = new pizza({
			url: 'static/img/v.jpg',
            title: 'Mormaii',
            description: {
            	crust: 'Thick',
		        sauce: 'Bechamel',
		        toppings: ['pepperoni'],
		        cheese: ['chedar']
            }, 
            price: 30
		});
		newPizzaObj.save(function(err, resultObj) {
			if (err){
				res.status(errorDatabase.create[0]).send(errorDatabase.create[1]);
			}
			else{
				res.status(success.created).json(resultObj);
			}
		});
	};

	addPizzaNueva3 = function(req, res) {
		// console.log(req.body);
		console.log('POST');
		var newPizzaObj = new pizza({
			url: 'static/img/v.jpg',
            title: 'Magistral',
            description: {
            	crust: 'Thick',
		        sauce: 'Bechamel',
		        toppings: ['pepperoni'],
		        cheese: ['chedar']
            }, 
            price: 20
		});
		newPizzaObj.save(function(err, resultObj) {
			if (err){
				res.status(errorDatabase.create[0]).send(errorDatabase.create[1]);
			}
			else{
				res.status(success.created).json(resultObj);
			}
		});
	};

	//PUT - Update a register already exists
	updatePizza = function(req, res) {
		utility.getUserByToken(req, function(error, current) {
			if(error){
				res.status(errorPizza.pizzaNotFound[0]).send(errorPizza.pizzaNotFound[1])
			}
		  // else{
		  //   // switch(current.role) {

		  //     case(roles.superadmin || roles.admin): 
		  //       console.log('PUT /pizzas/' + req.body.id);
		  //       pizza.findById(req.body.id, function(error, pizzaObj) {
		  //         if(error){
		  //           res.status(warning.notFound[0]).json(warning.notFound[1]);
		  //         }
		  //         else{
		  //           var keys = Object.keys(req.body);
		  //           keys.forEach(key => {
		  //             if(key != "id" && key != "token" && key != "pizzaname" ){
		  //               pizzaObj[key] = req.body[key];
		  //             }
		  //           });
		  //         };
		  //         pizzaObj.save(function(err, resultObj) {
		  //           if(err){
		  //             res.status(errorDatabase.update[0]).json(errorDatabase.update[1]);
		  //           }
		  //           else{
		  //             res.status(success.ok).json(resultObj);
		  //           }
		  //         });
		  //       });
		  //       break;

		  //     case(roles.vendor):
		  //       var keys = Object.keys(req.body);
		  //       keys.forEach(key => {
		  //         if(key != "id" && key != "token" && key != "pizzaname" ){
		  //           current[key] = req.body[key];
		  //         }
		  //       });
		  //       current.save(function(err, resultObj) {
		  //         if(err){
		  //           res.status(errorDatabase[0]).json({result: false});
		  //         }
		  //         else{
		  //           res.status(success.ok).json({result: true});
		  //         };
		  //       });
		  //       break;
		      
		  //     defaul:
		  //       res.status(warning.methodNotAllow[0]).send(warning.methodNotAllow[1]);
		  //       break;
		  //   }
		  // };
		});
	};

	//DELETE - Delete a pizza with specified ID
	deletePizza = function(req, res) {
		utility.getUserByToken(req, function(current, error){
			if(error){
				res.status(errorPizza.pizzaNotFound[0]).send(errorPizza.pizzaNotFound[1])
			}
			else{
			    pizza.findByIdAndRemove(req.params.title, function(err) {
			      if (err){
			        res.status(errorPizza.pizzaNotFound[0]).send(errorPizza.pizzaNotFound[1]);
			      }
			      else { 
			        res.status(success.ok).send("Pizza with the title " + req.params.title + " Deleted");
			      }
			    });
			}
		})
	};

	showpizza = function(req, res){
		res.render('pizza');
	};


};
