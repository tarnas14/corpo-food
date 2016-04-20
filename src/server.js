const express = require('express');
const path = require('path');
const Logger = require('./logger');
const mongoose = require('mongoose');
const app = express();
const config = require('./config');
const bodyParser = require('body-parser');
const chatSocket = require('./chatSocket');

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

const server = app.listen(PORT, () => {
    Logger.info('listening on port ', PORT);
});

chatSocket.connect(server);
