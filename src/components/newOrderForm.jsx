import React from 'react';
import {Button, Input, Row, Col} from 'react-bootstrap';
import HourInput from './HourInput';
import {connect} from 'react-redux';
import {addNewOrder} from '../store/ordersActions';
import {browserHistory} from 'react-router';

const NewOrderForm = React.createClass({
    propTypes: {
        dispatch: React.PropTypes.func.isRequired,
        resources: React.PropTypes.object.isRequired
    },

    getInitialState () {
        return {
            restaurant: '',
            deadline: {
                hour: '',
                isValid: true
            },
            deliveryTime: {
                hour: '',
                isValid: true
            },
            menu: '',
            description: '',
            password: '',
            passwordRepeat: '',
            author: '',
            deliveryCost: '',
            extraCostPerMeal: ''
        };
    },

    handleHourChange (id, hour) {
        this.setState(oldState => {
            oldState[id] = {
                hour,
                isValid: this.validateHour(hour)
            };
        });
    },

    validateHour (hourInput) {
        const pattern = /([0-9]{1,2})\:([0-9]{2})/;
        if (!pattern.test(hourInput)) {
            return false;
        }

        const [, hour, minutes] = pattern.exec(hourInput);
        if (hour > 24 || minutes > 59) {
            return false;
        }

        return true;

    },

    handleTextChange (event) {
        const {id, value} = event.target;
        this.setState(oldState => {
            oldState[id] = value;
            return oldState;
        });
    },

    handleSubmit () {
        this.props.dispatch(addNewOrder(this.state));
        browserHistory.push('/');
    },

    render () {
        return (
            <Row >
                <Col xs={8}>
                    <form>
                        <Input
                            id="restaurant"
                            label={this.props.resources.restaurant}
                            onChange={this.handleTextChange}
                            placeholder={this.props.resources.restaurant}
                            type="text"
                        />
                        <HourInput
                            id="deadline"
                            label={this.props.resources.orderingAt}
                            onChange={this.handleHourChange}
                            placeholder={this.props.resources.orderingAt}
                            value={this.state.deadline}
                        />
                        <HourInput
                            id="deliveryTime"
                            label={this.props.resources.deliveryAt}
                            onChange={this.handleHourChange}
                            placeholder={this.props.resources.deliveryAt}
                            value={this.state.deliveryTime}
                        />
                        <Input
                            id="menu"
                            label={this.props.resources.menu}
                            onChange={this.handleTextChange}
                            placeholder={this.props.resources.menu}
                            type="text"
                        />
                        <Input
                            id="description"
                            label={this.props.resources.description}
                            onChange={this.handleTextChange}
                            placeholder={this.props.resources.description}
                            type="textarea"
                        />
                        <Input
                            id="password"
                            label={this.props.resources.password}
                            onChange={this.handleTextChange}
                            placeholder={this.props.resources.password}
                            type="password"
                        />
                        <Input
                            id="passwordRepeat"
                            label={this.props.resources.passwordAgain}
                            onChange={this.handleTextChange}
                            placeholder={this.props.resources.passwordAgain}
                            type="password"
                        />
                        <Input
                            id="author"
                            label={this.props.resources.author}
                            onChange={this.handleTextChange}
                            placeholder={this.props.resources.author}
                            type="text"
                        />
                        <Input
                            id="deliveryCost"
                            label={this.props.resources.deliveryCost}
                            onChange={this.handleTextChange}
                            placeholder={this.props.resources.deliveryCost}
                            type="text"
                        />
                        <Input
                            id="extraCostPerMeal"
                            label={this.props.resources.extraCostPerMeal}
                            onChange={this.handleTextChange}
                            placeholder={this.props.resources.extraCostPerMeal}
                            type="text"
                        />
                        <Button onClick={this.handleSubmit} type="button">
                            Save
                        </Button>
                    </form>
                </Col>
            </Row>
        );
    }
});

export default connect(state => ({resources: state.localization.resources.newOrderForm}))(NewOrderForm);
