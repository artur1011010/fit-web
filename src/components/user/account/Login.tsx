import {Button, Container, FormControl, FormLabel, MenuItem, Select, TextField, Typography} from "@mui/material";
import React from "react";
import {AuthenticationRequest} from "../../../dto/AuthenticationRequest";
import {loginUser} from "../../../services/auth";
import {AuthDto} from "../../../dto/AuthDto";
import {ACTIONS, storeAuth} from "../../../config/storage";
import {isEmail} from "../../../commons/FieldValidator";
import {EMAIL_ERROR_TEXT, PASSWORD_ERROR_TEXT} from "../../../commons/StaticText";

export function Login() {

    const [emailError, setEmailError] = React.useState(false);
    const [passError, setPassError] = React.useState(false);
    const [error1, setError1] = React.useState('');
    const [error2, setError2] = React.useState('');
    const [passwordField, setPasswordField] = React.useState('');
    const [emailField, setEmailField] = React.useState('');

    const loginRequest = () => {
        if (!isEmail(emailField)) {
            return;
        }
        const req: AuthenticationRequest = {
            email: emailField,
            password: passwordField,
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
            })
            .catch(error => {
            setEmailError(true);
            setError1(EMAIL_ERROR_TEXT);
            setPassError(true)
            setError2(PASSWORD_ERROR_TEXT)
        })
    }
    const handleSubmit = () => {
        // isEmail()
        console.log('submit: email=' + emailField + ', password=' + passwordField);
        loginRequest();
    }

    const handleTextInputChange = (event: any) => {
        let va1ue = event.target.value;
        let field = event.target.id;
        switch (field) {
            case 'email-field':
                setEmailField(va1ue)
                if (isEmail(emailField)) {
                    setEmailError(false);
                    setError1('');
                } else {
                    setEmailError(true);
                    setError1(EMAIL_ERROR_TEXT);
                }
                break;
            case 'password-field':
                setPassError(false)
                setError2('')
                setPasswordField(va1ue)
                break;
        }
    }

    return (
        <Container sx={{display: "flex", justifyContent: "center", alignItems: "center"}}>
            <FormControl sx={{width: '100%', p: 2}}>

                <TextField label='Adres email' id='email-field' type='email' margin="normal"
                           helperText={error1} error={emailError}
                           onChange={handleTextInputChange}></TextField>

                <TextField label='Hasło' id='password-field' type='password' margin="normal"
                           error={passError}
                           helperText={error2}
                           onChange={handleTextInputChange}></TextField>

                <Button onClick={() => handleSubmit()} variant="contained">Zaloguj</Button>
            </FormControl>
        </Container>
    )
}