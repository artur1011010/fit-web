
export enum Gender {
    M = "M",
    F = "F",
}

export const fromString = (input: string): Gender => {
    switch (input) {
        case "M":
            return Gender.M;
        case "m":
            return Gender.M;
        case "F":
            return Gender.F;
        case "f":
            return Gender.F;
        default:
            throw new Error(`Can not parse: ${input} string to Gender`);
    }
}

export const getPolishName = (input: Gender): string => {
    switch (input) {
        case Gender.M:
            return "Mężczyzna"
        case Gender.F:
            return "Kobieta";
    }
}