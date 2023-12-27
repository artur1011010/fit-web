import {Typography} from "@mui/material";
import React, {useEffect, useState} from "react";
import {TrainersCard} from "./TrainersCard";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

export function Trainers() {

    const [trainersList, setTrainersList] = useState(null);

    const url = 'http://localhost:8081/trainer?active=true';

    const getTrainersList = () => {
        return fetch(url)
            .then((res) => res.json())
            .then((d) => {
                setTrainersList(d)
            });
    }

    useEffect(() => {
        getTrainersList();
    }, []);

    const renderList = () => {
        let result: React.JSX.Element[] = [];
        if (Array.isArray(trainersList)) {
            // @ts-ignore
            trainersList.forEach(elem => result.push(<TrainersCard userName={elem.userName} specializations={elem.specializations} description={elem.description}></TrainersCard>))
        }
        return result;
    }

    return (
        <>
            <div>
                <Typography variant='h4'>Trainers:</Typography>

                <Box sx={{flexGrow: 1, border: 'solid black 1px', borderRadius: '10px', padding: '20px'}}>
                    <Grid container spacing={2}>
                            {renderList()}
                    </Grid>
                </Box>
            </div>
        </>
    )
}