export const setManagerNotification = accessCode => ({type: 'SET_NOTIFICATION', notification: {
    accessCode,
    type: 'MANAGER_NOTIFICATION'
}});

export const clearNotification = () => ({type: 'CLEAR_NOTIFICATION'});
