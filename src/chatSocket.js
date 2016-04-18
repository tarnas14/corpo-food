const socketIo = require('socket.io');
const Logger = require('./logger');
const {CONNECTION, JOIN_ROOM, ROOM_JOINED, CHAT_MESSAGE} = require('./enums/chatMessageTypes');

const Message = require('./models/message');

module.exports = {
    connect (server) {
        const io = socketIo.listen(server);

        io.on(CONNECTION, socket => {
            Logger.info('user connected');

            socket.on(JOIN_ROOM, orderId => {
                Logger.info(`joining room: ${orderId}`);
                socket.join(orderId);

                Message.find({orderId: orderId}, (error, messages) => {
                    if (error) {
                        Logger.info(error.message);
                        return;
                    }

                    io.to(orderId).emit(ROOM_JOINED, messages);
                });
            });

            socket.on(CHAT_MESSAGE, message => {
                Logger.info(`recieved message: ${JSON.stringify(message)}`);

                const newMessage = new Message(message);

                newMessage.save(error => {
                    if (error) {
                        Logger.info(error.message);
                        return;
                    }

                    socket.to(message.orderId).emit(CHAT_MESSAGE, message);
                });
            });
        });
    }
};
