var orderDB = require('../model/orderModel.js');
var pizza = require('../model/pizzaModel.js');
var error = require('../messages.js');
var errorOrder = error.order;
var success = error.success;
var warning = error.warning;
var errorDatabase = error.database;
var Promise = require('promise');
var config = require('../config.js');
var utility = require("../utility.js");

module.exports = function(app) {

    //SHOW - Show sing up
    showOldOrder = function(req, res){
        res.render('oldOrder');
    };
    showconfirmation = function(req, res){
        res.render('ConfirmOrder');
    };

    //Get price of one product
    function getPizzas() {
        return new Promise(function(resolve, reject) {
            pizza.find(function(err, current) {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(current);
                }
            });
        });
    };

    //GET - Return all order.
    findAllOrder = function(req, res) {
        utility.getUserByToken(req, function(error, currentUser) {
            if (error) {
                res.status(errorToken.invalidToken[0]).send(errorToken.invalidToken[1]);
            } else {
                if (currentUser != undefined) {
                    orderDB.find({eMailClient: currentUser.email}, function(err, orders) {
                        if (err){
                            res.status(errorOrder.orderEmpty[0].send(errorOrder.orderEmpty[0]));
                        }
                        else {
                            console.log('GET /Orders');
                            // console.log('pizzas', orders[0]);
                            
                            var listOrder = [];
                            var listPizzas = [];

                            Promise.all([
                                getPizzas()
                            ]).then(function(dataPromised) {
                                var allPizzas = dataPromised[0];
                                for(var i in orders){
                                    for (var o in dataPromised[0]){
                                        if(orders[i].pizzas[0].idPizza == allPizzas[o]._id){
                                            listPizzas[i] = allPizzas[o];
                                            listOrder[i] = { _id: orders[i]._id,
                                                    eMailClient: orders[i].eMailClient,
                                                    total: orders[i].total,
                                                    pizzas: allPizzas[o]}
                                        }
                                    }
                                }
                                res.status(success.ok).json(listOrder);                          
                            });                            
                        }
                    });
                } else {
                    res.status(401).send("user not found");
                }

            }
        });
    };

    //Get order by id.
    findOrderByID = function(req, res) {
        console.log(req.params.id);
        orderDB.findById(req.params.id, function(err, current) {
            if (err) {
                return res.status(errorPizza.pizzaNotFound[0]).send(errorPizza.pizzaNotFound[1]);
            }
            else {
                console.log('GET /order ' + req.params.id);
                res.status(success.ok).json(current);
            }
        });
    };

    /******************************************************************************/

    //Get price of one product
    function getTotalPrice(req) {
        return new Promise(function(resolve, reject) {
            var total = 0;
            ids = []
            
            req.body.pizzas.forEach(function(element){
                ids.push(element.idPizza);
            }); 

            pizza.find({_id: { $in: ids}}, function(err, current) {
                if (err) {
                    reject(err);
                }
                else {
                    var i = 0;
                    current.forEach(function(element){
                        console.log('GET /pizza ' + element._id);
                        req.body.pizzas.forEach(function(reqElement){
                            if(reqElement.idPizza ==  element._id)
                                total += element.price * reqElement.cant;
                        }); 
                        
                    });
                    resolve(total);
                }
            });


        });
    };

    /******************************************************************************/

    //POST - Insert a new Item in Quickbook
    addOrder = function(req, res) {
        utility.getUserByToken(req, function(error, currentUser) {
            if (error) {
                res.status(errorToken.invalidToken[0]).send(errorToken.invalidToken[1]);
            } else {
                Promise.all([
                    getTotalPrice(req)
                ]).then(function(dataPromised) {
                    console.log(dataPromised[0]);

                    console.log('voy a crear el json ');
                    console.log(currentUser);
                    console.log(req.body.pizzas);
                    console.log(dataPromised[0]);
                    var dataOrder = new orderDB({
                        eMailClient: currentUser.email,
                        pizzas: req.body.pizzas,
                        total: dataPromised[0]
                    });
                    console.log('se creo el json');
                    dataOrder.save(function(err, dborder) {
                        if (err) {
                            res.status(400).json({
                                result: false
                            });
                        } else {
                            res.status(200).send({
                                result: true
                            })
                        }
                    });
                })
            }
        });
    };

/*{
    "pizzas": [
        {"cant": 1, "idPizza": "5974258fa4e00134986c6963"},
        {"cant": 3, "idPizza": "597424f87a1950246c1308a4"}
    ]
}*/    
    /******************************************************************************/

    //PUT - Update a register already exists
    updateOrder = function(req, res) {
        utility.getUserByToken(req, function(error, currentUser) {
            if (error) {
                res.status(errorToken.invalidToken[0]).send(errorToken.invalidToken[1]);
            } else {
                if (currentUser.role == roles.admin || currentUser.role == roles.superadmin || currentUser.role == roles.vendor) {
                    //console.log("====================Entrando==================");
                    orderModel.findOne({
                        "IdQB": req.body.IdQB
                    }, function(err, order) {
                        order.status = req.body.status;
                        order.save(function(err, savedOrder) {
                            if (err)
                                res.status().json(err.message);
                            else
                                res.status(200).json(savedOrder);
                        });
                    })
                } else {
                    res.status(errorUser.Unauthorized[0]).send(errorUser.Unauthorized[1]); //modificar
                }
            }
        });
    };

    /******************************************************************************/

    //DELETE - Delete a user with specified ID
    deleteOrder = function(req, res) {
        item.findByIdAndRemove(req.params.id, function(err) {
            if (err) return res.send(500, err.message);
            orderModel.findOne({
                "IdQB": req.params.id
            }, function(err, order) {
                order.status = "Cancelada";
                order.save(function(err, savedOrder) {
                    if (err)
                        res.status(500).json(err.message);
                });
            })
            res.status(200).send("Order with the id " + req.params.id + " has been Deleted");
        });
    };

    /******************************************************************************/

    orderAssing = function(req, res) {
        utility.getUserByToken(req, function(error, currentUser) {
            vehicle.findOne({
                user: currentUser.id
            }, function(err, vehicle) {
                if (!err) {
                    orders = {};
                    var index = 0;
                    vehicle.order.forEach(order => {
                        orders[order.IdQB] = index;
                        index++;
                    })
                    res.status(200).json(orders)
                }
            })
        });
    };
};
