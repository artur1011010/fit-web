import {Button} from "@mui/material";
import React from "react";
import {Gender} from "../../dto/Gender";
import {loginUser, registerUser} from "../../services/auth";
import {RegisterRequest} from "../../dto/RegisterRequest";
import {AuthenticationRequest} from "../../dto/AuthenticationRequest";
import {AuthDto} from "../../dto/AuthDto";
import {ACTIONS, storeAuth} from "../../config/storage";
import {ClientDto} from "../../dto/ClientDto";
import {FitnessLevel} from "../../dto/FitnessLevel";
import {postClientDto} from "../../services/UserService";

export function Main() {

    const loginUser2 = () => {
        const req: AuthenticationRequest = {
            email: "sasas@gmail.com",
            password: "artur",
        };
        loginUser(req)
            .then(res => {
                const auth: AuthDto = {
                    access_token: res.access_token,
                    refresh_token: res.refresh_token,
                    isLogged: true,
                }
                storeAuth(ACTIONS.SAVE, auth);
                console.log(res);
            });
    }

    const registerUser2 = () => {
        const req: RegisterRequest = {
            "name": "dsdsd",
            "email": "sasas@gmail.com",
            "password": "artur",
            "phoneNumber": "0048 500 511 222",
            "gender": Gender.M,
            "dateOfBirth": new Date('2000-11-02')
        };
        registerUser(req)
            .then(res => {
                console.log(res);
            });
    }
    const getUserData2 = () => {
        const auth = storeAuth(ACTIONS.GET, null);
        console.log("authDto: " + JSON.stringify(auth));
    }
    const clearData = () => {
        storeAuth(ACTIONS.CLEAR, null);
    }

    const addClientProfile = () => {
        const req: ClientDto = {
            bio: "jakas biografia klienta",
            goals: "chciałbym schudnac",
            fitnessLevel: FitnessLevel.BEGINNER
        };
        postClientDto(req)
            .then(res => {
                console.log(res);
            });
    }

    const add5Trainers = () => {
        fetch('http://localhost:8081/trainer/add5', {
            method: 'POST'
        });
    }

    return (
        <div>
            <br/>
            <hr/>
            <Button variant="contained" onClick={() => registerUser2()}>Register User</Button>
            <Button variant="contained" onClick={() => loginUser2()}>Login User</Button>
            <Button variant="contained" onClick={() => getUserData2()}>Get Auth Data</Button>
            <Button variant="contained" onClick={() => clearData()}>Clear data</Button>
            <br/>
            <hr/>
            <Button variant="contained" onClick={() => addClientProfile()}>Add Client Profile</Button>
            <Button variant="contained" onClick={() => add5Trainers()}>Add 5 Trainers</Button>

        </div>
    )
}