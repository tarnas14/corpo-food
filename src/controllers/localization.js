'use strict';
const getBestMatchingLocale = require('../localizationContent').getBestMatchingLocale;

exports.getLocale = (req, res) => {
    res.json(getBestMatchingLocale(req));
};
