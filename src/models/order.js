var bcrypt = require('bcrypt-nodejs');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var orderSchema = new Schema({
    deadline: Date,
    deliveryTime: Date,
    restaurant: String,
    menu: String,
    description: String,
    password: {
        set: generateHash,
        type: String
    },
    author: String,
    deliveryCost: Number,
    extraCostPerMeal: Number,
    state: String,
    meals: [{
        name: String,
        hungryGuy: String,
        cost: Number
    }]
});

function generateHash (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

orderSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

module.exports = mongoose.model('Order', orderSchema);
