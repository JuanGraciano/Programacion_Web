var ingredient = require('../model/ingredientsModel.js');
var utility = require("../utility.js");
var error = require('../messages.js');
var errorToken = error.token;
var errorIngredient = error.ingredient;
var warning = error.warning;
var success = error.success;
var errorDatabase = error.database;

module.exports = function(app) {

	//GET - Return all ingredient in the DB
	findAllIngredient = function(req, res) {
		ingredient.find(function(err, current) {
			if (err){
				res.status(errorIngredient.pizzaEmpty[0].send(errorIngredient.pizzaEmpty[0]));
			}
			else {
				console.log('GET /ingredients');
				res.status(success.ok).json(current);
			}
		});
	};

	//GET - Return a Ingredient with specified title
	findIngredientByTitle = function(req, res) {
		console.log(req.params.title);
		ingredient.findOne({title : req.params.title}, function(err, current) {
			if (err) {
				return res.status(errorIngredient.pizzaNotFound[0]).send(errorIngredient.pizzaNotFound[1]);
			}
			else {
				console.log('GET /ingredient' + req.params.title);
				res.status(success.ok).json(current);
			}
		});
	};

	//POST - Insert a new ingredient in the DB
	addIngredient = function(req, res) {
		console.log(req.body);
		ingredient.findOne({title : req.body.title}, function(err, current) {
			if(err){
				res.status(warning.badRequest[0]).send(err);
			}
			if (current != null){
				res.status(errorIngredient.pizzaExist[0]).send(errorIngredient.pizzaExist[1]);
			}
			else {
				console.log('POST');
				var newIngredientObj = new ingredient({
					url: req.body.url,
		            title: req.body.title,
		            description: [], //not yet found
		            price: req.body.price,
		            type: 1
				});
				newIngredientObj.save(function(err, resultObj) {
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

	//PUT - Update a register already exists
	updateIngredient = function(req, res) {
		utility.getUserByToken(req, function(error, current) {
			if(error){
				res.status(errorIngredient.pizzaNotFound[0]).send(errorIngredient.pizzaNotFound[1])
			}
		  // else{
		  //   // switch(current.role) {

		  //     case(roles.superadmin || roles.admin): 
		  //       console.log('PUT /pizzas/' + req.body.id);
		  //       ingredient.findById(req.body.id, function(error, pizzaObj) {
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

	//DELETE - Delete a ingredient with specified ID
	deleteIngredient = function(req, res) {
		utility.getUserByToken(req, function(current, error){
			if(error){
				res.status(errorIngredient.pizzaNotFound[0]).send(errorIngredient.pizzaNotFound[1])
			}
			else{
			    ingredient.findByIdAndRemove(req.params.title, function(err) {
			      if (err){
			        res.status(errorIngredient.pizzaNotFound[0]).send(errorIngredient.pizzaNotFound[1]);
			      }
			      else { 
			        res.status(success.ok).send("Ingredient with the title " + req.params.title + " Deleted");
			      }
			    });
			}
		})
	};

};