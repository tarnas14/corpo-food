'use strict';
exports.mapHourToDate = hour => {
    const array = hour.split(':');
    const date = new Date();
    date.setHours(array[0]);
    date.setMinutes(array[1]);

    return date;
};
