import * as React from 'react';
import {styled} from '@mui/material/styles';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';
import PersonIcon from '@mui/icons-material/Person';
import {ListItemIcon} from "@mui/material";
import {useEffect, useState} from "react";
import {ACTIONS, storeAuth} from "../../../config/storage";

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

export default function TrainerDataProfileView() {
    const [trainerData, setTrainerData] = useState(null);
    const url = 'http://localhost:8081/user/me/trainer';
    const getTrainerData = () => {
        const auth = storeAuth(ACTIONS.GET, null);
        return fetch(url, {
            headers: {Authorization: `Bearer ${auth.access_token}`}
        })
            .then((res) => res.json())
            .then((d) => {
                console.log(d)
                setTrainerData(d)
            });
    }

    useEffect(() => {
        getTrainerData();
    }, []);

    const renderTrainerForm = () => {
        return (
            <p>formularz dla trenera tu</p>
        )
    }


    const renderTrainerProfileView = () => {
        return (
            <Box sx={{flexGrow: 1, border: 'solid black 1px'}}>
                {/*<Grid container spacing={2}>*/}
                {/*    <Grid item md={8}>*/}
                {/*        <ListItem>*/}
                {/*            <ListItemIcon>*/}
                {/*                <PersonIcon/>*/}
                {/*            </ListItemIcon>*/}
                {/*            <ListItemText primary='Profil trenerski:'/>*/}
                {/*        </ListItem>*/}
                {/*        <PersonalDataList>*/}
                {/*            <List>*/}
                {/*                <ListItem>*/}
                {/*                    <ListItemText*/}
                {/*                        primary='Opis trenera'*/}
                {/*                        secondary={trainerData === null? '' : trainerData.description}/>*/}
                {/*                </ListItem>*/}
                {/*                <ListItem>*/}
                {/*                    <ListItemText*/}
                {/*                        primary='Opis trenera'*/}
                {/*                        secondary={trainerData.description}/>*/}
                {/*                </ListItem>*/}
                {/*                <ListItem>*/}
                {/*                    <ListItemText*/}
                {/*                        primary='Doświadczenie w miesiącach'*/}
                {/*                        secondary={trainerData.experience}/>*/}
                {/*                </ListItem>*/}
                {/*                <ListItem>*/}
                {/*                    <ListItemText*/}
                {/*                        primary='Specjalizacje trenera'*/}
                {/*                        secondary={trainerData.specializations}/>*/}
                {/*                </ListItem>*/}
                {/*                <ListItem>*/}
                {/*                    <ListItemText*/}
                {/*                        primary='Czy profil jest aktywny i widoczny'*/}
                {/*                        secondary={trainerData.isProfileActive ? "Tak" : "Nie"}/>*/}
                {/*                </ListItem>*/}
                {/*            </List>*/}
                {/*        </PersonalDataList>*/}
                {/*    </Grid>*/}
                {/*</Grid>*/}
                <p>profile</p>
            </Box>
        );
    }

    return (
        trainerData != null ? renderTrainerProfileView() : renderTrainerForm())
        ;
}