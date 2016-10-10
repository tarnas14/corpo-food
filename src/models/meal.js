const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const mealSchema = new Schema({
    _order: {
        type: Number,
        ref: 'Order'
    },
    name: {
        type: String,
        required: [true, 'Podaj nazwę dania!']
    },
    hungryGuy: {
        type: String,
        required: [true, 'Podaj swoje imię.']
    },
    cost: {
        type: Number,
        required: [true, 'Podaj cenę dania!']
    }
});

const schemaName = 'Meal';

exports.mealSchema = schemaName;
exports.Meal = mongoose.model(schemaName, mealSchema);
