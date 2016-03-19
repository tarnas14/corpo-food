export function hydrateOrderNotices (notices) {
    return {
        type: 'HYDRATE_ORDER_NOTICES',
        notices
    };
}
