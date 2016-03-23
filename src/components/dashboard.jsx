import React from 'react';
import {Row, Col, Alert, Button} from 'react-bootstrap';
import {Link} from 'react-router';
import OrderTile from './orderTile';
import {connect} from 'react-redux';
import {hydrateOrders} from '../store/ordersActions';

const Dashboard = React.createClass({
    propTypes: {
        dispatch: React.PropTypes.func.isRequired,
        orders: React.PropTypes.array.isRequired
    },

    componentWillMount () {

        fetch('/api/orders')
            .then((response) => response.json())
            .then((orders) => {
                const ordersToday = orders.map((orderWithStringDates) => {
                    return {
                        ...orderWithStringDates,
                        deadline: new Date(orderWithStringDates.deadline)
                    }
                }).filter((order) => {
                    const today = new Date();
                    return today.getFullYear() === order.deadline.getFullYear() &&
                        today.getMonth() === order.deadline.getMonth() &&
                        today.getDate() === order.deadline.getDate();
                });

                this.props.dispatch(hydrateOrders(ordersToday));
            });
    },

    _renderOrderTiles () {
        return this.props.orders.map((order) => {
            return <OrderTile key={order.id} {...order} />;
        });
    },

    _getTileContainerStyles() {
        return {
            marginTop: '1em'
        };
    },

    render () {
        const noOrdersYet = this.props.orders.length ?
            null : <Alert bsStyle="warning">Nikt jeszcze nie sfokusował się na czelendża - bądź pierwszy</Alert>;

        return (
            <div className="Dashboard">
                <Row>
                    <Col xs={12}>
                        <Link className="add-order-cta" to={'/newOrder'}>
                            <Button block bsSize="large" bsStyle="success">DODAJ ORDER</Button>
                        </Link>
                    </Col>
                </Row>
                {noOrdersYet}
                <Row style={this._getTileContainerStyles()}>
                    {this._renderOrderTiles()}
                </Row>
            </div>
        );
    }
});

const ConnectedDashboard = connect(
    (state) => ({orders: state.orders})
)(Dashboard);

export default ConnectedDashboard;
