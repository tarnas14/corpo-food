const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mealSchema = require('./meal').mealSchema;

const orderSchema = new Schema({
    deadline: {
        type: Date,
        deafult: Date.now(),
        required: [true, 'deadline.required'],
        min: [Date.now(), 'deadline.min']
    },
    deliveryTime: {
        type: Date,
        required: [true, 'deliveryTime.required'],
        min: [Date.now(), 'deliveryTime.min']
    },
    restaurant: {
        type: String,
        maxlength: 25,
        required: [true, 'restaurant.required']
    },
    menu: {
        type: String,
        required: [true, 'menu.required']
    },
    description: {
        type: String
    },
    author: {
        type: String,
        required: [true, 'author.required']
    },
    deliveryCost: {
        type: Number,
        default: 0
    },
    extraCostPerMeal: {
        type: Number,
        default: 0
    },
    _accessCode: {
        type: String,
        required: [true, 'accessCode.required']
    },
    state: String,
    meals: [{type: Schema.Types.ObjectId, ref: mealSchema}]
});

module.exports = mongoose.model('Order', orderSchema);
