export default {
    regularMessage () {
        return (username, message) => ({user: username, message});
    },

    messageWithBadge (badge) {
        return (username, message) => ({user: username, message, badge});
    }
};
