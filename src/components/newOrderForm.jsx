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
        dispatch: React.PropTypes.func.isRequired
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
        const isValid = isFieldRequired === true ? validateMinimalLength(value, 1) : true;
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
                            label="Lokal"
                            onChange={this.handleRequiredTextChange}
                            placeholder="Lokal"
                            type="text"
                            validationMessage="Proszę podać lokal"
                            value={this.state.restaurant}
                        />
                        <ValidatedInput
                            id="deadline"
                            label="Zamawiam o"
                            onChange={this.handleHourChange}
                            placeholder="O ktorej zamawiasz"
                            validationMessage="Podaj poprawna godzinę"
                            value={this.state.deadline}
                        />
                        <ValidatedInput
                            id="deliveryTime"
                            label="Zamawiam na"
                            onChange={this.handleHourChange}
                            placeholder="Zamawiam na"
                            validationMessage="Podaj poprawna godzinę"
                            value={this.state.deliveryTime}
                        />
                        <ValidatedInput
                            id="menu"
                            label="Menu"
                            onChange={this.handleMenuChange}
                            placeholder="Menu"
                            type="text"
                            validationMessage="Proszę podać odnośnik do menu"
                            value={this.state.menu}
                        />
                        <Input
                            id="description"
                            label="Opis"
                            onChange={this.handleTextChange}
                            placeholder="Opis"
                            type="textarea"
                        />
                        <ValidatedInput
                            id="password"
                            label="Hasło administracyjne"
                            onChange={this.handlePasswordChange}
                            placeholder="Hasło administracyjne"
                            type="password"
                            validationMessage="Minimalna długość hasła wynosi 6 znakow"
                            value={this.state.password}
                        />
                        <ValidatedInput
                            id="passwordRepeat"
                            label="Powtorz hasło"
                            onChange={this.handleConfirmPasswordChange}
                            placeholder="Powtorz hasło"
                            type="password"
                            validationMessage="Hasla nie sa takie same"
                            value={this.state.passwordRepeat}
                        />
                        <ValidatedInput
                            id="author"
                            label="Autor"
                            onChange={this.handleRequiredTextChange}
                            placeholder="Adres e-mail"
                            type="text"
                            validationMessage="Proszę podać autora zamowienia"
                            value={this.state.author}
                        />
                        <ValidatedInput
                            addonAfter="zł"
                            id="deliveryCost"
                            label="Koszt dowozu"
                            onChange={this.handleRequiredMoneyChange}
                            placeholder="Koszt dowozu"
                            type="text"
                            validationMessage="Podaj poprawny koszt dostawy"
                            value={this.state.deliveryCost}
                        />
                        <ValidatedInput
                            addonAfter="zł"
                            id="extraCostPerMeal"
                            label="Do każdego zamowienia"
                            onChange={this.handleMoneyChange}
                            placeholder="PLN"
                            type="text"
                            validationMessage="Podaj poprawny koszt do kazdego zamowienia"
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

export default connect()(NewOrderForm);
