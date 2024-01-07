import * as React from 'react';
import {styled} from '@mui/material/styles';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';
import PersonIcon from '@mui/icons-material/Person';
import {ListItemIcon} from "@mui/material";
import {getEmptyUserDto} from "../../../dto/UserDto";
import {useEffect, useState} from "react";
import {ACTIONS, storeAuth} from "../../../config/storage";
import {getPolishName} from "../../../dto/Gender";
import CustomTextField from "../CustomTextField";

function generate(element: React.ReactElement) {
    return [0, 1, 2, 4, 5].map((value) =>
        React.cloneElement(element, {
            key: value,
        }),
    );
}

const PersonalDataList = styled('div')(({theme}) => ({
    backgroundColor: theme.palette.background.paper,
}));

export default function UserDataProfileView() {
    const [userData, setUserData] = useState(getEmptyUserDto());
    const url = 'http://localhost:8081/user/me';
    const getUserData = () => {
        const auth = storeAuth(ACTIONS.GET, null);
        return fetch(url, {
            headers: {Authorization: `Bearer ${auth.access_token}`}
        })
            .then((res) => res.json())
            .then((d) => {
                setUserData(d)
            });
    }

    useEffect(() => {
        getUserData();
    }, []);

    const handleUserNameChange = (value: string) =>{
        console.log(`handleUserNameChange ${value}`)
    }

    const handlePhoneNumberChange = (value: string) =>{
        console.log(`handlePhoneNumberChange ${value}`)
    }



    return (
        <Box sx={{flexGrow: 1, border: 'solid black 2px', borderRadius: '3px', padding: '20px'}}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <ListItem>
                        <ListItemIcon>
                            <PersonIcon/>
                        </ListItemIcon>
                        <ListItemText primary='Dane profilowe:'/>
                    </ListItem>
                    <PersonalDataList>
                        <List>
                            <ListItem>
                                <CustomTextField label='Adres email' value={userData.email} editable={false}></CustomTextField>
                            </ListItem>
                            <ListItem>
                                <CustomTextField label='Nazwa użytkownika' value={userData.name} handleChange={handleUserNameChange} editable={false}></CustomTextField>
                            </ListItem>
                            <ListItem>
                                <CustomTextField label='Numer telefonu' value={userData.phoneNumber} handleChange={handlePhoneNumberChange} editable={false}></CustomTextField>
                            </ListItem>
                            <ListItem>
                                <CustomTextField label='Płeć' value={userData.gender !== undefined ? getPolishName(userData.gender) : "N/A"} handleChange={handlePhoneNumberChange} editable={false}></CustomTextField>
                            </ListItem>
                        </List>
                    </PersonalDataList>
                </Grid>
            </Grid>
        </Box>
    );
}