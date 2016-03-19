var Order = require('../models/order');
var HttpStatus = require('http-status');

module.exports = function apiRoutes (router) {
    router.get('/orders', (req, res) => {
        Order.find({}, (err, orders) => {
            var mappedOrders;

            if (err) {
                res.sendStatus(HttpStatus.BAD_REQUEST);
            }

            mappedOrders = orders.map((order) => {
                return {
                    deliveryTime: order.deliveryTime,
                    hungryGuysCount: order.meals.length,
                    orderer: order.author,
                    restaurant: order.restaurant,
                    state: order.state
                };
            });

            res.json(mappedOrders);
        });
    });

    router.post('/order', (req, res) => {
        var order = new Order(req.body);

        order.save((err) => {
            if (err) {
                const errorsDictionary = [];

                for (let property in err.errors) {
                    if (err.errrs.hasOwnProperty(property)) {
                        errorsDictionary.push({property, message: err.errors[property].message});
                    }
                }

                res.status(HttpStatus.BAD_REQUEST);
                res.send(errorsDictionary);
                return;
            }

            res.sendStatus(HttpStatus.OK);
        });
    });
};
