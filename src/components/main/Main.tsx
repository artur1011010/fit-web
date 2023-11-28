import {Button, Typography} from "@mui/material";
import React from "react";
import store, {RootState} from "../../config/store";
import {useSelector} from "react-redux";
import {Gender} from "../../dto/Gender";
import {loginUser, registerUser} from "../../services/auth";
import {RegisterRequest} from "../../dto/RegisterRequest";
import {AuthenticationRequest} from "../../dto/AuthenticationRequest";
import {AuthDto} from "../../dto/AuthDto";
import {ACTIONS, storeAuth} from "../../config/storage";

export function Main() {

    const [count, setCount] = React.useState<number>(0);
    const selectUser = (state: RootState) => state.user;
    const userDto = useSelector(selectUser)

    const selectAuth = (state: RootState) => state.auth;
    const authDto = useSelector(selectAuth)

    const onClickFun = () => {
        console.log("onClickFun")
        setCount(count + 1);
    }
    const userDtoFromRedux = () => {
        console.log(userDto)
    }

    const setUserDto = () => {
        store.dispatch({
            type: "SET_USER",
            payload: {
                id: 1,
                name: "Jan Kowalski",
                email: "email@gmail.com",
                phoneNumber: "2255555",
                gender: Gender.M,
                dateOfBirth: new Date("1990-01-01"),
                trainer: null,
                client: null,
            },
        });
    }

    const loginUser1 = () => {
        const req: AuthenticationRequest = {
            email: "ddsdsdsd@gmail.com",
            password: "artur",
        };
        loginUser(req)
            .then(res => {
                store.dispatch({
                    type: "SET_AUTH",
                    payload: {
                        access_token : res.access_token,
                        refresh_token : res.refresh_token,
                        isLogged: true
                    },
                });
                console.log(res);
            });
    }

    const registerUser1 = () => {
        const req: RegisterRequest = {
            name: "artur",
            email: "ddsdsdsd@gmail.com",
            password: "artur",
        };
        registerUser(req)
            .then(res => {
                console.log(res);
            });
    }
    const getUserData1 = () => {
        console.log("authDto: " + JSON.stringify(authDto));
    }

    const loginUser2 = () => {
        const req: AuthenticationRequest = {
            email: "ddsdsdsd@gmail.com",
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
            name: "artur",
            email: "ddsdsdsd@gmail.com",
            password: "artur",
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

    return (
        <div>
            <Typography variant='h4'>Main</Typography>

            <Button variant="contained" onClick={() => onClickFun()}>Increment</Button>
            <Button variant="contained" onClick={() => userDtoFromRedux()}>Get UserDto</Button>
            <Button variant="contained" onClick={() => setUserDto()}>Set User Dto</Button>

            <br/>
            <hr/>
            <Button variant="contained" onClick={() => registerUser1()}>Register User</Button>
            <Button variant="contained" onClick={() => loginUser1()}>Login User</Button>
            <Button variant="contained" onClick={() => getUserData1()}>Get Auth Data</Button>

            <br/>
            <hr/>
            <Button variant="contained" onClick={() => registerUser2()}>Register User</Button>
            <Button variant="contained" onClick={() => loginUser2()}>Login User</Button>
            <Button variant="contained" onClick={() => getUserData2()}>Get Auth Data</Button>
            <Button variant="contained" onClick={() => clearData()}>Clear data</Button>

            <Typography sx={{mt: '45px'}} variant='h4'>{count}</Typography>
        </div>
    )
}