import React from 'react';
import {connect} from 'react-redux';

import {clearNotification} from '../store/notificationActions';

const Notification = React.createClass({
    propTypes: {
        dispatch: React.PropTypes.func.isRequired,
        notification: React.PropTypes.object.isRequired
    },

    renderNotificationBody () {
        const {notification} = this.props;

    },

    getTemplate (notification) {
        switch (notification.type) {
        case 'ADMIN_NOTIFICATION':
            const adminLink = `/admin/order/${notification.adminId}`;
            return {
                alertType: 'alert-info',
                title: `Order is ready, here is your administration link`,
                body: (
                    <div>
                        <p>Here is your permanent link to administration page for this order:</p>
                        <p><strong><a href={adminLink} target="_blank">{adminLink}</a></strong></p>
                        <p>Now that your order is up on the dashboard and people can join, you will probably <strike>have</strike> want to manage it a bit.</p>
                        <p><strong>You should probably save this link somewhere as we will never give it to you again!</strong></p>
                    </div>
                )
            };
        default:
            return null;
        }
    },

    dismiss () {
        this.props.dispatch(clearNotification());
    },

    render () {
        const {notification} = this.props;

        if (!notification.type) {
            return null;
        }

        const notificationToDisplay = this.getTemplate(notification);

        return (
            <div
                className={`alert ${notificationToDisplay.alertType} alert-dismissable text-center`}
            >
                <button
                    className="close"
                    onClick={this.dismiss}
                    tabIndex="-1"
                    type="button"
                >
                    <span>×</span>
                </button>
                {notificationToDisplay.body}
            </div>
        );
    }
});

export default connect(
    state => ({notification: state.notification})
)(Notification);
