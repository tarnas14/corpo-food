import React from 'react';
import {Input} from 'react-bootstrap';

const ValidatedInput = React.createClass({

    propTypes: {
        id: React.PropTypes.string.isRequired,
        label: React.PropTypes.string.isRequired,
        onChange: React.PropTypes.func.isRequired,
        placeholder: React.PropTypes.string.isRequired,
        validationMessage: React.PropTypes.string.isRequired,
        value: React.PropTypes.object.isRequired
    },

    handleChange (event) {
        this.props.onChange(event);
    },

    validationStyle () {
        const {text, isValid} = this.props.value;

        if (!text) {
            return null;
        }

        if (isValid) {
            return 'success';
        }

        return 'error';
    },

    getValidationMessage () {
        const {text, isValid} = this.props.value;
        if (isValid) {
            return null;
        }
        return this.props.validationMessage;
    },

    render () {
        return (
            <Input
                bsStyle={this.validationStyle()}
                groupClassName="group-class"
                hasFeedback
                help={this.getValidationMessage()}
                id={this.props.id}
                label={this.props.label}
                labelClassName="label-class"
                onChange={this.handleChange}
                placeholder={this.props.placeholder}
                type="text"
                value={this.props.value.text}
            />
        );
    }
});

export default ValidatedInput;
