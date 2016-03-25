export function mapOrderStateToOrder (orderState) {
    const order = {
        deadline: orderState.deadline.text,
        deliveryTime: orderState.deliveryTime.text,
        restaurant: orderState.restaurant.text,
        menu: orderState.menu.text,
        description: orderState.description.text,
        password: orderState.password.text,
        author: orderState.author.text,
        deliveryCost: orderState.deliveryCost.text,
        extraCostPerMeal: orderState.extraCostPerMeal.text
    };

    return order;

}
