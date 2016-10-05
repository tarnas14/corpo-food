export const setAdminNotification = adminId => ({type: 'SET_NOTIFICATION', notification: {
    adminId,
    type: 'ADMIN_NOTIFICATION'
}});

export const clearNotification = () => ({type: 'CLEAR_NOTIFICATION'});
