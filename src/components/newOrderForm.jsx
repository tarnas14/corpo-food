import React from 'react';
import {Button, Input, Row, Col} from 'react-bootstrap';
import ValidatedInput from './validatedInput';
import {connect} from 'react-redux';
import {addNewOrder} from '../store/ordersActions';
import {validateMinimalLength, validateUrl, validateHour, validateMoney} from './orderFormValidator';
import {browserHistory} from 'react-router';
import {mapOrderStateToOrder} from './orderMapper';

const NewOrderForm = React.createClass({
    propTypes: {
        dispatch: React.PropTypes.func.isRequired,
        resources: React.PropTypes.object.isRequired
    },

    getInitialState () {
        return {
            restaurant: {
                text: '',
                isValid: true
            },
            deadline: {
                text: '',
                isValid: true
            },
            deliveryTime: {
                text: '',
                isValid: true
            },
            menu: {
                text: '',
                isValid: true
            },
            description: {
                text: ''
            },
            password: {
                text: '',
                isValid: true
            },
            passwordRepeat: {
                text: '',
                isValid: true
            },
            author: {
                text: '',
                isValid: true
            },
            deliveryCost: {
                text: '',
                isValid: true
            },
            extraCostPerMeal: {
                text: '',
                isValid: true
            }
        };
    },

    handleFieldChangeWithValidator (id, value, isValid) {
        this.setState(oldState => {
            oldState[id] = {
                text: value,
                isValid: isValid
            };
        });
    },

    handleHourChange (event) {
        const {id, value} = event.target;
        this.handleFieldChangeWithValidator(id, value, validateHour(value));
    },

    handleTextChange (event, isFieldRequired) {
        const {id, value} = event.target;
        const isValid = isFieldRequired ? validateMinimalLength(value, 1) : true;
        this.handleFieldChangeWithValidator(id, value, isValid);
    },

    handleRequiredTextChange (event) {
        this.handleTextChange(event, true);
    },

    handleMenuChange (event) {
        const {id, value} = event.target;
        const isValid = validateMinimalLength(value, 1) && validateUrl(value);
        this.handleFieldChangeWithValidator(id, value, isValid);
    },

    handlePasswordChange (event) {
        const {id, value} = event.target;
        this.handleFieldChangeWithValidator(id, value, validateMinimalLength(value, 6));
    },

    handleConfirmPasswordChange (event) {
        const {id, value} = event.target;
        this.handleFieldChangeWithValidator(id, value, this.state.password.text === value);
    },

    handleMoneyChange (event, isRequired) {
        const {id, value} = event.target;
        let isValid = false;
        if (isRequired && validateMoney(value)) {
            isValid = true;
        }

        if (!isRequired && validateMinimalLength(value, 1) && validateMoney(value)) {
            isValid = true;
        }

        this.handleFieldChangeWithValidator(id, value, isValid);
    },

    handleRequiredMoneyChange (event) {
        this.handleMoneyChange(event, true);
    },

    handleSubmit () {
        this.props.dispatch(addNewOrder(mapOrderStateToOrder(this.state)));
        browserHistory.push('/');
    },

    render () {
        return (
            <Row >
                <Col xs={8}>
                    <form>
                        <ValidatedInput
                            id="restaurant"
                            label={this.props.resources.restaurant}
                            onChange={this.handleRequiredTextChange}
                            placeholder={this.props.resources.restaurant}
                            type="text"
                            validationMessage={this.props.resources.validationMessages.provideRestaurant}
                            value={this.state.restaurant}
                        />
                        <ValidatedInput
                            id="deadline"
                            label={this.props.resources.orderingAt}
                            onChange={this.handleHourChange}
                            placeholder={this.props.resources.orderingAt}
                            validationMessage={this.props.resources.validationMessages.provideValidHour}
                            value={this.state.deadline}
                        />
                        <ValidatedInput
                            id="deliveryTime"
                            label={this.props.resources.deliveryAt}
                            onChange={this.handleHourChange}
                            placeholder={this.props.resources.deliveryAt}
                            validationMessage={this.props.resources.validationMessages.provideValidHour}
                            value={this.state.deliveryTime}
                        />
                        <ValidatedInput
                            id="menu"
                            label={this.props.resources.menu}
                            onChange={this.handleMenuChange}
                            placeholder={this.props.resources.menu}
                            type="text"
                            validationMessage={this.props.resources.validationMessages.provideMenuLink}
                            value={this.state.menu}
                        />
                        <Input
                            id="description"
                            label={this.props.resources.description}
                            onChange={this.handleTextChange}
                            placeholder={this.props.resources.description}
                            type="textarea"
                        />
                        <ValidatedInput
                            id="password"
                            label={this.props.resources.password}
                            onChange={this.handlePasswordChange}
                            placeholder={this.props.resources.password}
                            type="password"
                            validationMessage={this.props.resources.validationMessages.passwordTooShort}
                            value={this.state.password}
                        />
                        <ValidatedInput
                            id="passwordRepeat"
                            label={this.props.resources.passwordAgain}
                            onChange={this.handleConfirmPasswordChange}
                            placeholder={this.props.resources.passwordAgain}
                            type="password"
                            validationMessage={this.props.resources.validationMessages.passwordsDontMatch}
                            value={this.state.passwordRepeat}
                        />
                        <ValidatedInput
                            id="author"
                            label={this.props.resources.author}
                            onChange={this.handleRequiredTextChange}
                            placeholder={this.props.resources.author}
                            type="text"
                            validationMessage={this.props.resources.validationMessages.provideAuthor}
                            value={this.state.author}
                        />
                        <ValidatedInput
                            addonAfter={this.props.resources.currency}
                            id="deliveryCost"
                            label={this.props.resources.deliveryCost}
                            onChange={this.handleRequiredMoneyChange}
                            placeholder={this.props.resources.deliveryCost}
                            type="text"
                            validationMessage={this.props.resources.validationMessages.provideValidDeliveryCost}
                            value={this.state.deliveryCost}
                        />
                        <ValidatedInput
                            addonAfter={this.props.resources.currency}
                            id="extraCostPerMeal"
                            label={this.props.resources.extraCostPerMeal}
                            onChange={this.handleMoneyChange}
                            placeholder={this.props.resources.extraCostPerMeal}
                            type="text"
                            validationMessage={this.props.resources.validationMessages.provideValidExtraCostPerMeal}
                            value={this.state.extraCostPerMeal}
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
