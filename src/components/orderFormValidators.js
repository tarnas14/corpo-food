export function minimalLengthValidator (minimalLength, validationMessage) {
    return value => value.trim().length >= minimalLength ? null : validationMessage;
}

export function urlValidator (validationMessage) {
    return url => {
        const pattern = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g;
        return pattern.test(url) ? null : validationMessage;
    };
}

export function hourValidator (validationMessage) {
    return hourInput => {
        const pattern = /^([0-9]{1,2})\:([0-9]{2})$/;
        if (!pattern.test(hourInput)) {
            return validationMessage;
        }

        const [, hour, minutes] = pattern.exec(hourInput);
        return !(hour > 23 || minutes > 59) ? null : validationMessage;
    };
}

export function requiredValidator (validationMessage) {
    return valueText => valueText.trim().length ? null : validationMessage;
}

export function numberValidator (validationMessage) {
    return moneyInput => {
        const pattern = /^[0-9]{1,}(\.[0-9]{2})?$/;
        return pattern.test(moneyInput) ? null : validationMessage;
    };
}
