'use strict';

const orders = require('./controllers/orders');

module.exports = (app) => {
    app.get('/api/orders', orders.list);
    app.post('/api/order', orders.create);
};
