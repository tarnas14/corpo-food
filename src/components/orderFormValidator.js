export function validateHour (hourInput) {
    const pattern = /^([0-9]{1,2})\:([0-9]{2})$/;
    if (!pattern.test(hourInput)) {
        return false;
    }

    const [, hour, minutes] = pattern.exec(hourInput);
    return !(hour > 23 || minutes > 59);
}

export function validateMinimalLength (fieldValue, minimalLength) {
    return fieldValue.trim().length >= minimalLength;
}

export function validateUrl (url) {
    const pattern = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g;
    return pattern.test(url);
}

export function validateMoney (moneyInput) {
    const pattern = /^[0-9]{1,}(\.[0-9]{2})?$/;
    return pattern.test(moneyInput);
}
