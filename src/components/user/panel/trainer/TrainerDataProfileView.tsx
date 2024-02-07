import * as React from 'react';
import {styled} from '@mui/material/styles';
import Box from '@mui/material/Box';
import {
    FormControlLabel,
    ListItemIcon,
    Switch, Typography,
} from "@mui/material";
import {useEffect, useState} from "react";
import {ACTIONS, storeAuth} from "../../../../config/storage";
import Grid from "@mui/material/Grid";
import ListItem from "@mui/material/ListItem";
import SportsScoreIcon from '@mui/icons-material/SportsScore';
import ListItemText from "@mui/material/ListItemText";
import List from "@mui/material/List";
import CustomTextField from "../../CustomTextField";
import {STRING_EMPTY} from "../../../../commons/StaticText";
import {postTrainerDto} from "../../../../services/UserService";
import {TrainerDto} from "../../../../dto/TrainerDto";
import CustomNumberField from "../../CustomNumberField";
import {AddTraining} from "./AddTraining";
import {TrainingList} from "./TrainingList";
import UploadForm from "./UploadForm";
import ProfilePhoto from "./ProfilePhoto";


const PersonalDataList = styled('div')(({theme}) => ({
    backgroundColor: theme.palette.background.paper,
}));

export default function TrainerDataProfileView() {


    const [trainerData, setTrainerData] = useState(null);
    const [switcherActive, setSwitcherActive] = useState(false);
    const url = `${process.env.REACT_APP_USER_URL}/user/trainer`;

    const getTrainerData = () => {
        const auth = storeAuth(ACTIONS.GET, null);
        return fetch(url, {
            headers: {Authorization: `Bearer ${auth.access_token}`}
        })
            .then((res) => res.json())
            .then((d) => {
                setTrainerData(d)
                if (d.isProfileActive) {
                    setSwitcherActive(true);
                }
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
            profileActive: getIsActive()
        };
        postTrainerDto(req)
            .then(() => getTrainerData())
    }

    const handleExpChange = (value: number) => {
        console.log('handleExpChange ' + value)
        const req: TrainerDto = {
            description: getDescription(),
            experience: value,
            specializations: getSpecializations(),
            profileActive: getIsActive()
        };
        postTrainerDto(req)
            .then(() => getTrainerData())
    }
    const handleSpecChange = (value: string) => {
        console.log('handleSpecChange ' + value)
        const req: TrainerDto = {
            description: getDescription(),
            experience: Number.parseInt(getExperience()),
            specializations: value,
            profileActive: getIsActive()
        };
        postTrainerDto(req)
            .then(() => getTrainerData())
    }

    const handleActiveChange = (active: boolean) => {
        console.log('handleActiveChange: ' + active)
        const req: TrainerDto = {
            description: getDescription(),
            experience: Number.parseInt(getExperience()),
            specializations: getSpecializations(),
            profileActive: active
        };
        console.log(req)
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

    const getEmail = (): string => {
        if (trainerData !== null && trainerData !== undefined) {
            // @ts-ignore
            if (trainerData.email !== null) {
                // @ts-ignore
                return trainerData.email;
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
            if (trainerData.profileActive !== null) {
                // @ts-ignore
                return trainerData.profileActive;
            }
        }
        return false;
    }

    const getProfileSwitcher = () => {
        if (getIsActive()) {
            return (
                <ListItem sx={{color: 'green'}}>
                    <FormControlLabel control={<Switch onChange={() => handleActiveChange(false)} checked={true}/>}
                                      label='aktywny'/>
                </ListItem>
            )
        }
        return (
            <ListItem sx={{color: 'grey'}}>
                <FormControlLabel control={<Switch onChange={() => handleActiveChange(true)}/>} label='nieaktywny'/>
            </ListItem>
        )
    }

    const getActiveTrainerPanel = () => {
        return (
            <AddTraining></AddTraining>
        )
    }


    const getMyTrainingsList = () => {
        return (
            <Box sx={{flexGrow: 1, border: 'solid black 2px', borderRadius: '3px', padding: '20px', mt: 1}}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TrainingList></TrainingList>
                    </Grid>
                </Grid>
            </Box>
        )
    }


    return (
        <>
            <Box sx={{flexGrow: 1, border: 'solid black 2px', borderRadius: '3px', padding: '20px'}}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <ListItem>
                            <ListItemIcon>
                                <SportsScoreIcon/>
                            </ListItemIcon>
                            <ListItemText primary='Dane trenera:'/>
                        </ListItem>
                        <PersonalDataList>
                            <List>
                                {getProfileSwitcher()}
                                <ListItem>
                                    <CustomTextField label='Opis' value={getDescription()}
                                                     handleChange={handleDescChange}
                                                     editable={true} multiline={true}></CustomTextField>
                                </ListItem>
                                <ListItem>
                                    <CustomNumberField label='Doświadczenie w miesiacach'
                                                       value={Number.parseInt(getExperience())}
                                                       handleChange={handleExpChange}
                                                       editable={true}></CustomNumberField>
                                </ListItem>
                                <ListItem>
                                    <CustomTextField label='Specjalizacje' value={getSpecializations()}
                                                     handleChange={handleSpecChange} editable={true}></CustomTextField>
                                </ListItem>
                                <ListItem>
                                    <Box sx={{maxWidth: '100%'}}>
                                        <ProfilePhoto email={getEmail()}></ProfilePhoto>
                                    </Box>
                                </ListItem>
                                <ListItem>
                                    <UploadForm></UploadForm>
                                </ListItem>
                            </List>
                        </PersonalDataList>
                    </Grid>
                </Grid>
            </Box>
            {getMyTrainingsList()}
            {getIsActive() ? getActiveTrainerPanel() : null}
        </>
    )

}