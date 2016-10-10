import React from 'react';
import {connect} from 'react-redux';
import {signUpForMeal} from '../store/ordersActions';
import SetUsername from './setUsername';

const SignUpForMeal = React.createClass({
    propTypes: {
        dispatch: React.PropTypes.func.isRequired,
        orderId: React.PropTypes.string.isRequired,
        orderedMeals: React.PropTypes.array.isRequired,
        resources: React.PropTypes.object.isRequired,
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
        this.setState(this.getInitialState());
    },

    render () {
        const {resources, user: {name: username}} = this.props;

        if (!username) {
            return <SetUsername />;
        }

        return (
            <form className="SignUpForMeal form-inline">
                <label>{username}</label>
                <input
                    className="form-control"
                    id="what"
                    onChange={this.handleTextChange}
                    placeholder={resources.whatDoYouWant}
                    required
                    type="text"
                    value={this.state.what}
                />
                <input
                    className="form-control"
                    id="howMuch"
                    onChange={this.handleTextChange}
                    placeholder={resources.menuPrice}
                    required
                    type="number"
                    value={this.state.howMuch}
                />
                <button
                    className="btn btn-primary"
                    onClick={this.signUp}
                    type="button"
                >{resources.action}</button>
            </form>
        );
    }
});

export default connect(
    state => ({
        user: state.user,
        orderId: state.activeOrder.id,
        orderedMeals: state.activeOrder.meals,
        resources: state.localization.resources.signUpForMeal
    })
)(SignUpForMeal);
