import {UserDto} from "../dto/UserDto";

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