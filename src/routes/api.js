var Order = require('../models/order');

module.exports = function apiRoutes (router) {
    router.get('/orders', (req, res) => {
        Order.find({}, (err, orders) => {
            var mappedOrders;

            if (err) {
                throw err;
            }

            mappedOrders = orders.map((order) => {
                return {
                    deliveryTime: order.deliveryTime,
                    hungryGuysCount: order.meals.length,
                    orderer: order.author,
                    restaurant: order.restaurant,
                    state: order.state
                }
            });

            res.json(mappedOrders);
        });
    });

    return router;
};
