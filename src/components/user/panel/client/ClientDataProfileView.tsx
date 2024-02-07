import * as React from 'react';
import {styled} from '@mui/material/styles';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';
import AssignmentIcon from '@mui/icons-material/Assignment';
import {ListItemIcon} from "@mui/material";
import {useEffect, useState} from "react";
import {ACTIONS, storeAuth} from "../../../../config/storage";
import CustomTextField from "../../CustomTextField";
import {STRING_EMPTY} from "../../../../commons/StaticText";
import {postClientDto} from "../../../../services/UserService";
import {ClientDto} from "../../../../dto/ClientDto";
import {parseFromString} from "../../../../dto/FitnessLevel";
import CustomSelectField from "../../CustomSelectField";
import {MyTrainingList} from "./MyTrainingList";


const PersonalDataList = styled('div')(({theme}) => ({
    backgroundColor: theme.palette.background.paper,
}));

export default function ClientDataProfileView() {
    const [clientData, setClientData] = useState(null);
    const url = `${process.env.REACT_APP_USER_URL}/user/client`;

    const getUserData = () => {
        const auth = storeAuth(ACTIONS.GET, null);
        return fetch(url, {
            headers: {Authorization: `Bearer ${auth.access_token}`}
        })
            .then((res) => res.json())
            .then((d) => {
                setClientData(d)
            });
    }

    useEffect(() => {
        getUserData();
    }, []);

    const getBio = (): string => {
        if (clientData !== null && clientData !== undefined) {
            // @ts-ignore
            if (clientData.bio !== null) {
                // @ts-ignore
                return clientData.bio;
            }
        }
        return STRING_EMPTY;
    }

    const getFitnessLevel = (): string => {
        if (clientData !== null && clientData !== undefined) {
            // @ts-ignore
            if (clientData.fitnessLevel !== null) {
                // @ts-ignore
                return clientData.fitnessLevel;
            }
        }
        return STRING_EMPTY;
    }

    const getGoals = (): string => {
        if (clientData !== null && clientData !== undefined) {
            // @ts-ignore
            if (clientData.goals !== null) {
                // @ts-ignore
                return clientData.goals;
            }
        }
        return STRING_EMPTY;
    }

    const handleBioChange = (value: string) => {
        console.log("zmiana bio: " + value)
        const req: ClientDto = {
            bio: value,
            goals: getGoals(),
            fitnessLevel: parseFromString(getFitnessLevel()),
        };
        postClientDto(req)
            .then(() => getUserData())
    }

    const handleGoalsChange = (value: string) => {
        console.log("zmiana goals: " + value)
        const req: ClientDto = {
            bio: getBio(),
            goals: value,
            fitnessLevel: parseFromString(getFitnessLevel()),
        };
        postClientDto(req)
            .then(() => getUserData())
    }

    const handleFitnessLevelChange = (value: string) => {
        console.log("zmiana fitnessLevel: " + value)
        const req: ClientDto = {
            bio: getBio(),
            goals: getGoals(),
            fitnessLevel: parseFromString(value),
        };
        postClientDto(req)
            .then(() => getUserData())
    }


    return (
        <>
            <Box sx={{flexGrow: 1, border: 'solid black 2px', borderRadius: '3px', padding: '20px'}}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <ListItem>
                            <ListItemIcon>
                                <AssignmentIcon/>
                            </ListItemIcon>
                            <ListItemText primary='Dane klienta:'/>
                        </ListItem>
                        <PersonalDataList>
                            <List>
                                <ListItem>
                                    <CustomTextField multiline={true} label='Biografia' value={getBio()}
                                                     handleChange={handleBioChange}
                                                     editable={true}></CustomTextField>
                                </ListItem>
                                <ListItem>
                                    <CustomTextField label='Moje cele' value={getGoals()}
                                                     handleChange={handleGoalsChange}
                                                     editable={true}></CustomTextField>
                                </ListItem>
                                <ListItem>
                                    <CustomSelectField label='Poziom doświadczenia' value={getFitnessLevel()}
                                                       handleChange={handleFitnessLevelChange}
                                                       editable={true}></CustomSelectField>
                                </ListItem>
                            </List>
                        </PersonalDataList>
                    </Grid>
                </Grid>
            </Box>
            <Box sx={{flexGrow: 1, border: 'solid black 2px', borderRadius: '3px', padding: '20px', mt:1}}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <MyTrainingList></MyTrainingList>
                    </Grid>
                </Grid>
            </Box>
        </>
    );
}