'use strict';

const orders = require('./controllers/orders');

module.exports = (app) => {
    app.get('/api/orders', orders.list);
    app.get('/api/orders/:id', orders.get);
    app.post('/api/orders', orders.create);
};
