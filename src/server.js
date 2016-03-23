const express = require('express');
const path = require('path');
const logger = require('./logger');
const mongoose = require('mongoose');
const app = express();
const config = require('./config');
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 3000;
const PUBLIC_PATH = path.resolve(__dirname, 'public');

mongoose.connect(config.mongoAddress);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

require('./router')(app);

app.use('/public', express.static(PUBLIC_PATH));

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
    logger.log('info', 'listening on port ', PORT);
});
