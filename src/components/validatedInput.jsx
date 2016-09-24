import React from 'react';

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
            return 'has-error';
        }

        return 'has-success';
    },

    render () {
        return (
            <div className={`form-group ${this.validationBsStyle()}`}>
                <label htmlFor={this.props.id}>{this.props.label}</label>
                <input
                    className="form-control"
                    id={this.props.id}
                    onChange={this.handleOnChange}
                    placeholder={this.props.placeholder}
                    type={this.props.type}
                    value={this.props.value.text}
                />
                <p className="help-block">{this.props.value.errorMessage}</p>
            </div>
        );
    }
});

export default ValidatedInput;
