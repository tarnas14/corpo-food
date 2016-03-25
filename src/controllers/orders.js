'use strict';
const Order = require('../models/order');
const HttpStatus = require('http-status');
const OrderState = require('../enums/orderState');
const Logger = require('../logger');
const mapHourToDate = require('../dateManipulation').mapHourToDate;

exports.list = (req, res) => {
    Order.find({}, (error, orders) => {
        if (error) {
            Logger.info(error.message);
            res.sendStatus(HttpStatus.BAD_REQUEST);
            return;
        }

        const mappedOrders = orders.map((order) => {
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

exports.get = (req, res) => {
    Order.findOne({_id: req.params.id}, {}, (error, order) => {
        if (error) {
            Logger.info(error.message);
            res.sendStatus(HttpStatus.BAD_REQUEST);
            return;
        }

        const orderToSend = {
            id: order._id,
            author: order.author,
            deadline: order.deadline,
            deliveryCost: order.deliveryCost,
            deliveryTime: order.deliveryTime,
            description: order.description,
            extraCostPerMeal: order.extraCostPerMeal,
            menu: order.menu,
            restaurant: order.restaurant,
            state: order.state
        };

        res.json(orderToSend);
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

    order.save((error, createdOrder) => {
        if (error) {
            Logger.info(error.message);
            const errorsDictionary = [];

            for (let property in error.errors) {
                if (error.errors.hasOwnProperty(property)) {
                    errorsDictionary.push({property, message: error.errors[property].message});
                }
            }

            res.status(HttpStatus.BAD_REQUEST);
            res.send(errorsDictionary);
            return;
        }

        res.json({id: createdOrder._id});
    });
};
