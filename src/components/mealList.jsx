import React from 'react';
import {connect} from 'react-redux';

const MealList = React.createClass({
    propTypes: {
        meals: React.PropTypes.array.isRequired,
        resources: React.PropTypes.object.isRequired
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
        const {resources} = this.props;
        return (
            <div className="MealList">
                <h3>{resources.whoIsOrdering}</h3>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>{resources.who}</th>
                            <th>{resources.what}</th>
                            <th>{resources.howMuch}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderMeals()}
                    </tbody>
                </table>
            </div>
        );
    }
});

export default connect(
    state => ({resources: state.localization.resources.mealList})
)(MealList);
