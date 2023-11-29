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
import * as url from "url";
import {ACTIONS, storeAuth} from "../../../config/storage";
import {getPolishName} from "../../../dto/Gender";
import {isBlank} from "../../../commons/FieldValidator";

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

export default function ClientDataProfileView() {
    const [clientData, setClientData] = useState(null);
    const [clientDataReady, setClientDataReady] = useState(false);
    const url = 'http://localhost:8081/user/me/client';
    const getUserData = () => {
        const auth = storeAuth(ACTIONS.GET, null);
        return fetch(url, {
            headers: {Authorization: `Bearer ${auth.access_token}`}
        })
            .then((res) => {
                if (res !== null && res !== undefined) {
                    setClientDataReady(true)
                    return res.json();
                } else {
                    console.log("res puste: " + res)
                }
            })
            .then((d) => {
                setClientData(d)
            }).catch(error => {
                console.log(error)
            })
    }

    useEffect(() => {
        getUserData();
    }, []);


    return (
        <Box sx={{flexGrow: 1, border: 'solid black 1px'}}>
            <Grid container spacing={2}>
                {/*<Grid item md={8}>*/}
                {/*    <ListItem>*/}
                {/*        <ListItemIcon>*/}
                {/*            <PersonIcon/>*/}
                {/*        </ListItemIcon>*/}
                {/*        <ListItemText primary='Dane o kliencie które będą widoczne dla trenerów:'/>*/}
                {/*    </ListItem>*/}
                {/*    <PersonalDataList>*/}
                {/*        <List>*/}
                {/*            <ListItem>*/}
                {/*                <ListItemText*/}
                {/*                    primary='Nazwa użytkownika'*/}
                {/*                    secondary={clientData.name}/>*/}
                {/*            </ListItem>*/}
                {/*            <ListItem>*/}
                {/*                <ListItemText*/}
                {/*                    primary='Adres email'*/}
                {/*                    secondary={clientData.email}/>*/}
                {/*            </ListItem>*/}
                {/*            <ListItem>*/}
                {/*                <ListItemText*/}
                {/*                    primary='Numer telefonu'*/}
                {/*                    secondary={clientData.phoneNumber}/>*/}
                {/*            </ListItem>*/}
                {/*            <ListItem>*/}
                {/*                <ListItemText*/}
                {/*                    primary='Płeć'*/}
                {/*                    secondary={clientData.gender !== undefined ? getPolishName(clientData.gender) : "N/A"}/>*/}
                {/*            </ListItem>*/}
                {/*        </List>*/}
                {/*    </PersonalDataList>*/}
                {/*</Grid>*/}
            </Grid>
        </Box>
    );
}