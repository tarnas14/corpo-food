import React from 'react';
import {Link} from 'react-router';
import OrderTile from './orderTile';
import {connect} from 'react-redux';
import {hydrateOrders} from '../store/ordersActions';

const Dashboard = React.createClass({
    propTypes: {
        dispatch: React.PropTypes.func.isRequired,
        orders: React.PropTypes.array.isRequired,
        resources: React.PropTypes.object.isRequired
    },

    componentDidMount () {
        this.props.dispatch(hydrateOrders());
    },

    _renderOrderTiles () {
        return this.props.orders.map(order => <OrderTile key={order.id} {...order} />);
    },

    _getTileContainerStyles () {
        return {
            marginTop: '1em'
        };
    },

    render () {
        const noOrdersYet = this.props.orders.length
            ? null
            : <div className="alert alert-warning">{this.props.resources.noOrdersYet}</div>;

        return (
            <div className="Dashboard">
                <div className="row">
                    <div className="col-xs-12">
                        <Link className="add-order-cta" to={'/newOrder'}>
                            <button className="btn btn-success btn-block btn-lg">{this.props.resources.addOrder}</button>
                        </Link>
                    </div>
                </div>
                {noOrdersYet}
                <div className="row" style={this._getTileContainerStyles()}>
                    {this._renderOrderTiles()}
                </div>
            </div>
        );
    }
});

const ConnectedDashboard = connect(
    state => ({
        orders: state.orders,
        resources: state.localization.resources.dashboard
    })
)(Dashboard);

export default ConnectedDashboard;
