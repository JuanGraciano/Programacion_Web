var mongoose = require('mongoose');

//Company Model
var PizzaSchema = new mongoose.Schema({
    url: { 
        type: String,
        default: "static/img/v.jpg" 
    },
    title: { 
        type: String 
    },
    description: {
        crust: { 
            type: String 
        },
        sauce: {
            type: String
        },
        toppings: [
            {type: String}
        ],
        cheese: [
            {type: String}
        ]
    },
    price: { 
        type: Number 
    },
    status: {
    	type: String,
    	default: ""
    }
}, {
    collection: 'pizza'
});

module.exports = mongoose.model('pizza', PizzaSchema);
