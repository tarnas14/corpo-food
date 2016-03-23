import React from 'react';
import {Button, Input, Row, Col} from 'react-bootstrap';
import ValidatedInput from './validatedInput';
import {connect} from 'react-redux';
import {addNewOrder} from '../store/ordersActions';
import {validateHour} from '../validators/orderFormValidator';

const NewOrderForm = React.createClass({
    propTypes: {
        dispatch: React.PropTypes.func.isRequired
    },

    getInitialState () {
        return {
            restaurant: '',
            deadline: {
                text: '',
                isValid: true
            },
            deliveryTime: {
                text: '',
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

    handleHourChange (id, text) {
        this.setState(oldState => {
            oldState[id] = {
                text: text,
                isValid: validateHour(text)
            };
        });
    },

    handleTextChange (event) {
        const {id, value} = event.target;
        this.setState(oldState => {
            oldState[id] = value;
            return oldState;
        });
    },

    render () {
        return (
            <Row >
                <Col xs={8}>
                    <form>
                        <Input
                            id="restaurant"
                            label="Lokal"
                            onChange={this.handleTextChange}
                            placeholder="Lokal"
                            type="text"
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
                        <Input
                            id="menu"
                            label="Menu"
                            onChange={this.handleTextChange}
                            placeholder="Menu"
                            type="text"
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
                            id="deliveryCost"
                            label="Koszt dowozu"
                            onChange={this.handleTextChange}
                            placeholder="Koszt dowozu"
                            type="text"
                        />
                        <Input
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
