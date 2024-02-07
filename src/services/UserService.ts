import {ClientDto} from "../dto/ClientDto";
import {ACTIONS, storeAuth} from "../config/storage";
import {TrainerDto} from "../dto/TrainerDto";

export const postClientDto = async (request: ClientDto) => {
    const auth = storeAuth(ACTIONS.GET, null);
    const response = await fetch(`${process.env.REACT_APP_USER_URL}/user/client`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${auth.access_token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(request),
    });
    if (response.status === 200) {
        console.log("POST /user/client + ok")
    } else {
        return await response.text();
    }
};

export const postTrainerDto = async (request: TrainerDto) => {
    const auth = storeAuth(ACTIONS.GET, null);
    const response = await fetch(`${process.env.REACT_APP_USER_URL}/user/trainer`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${auth.access_token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(request),
    });
    if (response.status === 200) {
        console.log("POST /user/trainer + ok")
    } else {
        return await response.text();
    }
};

export const getClientDto = async () => {
    const auth = storeAuth(ACTIONS.GET, null);
    const response = await fetch(`${process.env.REACT_APP_USER_URL}/user/client`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${auth.access_token}`,
        },
    });
    if (response.status === 200) {
        console.log("POST /user/client + ok")
        return await response.json();
    } else {
        return await response.text();
    }
};