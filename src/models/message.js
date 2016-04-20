const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const messageSchema = new Schema({
    orderId: {
        type: String,
        required: [true, 'Order id is required']
    },
    user: {
        type: String,
        required: [true, 'Author is required']
    },
    message: {
        type: String,
        required: [true, 'Message is required']
    }
});

module.exports = mongoose.model('Message', messageSchema);
