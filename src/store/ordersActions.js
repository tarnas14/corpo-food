export function addNewOrder (order) {
    return {type: 'ADD_NEW_ORDER', order: order};
}

export function hydrateOrders (notices) {
    return {
        type: 'HYDRATE_ORDERS',
        notices
    };
}
