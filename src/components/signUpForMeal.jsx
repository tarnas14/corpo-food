import React from 'react';
import {connect} from 'react-redux';
import {signUpForMeal} from '../store/ordersActions';
import SetUsername from './setUsername';

const SignUpForMeal = React.createClass({
    propTypes: {
        dispatch: React.PropTypes.func.isRequired,
        orderId: React.PropTypes.string.isRequired,
        orderedMeals: React.PropTypes.array.isRequired,
        user: React.PropTypes.object.isRequired
    },

    getInitialState () {
        return {
            what: '',
            howMuch: ''
        };
    },

    handleTextChange (event) {
        const {id, value} = event.target;

        this.setState(oldState => {
            oldState[id] = value;
        });
    },

    signUp () {
        if (!this.state.what || !this.state.howMuch) {
            return;
        }

        this.props.dispatch(signUpForMeal(this.props.orderId, this.props.user.name, this.state.what, this.state.howMuch));
    },

    userAlreadyOrdered () {
        return this.props.user.name && this.props.orderedMeals.some(meal => meal.hungryGuy === this.props.user.name);
    },

    renderMealSignupForm () {
        const {name: username} = this.props.user;

        if (!username) {
            return <SetUsername />;
        }

        return (
            <form className="SignUpForMeal form-inline">
                <label>{username}</label>
                <input
                    id="what"
                    className="form-control"
                    onChange={this.handleTextChange}
                    placeholder="co chcesz?"
                    type="text"
                    required
                    value={this.state.what}
                />
                <input
                    id="howMuch"
                    className="form-control"
                    onChange={this.handleTextChange}
                    placeholder="cena w menu"
                    type="number"
                    required
                    value={this.state.howMuch}
                />
                <button
                    type="button"
                    className="btn btn-primary"
                    onClick={this.signUp}
                >Fokusuj</button>
            </form>
        );
    },

    render () {
        const {name: username} = this.props.user;

        return this.userAlreadyOrdered() ?
            <div>you've already ordered, {username} ;)</div> :
            this.renderMealSignupForm();
    }
});

export default connect(
    state => ({
        user: state.user,
        orderId: state.activeOrder.id,
        orderedMeals: state.activeOrder.meals
    })
)(SignUpForMeal);
