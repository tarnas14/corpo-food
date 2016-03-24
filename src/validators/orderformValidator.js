export function validateHour (hourInput) {
    const pattern = /([0-9]{1,2})\:([0-9]{2})/;
    if (!pattern.test(hourInput)) {
        return false;
    }

    const [, hour, minutes] = pattern.exec(hourInput);
    if (hour > 24 || minutes > 59) {
        return false;
    }

    return true;
}

export function isFieldFilled (fieldValue) {
    return fieldValue.trim().length > 0;
}

export function validateUrl (url) {
    const pattern = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g;
    return pattern.test(url);
}
