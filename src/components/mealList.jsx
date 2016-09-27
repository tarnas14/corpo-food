import React from 'react';

export default React.createClass({
    propTypes: {
        meals: React.PropTypes.array.isRequired
    },

    renderMeals () {
        return this.props.meals.map(meal => (
            <tr key={`${meal.hungryGuy}_${meal.name}_${meal.cost}`}>
                <td>{meal.hungryGuy}</td>
                <td>{meal.name}</td>
                <td>{meal.cost}</td>
            </tr>
        ));
    },

    render () {
        return (
            <div className="MealList">
                <h3>Zamawiają</h3>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Kto</th>
                            <th>co</th>
                            <th>za ile</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderMeals()}
                    </tbody>
                </table>
            </div>
        );
    }
})
