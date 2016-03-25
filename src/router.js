'use strict';

const orders = require('./controllers/orders');

module.exports = (app) => {
    app.get('/api/orders', orders.list);
    app.post('/api/order', orders.create);
    app.get('/api/orders/:id', orders.get);
    app.post('/api/order/meal', orders.addMeal);
    app.delete('/api/order/meal', orders.removeMeal);
};
