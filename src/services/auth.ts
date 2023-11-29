import {RegisterRequest} from "../dto/RegisterRequest";
import {AuthenticationRequest} from "../dto/AuthenticationRequest";


export const registerUser = async (registerRequest : RegisterRequest) => {
    const response = await fetch('http://localhost:8081/api/v1/auth/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(registerRequest),
    });
    if (response.status === 200) {
        return response.json();
    } else {
        return response.json();
    }
};


export const loginUser = async (authenticationRequest: AuthenticationRequest) => {
    const response = await fetch('http://localhost:8081/api/v1/auth/authenticate', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(authenticationRequest),
    });
    if (response.status === 200) {
        return response.json();
    } else {
        throw new Error(await response.text());
    }
};