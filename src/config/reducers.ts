import {UserDto} from "../dto/UserDto";
import {AuthDto} from "../dto/AuthDto";

export const userReducer = (state: UserDto | null = null, action: any): UserDto | null => {
    switch (action.type) {
        case "SET_USER":
            return action.payload;
        case "UPDATE_USER":
            return {
                ...state,
                ...action.payload,
            };
        default:
            return state;
    }
};

const initialState: AuthDto = {
    isLogged: false,
};

export const authReducer = (state = initialState, action: any): AuthDto => {
    switch (action.type) {
        case "SET_AUTH":
            return action.payload;
        case "UPDATE_AUTH":
            return {
                ...state,
                ...action.payload,
            };
        default:
            return state;
    }
};