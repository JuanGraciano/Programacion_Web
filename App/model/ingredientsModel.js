var mongoose = require('mongoose');

//Company Model
var IngredientSchema = new mongoose.Schema({
	crust: [],
    sauce: [],
    toppings: [],
    cheese: []
}, {
    collection: 'ingredients'
});

module.exports = mongoose.model('ingredients', IngredientSchema);
