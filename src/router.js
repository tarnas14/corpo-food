'use strict';
const orders = require('./controllers/orders');
const localization = require('./controllers/localization');

module.exports = (app) => {
    app.get('/api/orders', orders.list);
    app.get('/api/orders/:id', orders.get);
    app.post('/api/orders', orders.create);
    app.get('/api/currentLocale', localization.getLocale);
};
