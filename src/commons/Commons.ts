import {Simulate} from "react-dom/test-utils";
import {STRING_EMPTY} from "./StaticText";

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

export const isBlank = (input?: string): boolean => {
    return input === undefined || input === null || input.trim().length === 0;
}

export const limitText = (input: string, max: number): string => {
    if (isBlank(input)) {
        return STRING_EMPTY;
    }
    // @ts-ignore
    return input.length <= 18 ? input : (input.substr(0, max) + "...");
}

export const editDate = (input: string): string => {
    const date: Date = new Date(input);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const hour = date.getHours();
    const minute = date.getMinutes();
    const second = date.getSeconds();
    return `${year}-${addLeadingZero(month)}-${addLeadingZero(day)} godz: ${addLeadingZero(hour)}:${addLeadingZero(minute)}:${addLeadingZero(second)}`;
}

function addLeadingZero(num: number): any {
    // Sprawdzamy, czy liczba jest jednocyfrowa.
    if (num < 10) {
        // Dodajemy z przodu 0.
        return "0" + num;
    } else {
        // Zwracamy liczbę bez zmian.
        return num;
    }
}
