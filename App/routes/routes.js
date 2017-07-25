module.exports = function(app) {
    require('../controllers/userController.js')(app);
    require('../controllers/pizzaController.js')(app);
    require('../controllers/orderController.js')(app);
    require('../controllers/authenticationController.js')(app);
    var express = require('express');
    var apiRoutes = express.Router();

    //Loggin route
    app.post('/authenticate', authenticate);

    //Secure api routes with token authentication
    apiRoutes.use(tokenProove);
    app.use('/api', apiRoutes);

    // //User routes
    apiRoutes.get('/users', findAllUsers);
    apiRoutes.get('/current', getCurrentUser);
    apiRoutes.get('/users/:id', findUserByEmail);
    apiRoutes.post('/newUser', addUser);
    apiRoutes.put('/users', updateUser);
    apiRoutes.delete('/users/:id', deleteUser);


    //User routes
    app.get('/users', findAllUsers);
    app.get('/current', getCurrentUser);
    app.get('/users/:email', findUserByEmail);
    app.post('/newUser', addUser);
    app.put('/users', updateUser);
    app.delete('/users/:id', deleteUser);
    app.get('/login', showSingIn);
    app.get('/signUp', showSingUp);

    //Pizza routes
    app.get('/pizzas', findAllPizza);
    app.get('/pizzaT/:title', findPizzaByTitle);
    app.get('/pizzaI/:id', findPizzaById);
    //app.post('/pizza/:id', getCurrentPizza);
    app.post('/pizza', addPizza);
    app.put('/pizza', updatePizza);
    app.delete('/pizza', deletePizza);
    app.get('/PIZZANUEVADB1', addPizzaNueva1);
    app.post('/PIZZANUEVADB2', addPizzaNueva2);
    app.post('/PIZZANUEVADB3', addPizzaNueva3);

    //Order routes
    app.get('/order', findAllOrder);
    app.get('/order/:id', findOrderByID);
    //app.post('/order/:id', getCurrentOrder);
    app.post('/order', addOrder);
    app.put('/order', updateOrder);
    app.delete('/order', deleteOrder);
    app.get('/orders', showOldOrder);
    app.post('/confirmation', showconfirmation);
};
