const express = require('express'),
      path    = require('path'),
      logger  = require('./logger');
const app = express();

const PORT = process.env.PORT || 3000;
const PUBLIC_PATH = path.resolve(__dirname, 'public');

app.use('/public', express.static(PUBLIC_PATH));

app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
});

app.get('/api/search/:name', (req, res) => {
    request.get(`http://www.omdbapi.com/?s=${req.params.name}&type=series`, (error, response, body) => {
        if (error) {
            res.status(404);
            return;
        }
        res.json(JSON.parse(body).Search);
    });
});

app.listen(PORT, () => {
    logger.log('info', 'listening on port ', PORT);
});
