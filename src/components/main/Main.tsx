import {Button, Typography} from "@mui/material";
import React from "react";
import store, {RootState} from "../../config/store";
import {useSelector} from "react-redux";
import {UserDto} from "../../dto/UserDto";
import {Gender} from "../../dto/Gender";

export function Main() {

    const [count, setCount] = React.useState<number>(0);
    const selectUser = (state: RootState) => state.user;
    const userDto = useSelector(selectUser)

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

    return (
        <div>
            <Typography variant='h4'>Main</Typography>
            <Button variant="contained" onClick={() => onClickFun()}>Increment</Button>
            <Button variant="contained" onClick={() => userDtoFromRedux()}>Get UserDto From Redux</Button>
            <Button variant="contained" onClick={() => setUserDto()}>Set User Dto</Button>
            <Typography sx={{mt: '45px'}} variant='h4'>{count}</Typography>
        </div>
    )
}