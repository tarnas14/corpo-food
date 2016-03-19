const orderNotices = (state = [], action) => {
    switch (action.type) {
    case 'HYDRATE_ORDER_NOTICES':
        return action.notices;
    }

    return [];
};

const hydrateOrderNotices = (notices) => {
    return {
        type: 'HYDRATE_ORDER_NOTICES',
        notices
    };
};

export {
    hydrateOrderNotices,
    orderNotices
};
