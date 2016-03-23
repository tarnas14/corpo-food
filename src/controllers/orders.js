'use strict';
const Order = require('../models/order');
const Meal = require('../models/meal').Meal;
const HttpStatus = require('http-status');
const OrderState = require('../enums/orderState');

function mapHourToDate (hour) {
    const array = hour.split(':');
    const date = new Date();
    date.setHours(array[0]);
    date.setMinutes(array[1]);

    return date;
}

function errorsHandler (errors) {
    const errorsDictionary = [];

    for (let property in errors) {
        if (errors.hasOwnProperty(property)) {
            errorsDictionary.push({property, message: errors[property].message});
        }
    }

    return errorsDictionary;
}

exports.list = (req, res) => {
    Order.find({}, (error, orders) => {
        var mappedOrders;

        if (error) {
            res.sendStatus(HttpStatus.BAD_REQUEST);
        }

        mappedOrders = orders.map((order) => {
            return {
                id: order._id,
                deadline: order.deadline,
                hungryGuysCount: order.meals.length,
                author: order.author,
                restaurant: order.restaurant,
                state: order.state
            };
        });

        res.json(mappedOrders);
    });
};

exports.create = (req, res) => {
    const newOrder = req.body;

    const mappedOrder = {
        deadline: mapHourToDate(newOrder.deadline.hour),
        deliveryTime: mapHourToDate(newOrder.deliveryTime.hour),
        restaurant: newOrder.restaurant,
        menu: newOrder.menu,
        description: newOrder.description,
        password: newOrder.password,
        author: newOrder.author,
        deliveryCost: parseInt(newOrder.deliveryCost, 10),
        extraCostPerMeal: parseInt(newOrder.extraCostPerMeal, 10),
        state: OrderState.Open
    };

    const order = new Order(mappedOrder);

    order.save((error) => {
        if (error) {
            res.status(HttpStatus.BAD_REQUEST);
            res.send(errorsHandler(error.errors));
            return;
        }

        res.sendStatus(HttpStatus.OK);
    });
};

exports.join = (req, res) => {
    const mealInput = req.body;

    const meal = new Meal({
        cost: mealInput.cost,
        hungryGuy: mealInput.hungryGuy,
        name: mealInput.name
    });

    meal.validate((error) => {
        if (error) {
            res.status(HttpStatus.BAD_REQUEST);
            res.send(errorsHandler(error.errors));
            return;
        }

        Order.findOneAndUpdate({_id: mealInput.orderId, state: OrderState.Open}, {
            $push: {
                meals: meal
            }
        }, (error, order) => {
            if (error) {
                res.sendStatus(HttpStatus.BAD_REQUEST);
                return;
            }

            if (!order) {
                res.sendStatus(HttpStatus.NOT_FOUND);
                return;
            }

            res.json(meal);
        });
    });
};

exports.leave = (req, res) => {};