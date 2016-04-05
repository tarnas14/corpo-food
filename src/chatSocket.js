const socketIo = require('socket.io');
const Logger = require('./logger');
const {CONNECTION, JOIN_ROOM, ROOM_JOINED, CHAT_MESSAGE} = require('./enums/chatMessageTypes');

const dummyMessages = [
    {user: 'janek', message: 'hello world'},
    {user: 'roman', message: 'hello janek'}
];

module.exports = {
    connect (server) {
        const io = socketIo.listen(server);

        io.on(CONNECTION, socket => {
            Logger.info('user connected');

            socket.on(JOIN_ROOM, roomId => {
                Logger.info(`recieved message: ${roomId}`);
                socket.join(roomId);

                io.to(roomId).emit(ROOM_JOINED, dummyMessages);
            });

            socket.on(CHAT_MESSAGE, message => {
                Logger.info(`recieved message: ${JSON.stringify(message)}`);

                socket.to(message.roomId).emit(CHAT_MESSAGE, message);
            });
        });
    }
};
