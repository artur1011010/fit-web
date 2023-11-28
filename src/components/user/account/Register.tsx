import {Button, Container, FormControl, FormLabel, MenuItem, Select, TextField, Typography} from "@mui/material";
import UserDataPanel from "./UserDataPanel";
import React from "react";


export function Register() {
    let valueRef: string = '';
    const handleSubmit = () => {
        console.log('submit ' + valueRef);
    }

    const handleTextInputChange = (event: any) => {
        let va1ue = event.target.value;
        let field = event.target.id;

        switch (field) {
            case 'date-field':
                console.log('date-field: ' + va1ue)
                break;
            case 'user-name-field':
                console.log('user-name-field: ' + va1ue)
                break;
            case 'email-field':
                console.log('email-field: ' + va1ue)
                break;
            case 'phone-field':
                console.log('phone-field: ' + va1ue)
                break;
            case 'password-field':
                console.log('password-field: ' + va1ue)
                break;
        }
    }

    const handleSelectInputChange = (event: any) => {
        console.log('event.target.value: ' + event.target.value)
        console.log('event.target: ' + event.target.id)
    }


    return (
        <Container sx={{display: "flex", justifyContent: "center", alignItems: "center"}}>
            <FormControl sx={{width: '100%', p: 2}}>
                <FormLabel htmlFor='user-name-field'>Nazwa użytkownika</FormLabel>
                <TextField id='user-name-field' type='text' margin="normal"
                           onChange={handleTextInputChange}></TextField>

                <FormLabel htmlFor='email-field'>Adres email</FormLabel>
                <TextField id='email-field' type='email' margin="normal"
                           onChange={handleTextInputChange}></TextField>

                <FormLabel htmlFor='phone-field'>Numer telefonu</FormLabel>
                <TextField id='phone-field' type='text' margin="normal"
                           onChange={handleTextInputChange}></TextField>

                <FormLabel id='gender-label' htmlFor='gender-select'>Płeć</FormLabel>
                <Select
                    labelId="gender-label"
                    id="gender-select"
                    label="gender-label"
                    variant='outlined'
                    defaultValue={'M'}
                    onChange={handleSelectInputChange}
                >
                    <MenuItem value={'M'}>Mężczyzna</MenuItem>
                    <MenuItem value={'F'}>Kobieta</MenuItem>
                </Select>

                <FormLabel htmlFor='date-field'>Data urodzenia</FormLabel>
                <TextField id='date-field' type='date' margin="normal"
                           onChange={handleTextInputChange}></TextField>

                <FormLabel htmlFor='password-field'>Hasło</FormLabel>
                <TextField id='password-field' type='password' margin="normal"
                           onChange={handleTextInputChange}></TextField>

                <Button onClick={() => handleSubmit()} variant="contained">Zarejestruj</Button>
            </FormControl>
        </Container>
    )
}