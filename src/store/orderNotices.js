const orderNotices = (state = [], action) => {
    switch (action.type) {
    case 'HYDRATE_ORDER_NOTICES':
        return action.notices;
    }

    return [];
};

export default orderNotices;
