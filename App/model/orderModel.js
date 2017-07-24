var mongoose = require('mongoose');

//Company Model
var OrderSchema = new mongoose.Schema({
    eMailClient: {
        type: String
    },
    date: { 
        type: Date, 
        default: Date.now 
    },
    pizzas: [{
    	cant: {
    		type: Number, 
    		default: 1
    	},
    	idPizza: {
    		type: String
    	}
    }],
    total: {
        type: Number,
        default: 0
    }
}, {
    collection: 'order'
});

module.exports = mongoose.model('order', OrderSchema);
