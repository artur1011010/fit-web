import {
    Button,
    Container,
    FormControl,
    FormLabel,
    Link,
    MenuItem,
    Select,
    TextField,
    Typography
} from "@mui/material";
import React from "react";
import {isBlank, isEmail, isPolishPhoneNumber} from "../../../commons/Commons";
import {
    DATE_ERROR_TEXT,
    EMAIL2_ERROR_TEXT,
    EMAIL_ERROR_TEXT,
    PASSWORD2_ERROR_TEXT,
    PHONE_NUBER_ERROR_TEXT,
    STRING_EMPTY,
    USER_NAME_ERROR_TEXT
} from "../../../commons/StaticText";
import Box from "@mui/material/Box";
import {RegisterRequest} from "../../../dto/RegisterRequest";
import {fromString, Gender} from "../../../dto/Gender";
import {registerUser} from "../../../services/AuthService";
import {AuthDto} from "../../../dto/AuthDto";
import {ACTIONS, storeAuth} from "../../../config/storage";


export function Register() {

    const [registerComplete, setRegisterComplete] = React.useState(false);

    const [emailError, setEmailError] = React.useState(false);
    const [emailErrorText, setEmailErrorText] = React.useState(STRING_EMPTY);

    const [userNameField, setUserNameField] = React.useState(STRING_EMPTY);
    const [userNameError, setUserNameError] = React.useState(false);
    const [userNameErrorText, setUserNameErrorText] = React.useState(STRING_EMPTY);

    const [phoneField, setPhoneField] = React.useState(STRING_EMPTY);
    const [phoneFieldError, setPhoneFieldError] = React.useState(false);
    const [phoneFieldErrorText, setPhoneFieldErrorText] = React.useState(STRING_EMPTY);

    const [birthDateField, setBirthDateField] = React.useState(STRING_EMPTY);
    const [dateFieldError, setDateFieldError] = React.useState(false);
    const [dateFieldErrorText, setDateFieldErrorText] = React.useState(STRING_EMPTY);

    const [emailField, setEmailField] = React.useState(STRING_EMPTY);
    const [genderField, setGenderField] = React.useState("M");

    const [passwordField, setPasswordField] = React.useState(STRING_EMPTY);
    const [password2Field, setPassword2Field] = React.useState(STRING_EMPTY);
    const [passwordError, setPasswordError] = React.useState(false);
    const [password2Error, setPassword2Error] = React.useState(false);
    const [passwordErrorText, setPasswordErrorText] = React.useState(STRING_EMPTY);
    const [password2ErrorText, setPassword2ErrorText] = React.useState(STRING_EMPTY);


    const handleSubmit = () => {
        if(!isValid()){
            return;
        }
        console.log('submit ');
        registerRequest()
        setRegisterComplete(true)
    }

    const registerRequest = () => {
        const req: RegisterRequest = {
            "name": userNameField,
            "email": emailField,
            "password": passwordField,
            "phoneNumber": phoneField,
            "gender": fromString(genderField),
            "dateOfBirth": new Date(birthDateField)
        };
        registerUser(req)
            .then(res => {
                const auth: AuthDto = {
                    access_token: res.access_token,
                    refresh_token: res.refresh_token,
                    isLogged: true,
                }
                storeAuth(ACTIONS.SAVE, auth);
                clearForm();
                console.log(res);
            })
            .catch(error => {
                console.log(error);
                clearForm();
                setEmailError(true);
                setEmailErrorText(EMAIL2_ERROR_TEXT);
            })
    }

    const clearForm = () => {
        setUserNameError(false);
        setUserNameErrorText(STRING_EMPTY)
        setEmailError(false);
        setEmailErrorText(STRING_EMPTY)
        setPhoneFieldError(false);
        setPhoneFieldErrorText(STRING_EMPTY)
        setPasswordError(false)
        setPasswordErrorText(STRING_EMPTY)
        setPassword2Error(false)
        setPassword2ErrorText(STRING_EMPTY)
    }

    const isValid = (): boolean => {
        let isValid: boolean = true;
        if (isBlank(userNameField)) {
            setUserNameError(true);
            setUserNameErrorText(USER_NAME_ERROR_TEXT)
            isValid = false;
        } else {
            setUserNameError(false);
            setUserNameErrorText(STRING_EMPTY)
        }
        if (!isEmail(emailField)) {
            setEmailError(true);
            setEmailErrorText(EMAIL_ERROR_TEXT)
            isValid = false;
        } else {
            setEmailError(false);
            setEmailErrorText(STRING_EMPTY)
        }
        if (!isPolishPhoneNumber(phoneField)) {
            setPhoneFieldError(true);
            setPhoneFieldErrorText(PHONE_NUBER_ERROR_TEXT)
            isValid = false;
        } else {
            setPhoneFieldError(false);
            setPhoneFieldErrorText(STRING_EMPTY)
        }
        if (isBlank(password2Field) || isBlank(passwordField)) {
            setPasswordError(true)
            setPassword2Error(true)
            setPasswordErrorText(PASSWORD2_ERROR_TEXT)
            setPassword2ErrorText(PASSWORD2_ERROR_TEXT)
            isValid = false;
        } else {
            check2PasswordFields(password2Field)
        }
        if(isBlank(birthDateField)){
            setDateFieldError(true)
            setDateFieldErrorText(DATE_ERROR_TEXT)
            isValid = false;
        }else{
            setDateFieldError(false)
            setDateFieldErrorText(STRING_EMPTY)
        }
        return isValid;
    }


    const check2PasswordFields = (password2FieldInput: string) => {
        if (passwordField !== password2FieldInput) {
            setPasswordError(true)
            setPassword2Error(true)
            setPasswordErrorText(PASSWORD2_ERROR_TEXT)
            setPassword2ErrorText(PASSWORD2_ERROR_TEXT)
        } else {
            setPasswordError(false)
            setPassword2Error(false)
            setPasswordErrorText(STRING_EMPTY)
            setPassword2ErrorText(STRING_EMPTY)
        }
    }

    const handleTextInputChange = (event: any) => {
        let va1ue = event.target.value;
        let field = event.target.id;

        switch (field) {
            case 'date-field':
                setBirthDateField(va1ue)
                break;
            case 'user-name-field':
                setUserNameField(va1ue)
                setUserNameError(false);
                setUserNameErrorText(STRING_EMPTY)
                break;
            case 'email-field':
                setEmailField(va1ue)
                if (isEmail(emailField)) {
                    setEmailError(false);
                    setEmailErrorText(STRING_EMPTY);
                } else {
                    setEmailError(true);
                    setEmailErrorText(EMAIL_ERROR_TEXT);
                }
                break;
            case 'phone-field':
                if (!isPolishPhoneNumber(va1ue)) {
                    setPhoneFieldError(true);
                    setPhoneFieldErrorText(PHONE_NUBER_ERROR_TEXT)
                } else {
                    setPhoneFieldError(false);
                    setPhoneFieldErrorText(STRING_EMPTY)
                }
                setPhoneField(va1ue)
                break;
            case 'password-field':
                setPasswordField(va1ue)
                break;
            case 'password2-field':
                setPassword2Field(va1ue)
                check2PasswordFields(va1ue)
                break;
        }
    }

    const handleSelectInputChange = (event: any) => {
        setGenderField(event.target.value)
        console.log('event.target.value: ' + event.target.value)
    }

    return (
        <Container sx={{display: "flex", justifyContent: "center", alignItems: "center"}}>
            {!registerComplete ?
                <FormControl sx={{width: '100%', p: 5}}>
                    <Typography variant='h4' my={3}>Formularz rejestracji</Typography>
                    <TextField label='Nazwa użytkownika' id='user-name-field' type='text' margin="normal"
                               helperText={userNameErrorText} error={userNameError}
                               onChange={handleTextInputChange}></TextField>

                    <TextField label='Adres email' id='email-field' type='email' margin="normal"
                               helperText={emailErrorText} error={emailError}
                               onChange={handleTextInputChange}></TextField>

                    <TextField label='Numer telefonu' id='phone-field' type='text' margin="normal"
                               helperText={phoneFieldErrorText} error={phoneFieldError}
                               onChange={handleTextInputChange}></TextField>

                    <FormLabel sx={{mt: 2}} htmlFor='gender-label'>Płeć:</FormLabel>
                    <Select
                        labelId="gender-label"
                        id="gender-select"
                        variant='outlined'
                        defaultValue={'M'}
                        onChange={handleSelectInputChange}
                    >
                        <MenuItem value={'M'}>Mężczyzna</MenuItem>
                        <MenuItem value={'F'}>Kobieta</MenuItem>
                    </Select>

                    <FormLabel sx={{mt: 2}} htmlFor='date-field'>Data urodzenia:</FormLabel>
                    <TextField id='date-field' type='date' margin="normal"
                               helperText={dateFieldErrorText} error={dateFieldError}
                               onChange={handleTextInputChange}></TextField>

                    <TextField label='Hasło' id='password-field' type='password' margin="normal"
                               helperText={passwordErrorText} error={passwordError}
                               onChange={handleTextInputChange}></TextField>

                    <TextField label='Powtórz hasło' id='password2-field' type='password' margin="normal"
                               helperText={password2ErrorText} error={password2Error}
                               onChange={handleTextInputChange}></TextField>

                    <Button onClick={() => handleSubmit()} variant="contained">Zarejestruj</Button>
                </FormControl>
                :
                <Box>
                    <Typography variant='h6' color='green' my={3}>Udało się zarejestrować użytkownika - jesteś już zalogowany</Typography>
                    <Link href="/" underline="hover">
                        {'przejdź do strony głównej'}
                    </Link>
                </Box>}
        </Container>
    )
}