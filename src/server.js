const express  = require('express'),
      path     = require('path'),
      logger   = require('./logger'),
      mongoose = require('mongoose');
const app = express();
const router = express.Router();

const PORT = process.env.PORT || 3000;
const PUBLIC_PATH = path.resolve(__dirname, 'public');

var apiRoutes = require('./routes/api')(router);

mongoose.connect('mongodb://localhost/corpofood');

app.use('/public', express.static(PUBLIC_PATH));
app.use('/api', apiRoutes);

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
    logger.log('info', 'listening on port ', PORT);
});
