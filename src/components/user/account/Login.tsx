import {Button, Container, FormControl, FormLabel, MenuItem, Select, TextField, Typography} from "@mui/material";
import UserDataPanel from "./UserDataPanel";
import React from "react";
import {AuthenticationRequest} from "../../../dto/AuthenticationRequest";

export function Login() {

    const [state, setState] = React.useState();


    let passwordField: string = '';
    let emailField: string = '';
    const handleSubmit = () => {
        console.log('submit: email=' + emailField + ', password=' + passwordField);
    }

    const handleTextInputChange = (event: any) => {
        let va1ue = event.target.value;
        let field = event.target.id;
        switch (field) {
            case 'email-field':
                emailField = va1ue
                break;
            case 'password-field':
                passwordField = va1ue
                break;
        }
    }

    return (
        <Container sx={{display: "flex", justifyContent: "center", alignItems: "center"}}>
            <FormControl sx={{width: '100%', p: 2}}>

                <FormLabel htmlFor='email-field'>Adres email</FormLabel>
                <TextField id='email-field' type='email' margin="normal"
                           onChange={handleTextInputChange}></TextField>

                <FormLabel htmlFor='password-field'>Hasło</FormLabel>
                <TextField id='password-field' type='password' margin="normal"
                           onChange={handleTextInputChange}></TextField>

                <Button onClick={() => handleSubmit()} variant="contained">Zaloguj</Button>
            </FormControl>
        </Container>
    )
}