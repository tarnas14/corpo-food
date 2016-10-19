import React from 'react';
import {connect} from 'react-redux';

import {clearNotification} from '../store/notificationActions';

const Notification = React.createClass({
    propTypes: {
        dispatch: React.PropTypes.func.isRequired,
        notification: React.PropTypes.object.isRequired,
        resources: React.PropTypes.object.isRequired
    },

    getTemplate (notification) {
        switch (notification.type) {
        case 'MANAGER_NOTIFICATION':
            const res = this.props.resources.manager;
            const accessLink = `/manage/order/${notification.accessCode}`;
            return {
                alertType: 'alert-info',
                title: res.title,
                body: (
                    <div>
                        <p>{res.introToLink}</p>
                        <p><strong><a href={accessLink} target="_blank">{accessLink}</a></strong></p>
                        <p className="text-danger"><strong>{res.betterSaveIt}</strong></p>
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
    state => ({
        notification: state.notification,
        resources: state.localization.resources.notifications
    })
)(Notification);
