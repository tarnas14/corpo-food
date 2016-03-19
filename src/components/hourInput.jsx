import React from 'react';
import {Input} from 'react-bootstrap';

const HourInput = React.createClass({

    propTypes: {
        id: React.PropTypes.string.isRequired,
        label: React.PropTypes.string.isRequired,
        onChange: React.PropTypes.func.isRequired,
        placeholder: React.PropTypes.string.isRequired,
        value: React.PropTypes.object.isRequired
    },

    handleChange (event) {
        this.props.onChange(event.target.id, event.target.value);
    },

    validationStyle () {
        const {hour, isValid} = this.props.value;

        if (!hour) {
            return null;
        }

        if (isValid) {
            return 'success';
        }

        return 'error';
    },

    validationMessage () {
        const {hour, isValid} = this.props.value;

        if (isValid || !hour) {
            return null;
        }
        return 'Zainputuj poprawną godzinę.';
    },

    render () {
        return (
            <Input
                bsStyle={this.validationStyle()}
                groupClassName="group-class"
                hasFeedback
                help={this.validationMessage()}
                id={this.props.id}
                label={this.props.label}
                labelClassName="label-class"
                onChange={this.handleChange}
                placeholder={this.props.placeholder}
                type="text"
                value={this.props.value.hour}
            />
        );
    }
});

export default HourInput;
