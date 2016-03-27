import React from 'react';
import {Button, Input, Row, Col} from 'react-bootstrap';
import ValidatedInput from './validatedInput';
import {connect} from 'react-redux';
import {addNewOrder} from '../store/ordersActions';
import {requiredValidator, numberValidator, hourValidator, urlValidator, minimalLengthValidator} from './orderFormValidators';
import {mapOrderStateToOrder} from './orderMapper';

const NewOrderForm = React.createClass({
    propTypes: {
        dispatch: React.PropTypes.func.isRequired,
        resources: React.PropTypes.object.isRequired
    },

    getInitialState () {
        return {
            restaurant: {
                text: ''
            },
            deadline: {
                text: ''
            },
            deliveryTime: {
                text: ''
            },
            menu: {
                text: ''
            },
            description: {
                text: ''
            },
            password: {
                text: ''
            },
            passwordRepeat: {
                text: ''
            },
            author: {
                text: ''
            },
            deliveryCost: {
                text: ''
            },
            extraCostPerMeal: {
                text: ''
            }
        };
    },

    handleTextChange (event) {
        const {id, value} = event.target;
        this.handleValueUpdate(id, value);
    },

    handleBackendValidationErrors (validationErrors) {
        validationErrors.forEach(validationError => {
            const currentValue = this.state[validationError.property].text;
            this.handleValueUpdate(validationError.property, currentValue, validationError.message);
        });
    },

    handleSubmit () {
        this.props.dispatch(addNewOrder(mapOrderStateToOrder(this.state), this.handleBackendValidationErrors));
    },

    onChange (id, value) {
        this.setState(oldState => {
            oldState[id] = value;
        });
    },

    handleValueUpdate (id, newText, validationMessage) {
        this.setState(oldState => {
            const newState = {...oldState};
            newState[id] = {
                text: newText,
                validationMessage
            };

            return newState;
        });
    },

    passwordRepeatedCorrectlyValidator (validationMessage) {
        return repeatedPasswordValue => repeatedPasswordValue === this.state.password.text ? null : validationMessage;
    },

    render () {
        return (
            <Row >
                <Col xs={8}>
                    <form>
                        <ValidatedInput
                            id="restaurant"
                            label={this.props.resources.restaurant}
                            placeholder={this.props.resources.restaurant}
                            type="text"
                            updateValue={this.handleValueUpdate.bind(null, 'restaurant')}
                            validators={[requiredValidator(this.props.resources.validationMessages.required)]}
                            value={this.state.restaurant}
                        />
                        <ValidatedInput
                            id="deadline"
                            label={this.props.resources.orderingAt}
                            placeholder={this.props.resources.orderingAt}
                            type="text"
                            updateValue={this.handleValueUpdate.bind(null, 'deadline')}
                            validators={[
                                requiredValidator(this.props.resources.validationMessages.required),
                                hourValidator(this.props.resources.validationMessages.provideValidHour)
                            ]}
                            value={this.state.deadline}
                        />
                        <ValidatedInput
                            id="deliveryTime"
                            label={this.props.resources.deliveryAt}
                            placeholder={this.props.resources.deliveryAt}
                            type="text"
                            updateValue={this.handleValueUpdate.bind(null, 'deliveryTime')}
                            validators={[
                                requiredValidator(this.props.resources.validationMessages.required),
                                hourValidator(this.props.resources.validationMessages.provideValidHour)
                            ]}
                            value={this.state.deliveryTime}
                        />
                        <ValidatedInput
                            id="menu"
                            label={this.props.resources.menu}
                            placeholder={this.props.resources.menu}
                            type="text"
                            updateValue={this.handleValueUpdate.bind(null, 'menu')}
                            validators={[
                                requiredValidator(this.props.resources.validationMessages.required),
                                urlValidator(this.props.resources.validationMessages.provideMenuLink)
                            ]}
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
                            placeholder={this.props.resources.password}
                            type="password"
                            updateValue={this.handleValueUpdate.bind(null, 'password')}
                            validators={[
                                requiredValidator(this.props.resources.validationMessages.required),
                                minimalLengthValidator(6, this.props.resources.validationMessages.passwordTooShort)]}
                            value={this.state.password}
                        />
                        <ValidatedInput
                            id="passwordRepeat"
                            label={this.props.resources.passwordAgain}
                            placeholder={this.props.resources.passwordAgain}
                            type="password"
                            updateValue={this.handleValueUpdate.bind(null, 'passwordRepeat')}
                            validators={[this.passwordRepeatedCorrectlyValidator(this.props.resources.validationMessages.passwordsDontMatch)]}
                            value={this.state.passwordRepeat}
                        />
                        <ValidatedInput
                            id="author"
                            label={this.props.resources.author}
                            placeholder={this.props.resources.author}
                            type="text"
                            updateValue={this.handleValueUpdate.bind(null, 'author')}
                            validators={[requiredValidator(this.props.resources.validationMessages.provideAuthor)]}
                            value={this.state.author}
                        />
                        <ValidatedInput
                            id="deliveryCost"
                            label={this.props.resources.deliveryCost}
                            placeholder={this.props.resources.deliveryCost}
                            type="text"
                            updateValue={this.handleValueUpdate.bind(null, 'deliveryCost')}
                            validators={[
                                requiredValidator(this.props.resources.validationMessages.required),
                                numberValidator(this.props.resources.validationMessages.provideValidDeliveryCost)
                            ]}
                            value={this.state.deliveryCost}
                        />
                        <ValidatedInput
                            id="extraCostPerMeal"
                            label={this.props.resources.extraCostPerMeal}
                            placeholder={this.props.resources.extraCostPerMeal}
                            type="text"
                            updateValue={this.handleValueUpdate.bind(null, 'extraCostPerMeal')}
                            validators={[
                                requiredValidator(this.props.resources.validationMessages.required),
                                numberValidator(this.props.resources.validationMessages.provideValidExtraCostPerMeal)
                            ]}
                            value={this.state.extraCostPerMeal}
                        />
                        <Button onClick={this.handleSubmit} type="button">
                            {this.props.resources.save}
                        </Button>
                    </form>
                </Col>
            </Row>
        );
    }
});

export default connect(state => ({resources: state.localization.resources.newOrderForm}))(NewOrderForm);
