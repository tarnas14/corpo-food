import React from 'react';
import {Input} from 'react-bootstrap';

const ValidatedInput = React.createClass({
    propTypes: {
        id: React.PropTypes.string.isRequired,
        label: React.PropTypes.string.isRequired,
        placeholder: React.PropTypes.string.isRequired,
        type: React.PropTypes.string.isRequired,
        updateValue: React.PropTypes.func.isRequired,
        validators: React.PropTypes.array,
        value: React.PropTypes.object.isRequired
    },
    handleOnChange (event) {
        const {value} = event.target;
        if (this.props.validators && this.props.validators.length) {
            for (let i = 0; i < this.props.validators.length; ++i) {
                const validator = this.props.validators[i];
                const validationMessage = validator(value);

                if (validationMessage) {
                    this.props.updateValue(value, validationMessage);
                    return;
                }
            }
        }

        this.props.updateValue(value);
    },

    validationBsStyle () {
        if (!this.props.value.touched) {
            return null;
        }

        const {errorMessage} = this.props.value;

        if (errorMessage) {
            return 'error';
        }

        return 'success';
    },

    render () {
        return (
            <Input
                bsStyle={this.validationBsStyle()}
                groupClassName="group-class"
                hasFeedback
                help={this.props.value.errorMessage}
                id={this.props.id}
                label={this.props.label}
                labelClassName="label-class"
                onChange={this.handleOnChange}
                placeholder={this.props.placeholder}
                type={this.props.type}
                value={this.props.value.text}
            />
        );
    }
});

export default ValidatedInput;
