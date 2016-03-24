import React from 'react';
import {Button, Input, Row, Col} from 'react-bootstrap';
import ValidatedInput from './validatedInput';
import {connect} from 'react-redux';
import {addNewOrder} from '../store/ordersActions';
import {isFieldFilled, validateUrl, validateHour} from '../validators/orderFormValidator';

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
            description: '',
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

    handleHourChange (event) {
        const {id, value} = event.target;
        this.setState(oldState => {
            oldState[id] = {
                text: value,
                isValid: validateHour(value)
            };
        });
    },

    handleTextChange (event, isFieldRequired) {
        const {id, value} = event.target;
        this.setState(oldState => {
            oldState[id] = {
                text: value,
                isValid: isFieldRequired === true ? isFieldFilled(value) : true
            };
        });
    },

    handleRequiredTextChange (event) {
        this.handleTextChange(event, true);
    },

    handleMenuChange (event) {
        const {id, value} = event.target;
        this.setState(oldState => {
            oldState[id] = {
                text: value,
                isValid: isFieldFilled(value) && validateUrl(value)
            };
        });
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
                        <Input
                            id="password"
                            label="Hasło administracyjne"
                            onChange={this.handleTextChange}
                            placeholder="Hasło administracyjne"
                            type="password"
                        />
                        <Input
                            id="passwordRepeat"
                            label="Powtorz hasło"
                            onChange={this.handleTextChange}
                            placeholder="Powtorz hasło"
                            type="password"
                        />
                        <Input
                            id="author"
                            label="Autor"
                            onChange={this.handleTextChange}
                            placeholder="Adres e-mail"
                            type="text"
                        />
                        <Input
                            addonAfter="zł"
                            id="deliveryCost"
                            label="Koszt dowozu"
                            onChange={this.handleTextChange}
                            placeholder="Koszt dowozu"
                            type="text"
                        />
                        <Input
                            addonAfter="zł"
                            id="extraCostPerMeal"
                            label="Do każdego zamowienia"
                            onChange={this.handleTextChange}
                            placeholder="PLN"
                            type="text"
                        />
                        <Button onClick={() => this.props.dispatch(addNewOrder(this.state))} type="button">
                            Save
                        </Button>
                    </form>
                </Col>
            </Row>
        );
    }
});

export default connect()(NewOrderForm);
