import {Button, Container, Divider} from "@mui/material";
import React from "react";
import {Gender} from "../../dto/Gender";
import {loginUser, registerUser} from "../../services/AuthService";
import {RegisterRequest} from "../../dto/RegisterRequest";
import {AuthenticationRequest} from "../../dto/AuthenticationRequest";
import {AuthDto} from "../../dto/AuthDto";
import {ACTIONS, storeAuth} from "../../config/storage";
import {ClientDto} from "../../dto/ClientDto";
import {FitnessLevel} from "../../dto/FitnessLevel";
import {postClientDto} from "../../services/UserService";
import backgroundImg from "./main-background.jpg";

const mainClass = {
    height: 'calc(100vh - 69px)',
    backgroundImage: `url(${backgroundImg})`
}

export function Admin() {

    const loginUser2 = () => {
        const req: AuthenticationRequest = {
            email: "artur.zaczek@gmail.com",
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
                //console.log(res);
            });
    }

    const registerUser2 = () => {
        const req: RegisterRequest = {
            "name": "Artur_Zaczek_Trener",
            "email": "artur.zaczek@gmail.com",
            "password": "artur",
            "phoneNumber": "0048 500 511 222",
            "gender": Gender.M,
            "dateOfBirth": new Date('2000-11-02')
        };
        registerUser(req)
            .then(res => {
                //console.log(res);
            });
    }

    const addTrainings = () => {
        fetch(`${process.env.REACT_APP_OFFER_URL}/offer/add`, {
            method: 'POST'
        });
    }

    const addClientProfile = () => {
        const req: ClientDto = {
            bio: "jakas biografia klienta",
            goals: "chciałbym schudnac",
            fitnessLevel: FitnessLevel.BEGINNER
        };
        postClientDto(req)
            .then(res => {
                //console.log(res);
            });
    }

    const add5Trainers = () => {
        fetch(`${process.env.REACT_APP_USER_URL}/trainer/test/add`, {
            method: 'POST'
        });
    }

    return (
        <div style={mainClass}>
            <Container
                sx={{display: "flex", flexDirection: 'column', justifyContent: "center", alignItems: "center", py: 4}}>
                <Button variant="contained" onClick={() => registerUser2()} sx={{my: 2, width: '200px'}}>Rejestracja
                    usera</Button>
                <Button variant="contained" onClick={() => loginUser2()} sx={{my: 2, width: '200px'}}>Logowanie</Button>
                <Button variant="contained" onClick={() => addClientProfile()} sx={{my: 2, width: '200px'}}>Dodanie
                    profilu klienta</Button>
                <Button variant="contained" onClick={() => add5Trainers()} sx={{my: 2, width: '200px'}}>dodanie 5
                    trenerów</Button>
                <Button variant="contained" onClick={() => addTrainings()} sx={{my: 2, width: '200px'}}>dodanie
                    treningów</Button>
            </Container>
        </div>
    )
}