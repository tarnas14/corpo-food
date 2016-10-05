const bcrypt = require('bcrypt-nodejs');
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
    password: {
        set: generateHash,
        type: String,
        required: [true, 'password.required'],
        min: [6, 'password.min']
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
    _adminId: {
        type: String,
        required: [true, 'admin id is required']
    },
    state: String,
    meals: [{type: Schema.Types.ObjectId, ref: mealSchema}]
});

function generateHash (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
}

orderSchema.methods.validPassword = password => {
    return bcrypt.compareSync(password, this.local.password);
};

module.exports = mongoose.model('Order', orderSchema);
