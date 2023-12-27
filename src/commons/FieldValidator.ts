export const isEmail = (input: string): boolean => {
    if (input === "") {
        return false;
    }
    if (input.indexOf("@") === -1) {
        return false;
    }
    if (input.indexOf(".") === -1) {
        return false;
    }
    const regex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    return regex.test(input);
}

export const isPolishPhoneNumber = (input: string): boolean => {
    if (isBlank(input)) {
        return false;
    }
    const regex = /(?<!\w)(\(?(\+|00)?48\)?)?[ -]?\d{3}[ -]?\d{3}[ -]?\d{3}(?!\w)/;
    return regex.test(input);
}

export const isBlank = (input: string): boolean => {
    return input === undefined || input === null || input.trim().length === 0;
}