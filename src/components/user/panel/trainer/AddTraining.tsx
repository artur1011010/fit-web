import React from "react";
import {
    Typography,
    Grid,
    Box,
    FormControl,
    TextField,
    FormLabel,
    Select,
    MenuItem,
    Button,
    ListItemIcon
} from "@mui/material";
import {DateTimePicker} from '@mui/x-date-pickers/DateTimePicker';
import {STRING_EMPTY} from "../../../../commons/StaticText";
import {ACTIONS, storeAuth} from "../../../../config/storage";
import {OfferDto} from "../../../../dto/OfferDto";
import {isBlank} from "../../../../commons/Commons";
import ListItem from "@mui/material/ListItem";
import SportsBasketballIcon from '@mui/icons-material/SportsBasketball';
import ListItemText from "@mui/material/ListItemText";

export function AddTraining() {

    const [confirmation, setConfirmation] = React.useState(false);

    const [titleField, setTitleField] = React.useState(STRING_EMPTY);
    const [descField, setDescFiled] = React.useState(STRING_EMPTY);
    const [addressField, setAddressField] = React.useState(STRING_EMPTY);
    const [imgField, setImgField] = React.useState(0);
    const [dateTimeField, setDateTimeField] = React.useState(new Date());
    const [durationFiled, setDurationField] = React.useState(1);

    const [errorMessage, setErrorMessage] = React.useState(false);


    const addTraining = () => {
        const req: OfferDto = {
            "title": titleField,
            "description": descField,
            "address": addressField,
            "photo": imgField,
            "startTime": dateTimeField,
            "duration": durationFiled
        };
        console.log("req:\n" + req)
        addTrainingRequest(req);
    }

    const addTrainingRequest = async (request: OfferDto) => {
        const auth = storeAuth(ACTIONS.GET, null);
        const response = await fetch('http://localhost:8083/offer', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${auth.access_token}`
            },
            body: JSON.stringify(request),
        });
        if (response.status === 200) {
            setConfirmation(true)
            clearForm();
        } else {
            throw new Error(await response.text());
        }
    };

    const clearForm = () => {
        setTitleField(STRING_EMPTY)
        setDescFiled(STRING_EMPTY)
        setAddressField(STRING_EMPTY)
        setImgField(0)
        setDurationField(1)
        setDateTimeField(new Date())
    }

    const isValid = (): boolean => {
        if (isBlank(titleField)) {
            setErrorMessage(true);
            return false;
        } else {
            setErrorMessage(false);
        }
        if (isBlank(descField)) {
            setErrorMessage(true);
            return false;
        } else {
            setErrorMessage(false);
        }
        if (isBlank(addressField)) {
            setErrorMessage(true);
            return false;
        } else {
            setErrorMessage(false);
        }
        setErrorMessage(false);
        return true;
    }

    const handleTextInputChange = (event: any) => {
        let va1ue = event.target.value;
        let field = event.target.id;
        console.log(field + " " + va1ue)

        switch (field) {
            case 'title-field':
                setTitleField(va1ue)
                break;
            case 'desc-field':
                setDescFiled(va1ue)
                break;
            case 'address-field':
                setAddressField(va1ue)
                break;
        }
    }

    const handleSubmit = () => {
        if (!isValid()) {
            return;
        }
        addTraining();
    }
    const handleSelectInputChange = (event: any) => {
        setImgField(event.target.value)
    }
    const handleDateTimeChange = (event: any) => {
        const date = new Date(event);
        console.log(date);
        setDateTimeField(date)
    }

    const handleDurationChange = (event: any) => {
        setDurationField(event.target.value);
    }

    const addTrainingConfirmation = () => {
        return (
            <Box sx={{flexGrow: 1, border: 'solid black 2px', borderRadius: '3px', padding: '20px', mt: 1}}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography> Trening dodany</Typography>
                        <Button onClick={() => setConfirmation(false)} variant="contained">Dodaj następny</Button>
                    </Grid>
                </Grid>
            </Box>
        )
    }

    const renderForm = () => {
        return (
            <Box sx={{flexGrow: 1, border: 'solid black 2px', borderRadius: '3px', padding: '20px', mt: 1}}>

                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <ListItem>
                            <ListItemIcon>
                                <SportsBasketballIcon/>
                            </ListItemIcon>
                            <ListItemText primary='Formularz dodawania nowego treningu:'/>
                        </ListItem>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl sx={{width: '100%', p: 2}}>
                            {errorMessage ? <Typography variant='body2' sx={{color: 'red'}} my={1}>Uzupełnij wszystkie
                                pola!</Typography> : null}
                            <TextField label='Tytuł - wyświetlana nazwa dla treningu' id='title-field' type='text'
                                       margin="normal"
                                       onChange={handleTextInputChange}
                                       inputProps={{maxLength: 255}}></TextField>

                            <TextField multiline rows={4} label='Opis treningu' id='desc-field' type='text'
                                       margin="normal"
                                       onChange={handleTextInputChange} inputProps={{maxLength: 8000}}></TextField>

                            <TextField label='Adres' type='text' margin="normal" id='address-field'
                                       onChange={handleTextInputChange}></TextField>

                            <FormLabel sx={{my: 1}} htmlFor='photo-label'>Wybierz zdjęcie</FormLabel>
                            <Select
                                labelId="photo-label"
                                id="photo-select"
                                variant='outlined'
                                onChange={handleSelectInputChange}
                            >
                                <MenuItem value={1}>siłownia 1</MenuItem>
                                <MenuItem value={2}>siłownia 2</MenuItem>
                                <MenuItem value={3}>siłownia 3</MenuItem>
                                <MenuItem value={4}>siłownia 4</MenuItem>
                                <MenuItem value={5}>rowerek</MenuItem>
                                <MenuItem value={6}>boks</MenuItem>
                                <MenuItem value={7}>basen</MenuItem>
                            </Select>

                            <FormLabel sx={{mt: 1}} htmlFor='date-field'></FormLabel>
                            <DateTimePicker label='Data i godzina'
                                            onChange={handleDateTimeChange}></DateTimePicker>

                            <TextField id='date-field' type='number' margin="normal"
                                       label='Czas trwania treningu w minutach'
                                       onChange={handleDurationChange}></TextField>

                            <Button onClick={() => handleSubmit()} variant="contained">Dodaj trening</Button>
                        </FormControl>
                    </Grid>
                </Grid>
            </Box>
        )
    }

    return (
        <>
            {confirmation ? addTrainingConfirmation() : renderForm()}
        </>
    )
}