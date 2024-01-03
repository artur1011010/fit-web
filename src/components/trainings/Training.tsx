import {Container, TextField, Typography} from "@mui/material";
import React, {useEffect, useState} from "react";
import {TrainerCard} from "../trainers/TrainerCard";
import {isBlank} from "../../commons/FieldValidator";
import Grid from "@mui/material/Grid";
import {TrainingCard} from "./TrainingCard";

export function Trainings () {
    const [trainersList, setTrainersList] = useState(null);
    const [trainersTempList, setTrainersTempList] = useState(null);

    const url = 'http://localhost:8081/trainer?active=true';

    const getTrainersList = () => {
        return fetch(url)
            .then((res) => res.json())
            .then((d) => {
                setTrainersList(d)
                setTrainersTempList(d)
            });
    }

    useEffect(() => {
        getTrainersList();
    }, []);

    const renderList = () => {
        let result: React.JSX.Element[] = [];
        if (Array.isArray(trainersTempList)) {
            // @ts-ignore
            trainersTempList.forEach(elem => result.push(<TrainingCard key={elem.userName} userName={elem.userName}
                                                                       specializations={elem.specializations}
                                                                       description={elem.description}></TrainingCard>))
        }
        return result;
    }

    const handleSearch = (event: any) => {
        let va1ue = event.target.value;
        console.log('search: ' + va1ue)
        search(va1ue)
    }

    const search = (value: string) => {
        setTrainersTempList(trainersList)
        // @ts-ignore
        if (trainersTempList !== null && trainersTempList !== undefined && Array.isArray(trainersTempList)) {
            // @ts-ignore
            let filter = trainersList.slice().filter(element => {
                if (!isBlank(element.userName) && element.userName.toLowerCase().includes(value.toLowerCase())) {
                    // console.log("pass + userName")
                    return true;
                } else if (!isBlank(element.specializations) && element.specializations.toLowerCase().includes(value.toLowerCase())) {
                    // console.log("pass + spec")
                    return true;
                } else if (!isBlank(element.description) && element.description.toLowerCase().includes(value.toLowerCase())) {
                    // console.log("pass + desc")
                    return true;
                }
                return false;
            });
            setTrainersTempList(filter)
        }
    }

    return (
        <Container sx={{display: "flex", justifyContent: "center", alignItems: "center", my: 4}}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField sx={{width: '100%', my: 4}}
                               label='Wyszukaj trening' id='user-name-field' type='text' margin="normal"
                               onChange={handleSearch}></TextField>

                </Grid>
                {renderList()}
            </Grid>
        </Container>
    )
}