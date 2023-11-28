import {AuthDto} from "../dto/AuthDto";

export const storeAuth = (action: ACTIONS, payload : AuthDto | null) : AuthDto =>  {
    switch (action) {
        case ACTIONS.SAVE: {
            console.log("SAVE")
            if (payload !== undefined) {
                sessionStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(payload));
                dispatchCustomEvent();
                return getEmptyAuthDto();
            } else {
                console.log("error: payload is undefined")
                return getEmptyAuthDto();
            }
        }
        case ACTIONS.GET: {
            const item = sessionStorage.getItem(AUTH_STORAGE_KEY)
            if(item !== null ){
                dispatchCustomEvent();
                return parseJsonToAuthDto(item);
            }
            return getEmptyAuthDto();
        }
        case ACTIONS.CLEAR: {
            sessionStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(getEmptyAuthDto()))
            dispatchCustomEvent();
            return getEmptyAuthDto();
        }
        default: {
            return getEmptyAuthDto();
        }
    }
}

const dispatchCustomEvent = () => {
    console.log('event dispatched')
    window.dispatchEvent(new Event("auth_update"));
}

export const isUserLogged = () : boolean =>{
    return storeAuth(ACTIONS.GET, null).isLogged;
}

function getEmptyAuthDto () : AuthDto {
    const authDto: AuthDto = {
        isLogged: false,
    };
    return authDto;
}

function parseJsonToAuthDto (json : string): AuthDto {
    return JSON.parse(json);
}

const AUTH_STORAGE_KEY = "auth_storage"

export enum ACTIONS {
    SAVE = "SAVE",
    CLEAR = "CLEAR",
    GET = "GET",
    UPDATE = "UPDATE"
}