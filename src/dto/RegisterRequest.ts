import {Gender} from "./Gender";

export interface RegisterRequest{
    name: string;
    email: string;
    password: string;
    phoneNumber: string;
    gender: Gender;
    dateOfBirth: Date;
}

