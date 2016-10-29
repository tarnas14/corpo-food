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
        user: React.PropTypes.object.isRequired,
    },

    getInitialState () {
        return {
            what: '',
            howMuch: '',
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

        const inlineControlStyle = {width: 'auto'};

        return (
            <form className="SignUpForMeal form-inline">
                <div className="form-group">
                    <span className="input-group">
                        <span className="input-group-addon">{username}</span>
                        <input
                            className="form-control"
                            id="what"
                            onChange={this.handleTextChange}
                            placeholder={resources.whatDoYouWant}
                            required
                            style={inlineControlStyle}
                            type="text"
                            value={this.state.what}
                        />
                        <input
                            className="form-control"
                            id="howMuch"
                            onChange={this.handleTextChange}
                            placeholder={resources.menuPrice}
                            required
                            style={inlineControlStyle}
                            type="number"
                            value={this.state.howMuch}
                        />
                    </span>
                </div>
                <button
                    className="btn btn-primary"
                    onClick={this.signUp}
                    type="button"
                >
                    {resources.action}
                </button>
            </form>
        );
    },
});

export default connect(
    state => ({
        user: state.user,
        orderId: state.activeOrder.id,
        orderedMeals: state.activeOrder.meals,
        resources: state.localization.resources.signUpForMeal,
    })
)(SignUpForMeal);
