import * as React from 'react';
import {styled} from '@mui/material/styles';
import Box from '@mui/material/Box';
import {
    ListItemIcon,
    Switch,
} from "@mui/material";
import {useEffect, useState} from "react";
import {ACTIONS, storeAuth} from "../../../config/storage";
import Grid from "@mui/material/Grid";
import ListItem from "@mui/material/ListItem";
import SportsIcon from '@mui/icons-material/Sports';
import ListItemText from "@mui/material/ListItemText";
import List from "@mui/material/List";
import CustomTextField from "../CustomTextField";
import {STRING_EMPTY} from "../../../commons/StaticText";
import {ClientDto} from "../../../dto/ClientDto";
import {parseFromString} from "../../../dto/FitnessLevel";
import {postClientDto, postTrainerDto} from "../../../services/UserService";
import {TrainerDto} from "../../../dto/TrainerDto";

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
    const url = 'http://localhost:8081/user/trainer';

    const getTrainerData = () => {
        const auth = storeAuth(ACTIONS.GET, null);
        return fetch(url, {
            headers: {Authorization: `Bearer ${auth.access_token}`}
        })
            .then((res) => res.json())
            .then((d) => {
                setTrainerData(d)
            });
    }

    useEffect(() => {
        getTrainerData();
    }, []);

    const handleDescChange = (value: string) => {
        console.log("handleDescChange: " + value)
        const req: TrainerDto = {
            description: value,
            experience: Number.parseInt(getExperience()),
            specializations: getSpecializations(),
            isProfileActive: getIsActive()
        };
        postTrainerDto(req)
            .then(() => getTrainerData())
    }

    const handleExpChange = (value: string) => {
        console.log('handleExpChange ' + value)
    }
    const handleSpecChange = (value: string) => {
        console.log('handleSpecChange ' + value)
        const req: TrainerDto = {
            description: getDescription(),
            experience: Number.parseInt(getExperience()),
            specializations: value,
            isProfileActive: getIsActive()
        };
        postTrainerDto(req)
            .then(() => getTrainerData())
    }

    const getDescription = (): string => {
        if (trainerData !== null && trainerData !== undefined) {
            // @ts-ignore
            if (trainerData.description !== null) {
                // @ts-ignore
                return trainerData.description;
            }
        }
        return STRING_EMPTY;
    }

    const getExperience = (): string => {
        if (trainerData !== null && trainerData !== undefined) {
            // @ts-ignore
            if (trainerData.experience !== null) {
                // @ts-ignore
                return trainerData.experience;
            }
        }
        return STRING_EMPTY;
    }

    const getSpecializations = (): string => {
        if (trainerData !== null && trainerData !== undefined) {
            // @ts-ignore
            if (trainerData.specializations !== null) {
                // @ts-ignore
                return trainerData.specializations;
            }
        }
        return STRING_EMPTY;
    }

    const getIsActive = (): boolean => {
        if (trainerData !== null && trainerData !== undefined) {
            // @ts-ignore
            if (trainerData.isProfileActive !== null) {
                // @ts-ignore
                return trainerData.isProfileActive;
            }
        }
        return false;
    }

    return (
        <Box sx={{flexGrow: 1, border: 'solid black 1px', borderRadius: '10px', padding: '20px'}}>
            <Grid container spacing={2}>
                <Grid item md={12}>
                    <ListItem>
                        <ListItemIcon>
                            <SportsIcon/>
                        </ListItemIcon>
                        <ListItemText primary='Dane trenera:'/>
                    </ListItem>
                    <PersonalDataList>
                        <List>
                            <ListItem>
                                <CustomTextField label='Opis' value={getDescription()} handleChange={handleDescChange}
                                                 editable={true}></CustomTextField>
                            </ListItem>
                            <ListItem>
                                <CustomTextField label='Doświadczenie w miesiacach' value={getExperience()}
                                                 handleChange={handleExpChange}
                                                 editable={true}></CustomTextField>
                            </ListItem>
                            <ListItem>
                                <CustomTextField label='Specjalizacje' value={getSpecializations()}
                                                 handleChange={handleSpecChange} editable={true}></CustomTextField>
                            </ListItem>
                            {getIsActive() ?
                                <ListItem>
                                    <Switch defaultChecked/>
                                </ListItem>
                                :
                                <ListItem>
                                    <Switch/>
                                </ListItem>
                            }
                        </List>
                    </PersonalDataList>
                </Grid>
            </Grid>
        </Box>
    )

}