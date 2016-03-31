const socketIo = require('socket.io');
const Logger = require('./logger');
const {ChatMessage} = require('./enums/chatMessageTypes');

module.exports = {
    connect (server) {
        const io = socketIo.listen(server);

        io.on('connection', socket => {
            Logger.info('user connected');

            socket.on(ChatMessage, message => {
                Logger.info(`recieved message: ${message}`);
                io.emit(ChatMessage, message);
            });
        });
    }
};
