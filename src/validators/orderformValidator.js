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
