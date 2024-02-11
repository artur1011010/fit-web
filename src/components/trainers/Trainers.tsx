import {Container, Skeleton, TextField, Stack} from "@mui/material";
import React, {useEffect, useState} from "react";
import {TrainerCard} from "./TrainerCard";
import Grid from "@mui/material/Grid";
import {isBlank} from "../../commons/Commons";
import Box from "@mui/material/Box";

function getTrainerSkeleton(key: number): React.JSX.Element {
    return (
        <Stack key={key} spacing={2} sx={{m: 1}}>
            <Box sx={{display: 'flex', flexDirection: 'row'}}>
                <Skeleton variant="circular" width={45} height={45} sx={{mt: 1, ml: 1}}/>
                <Stack spacing={2} sx={{ml: 3}}>
                    <Skeleton variant="text" width={180} sx={{fontSize: '1rem', mt: 2}}/>
                </Stack>
            </Box>
            <Skeleton variant="rectangular" width={270} height={130}/>
            <Skeleton variant="rounded" width={270} height={250}/>
        </Stack>
    );
}

export function Trainers() {

    const [trainersList, setTrainersList] = useState(null);
    const [trainersTempList, setTrainersTempList] = useState(null);
    const [renderSkeleton, setRenderSkeleton] = useState(true);

    const url = `${process.env.REACT_APP_USER_URL}/trainer?active=true`;

    const getTrainersList = async () => {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Fetch failed with code: ${response.status} body: ${response.body}`);
            }
            const data = await response.json();
            setTrainersList(data);
            setTrainersTempList(data);
        } catch (error) {
            console.error(error);
        } finally {
            setRenderSkeleton(false);
        }
    };

    useEffect(() => {
        getTrainersList();
    }, []);

    const renderList = () => {
        let result: React.JSX.Element[] = [];
        if (Array.isArray(trainersTempList)) {
            // @ts-ignore
            trainersTempList.forEach(elem => result.push(<TrainerCard
                key={elem.id}
                trainerId={elem.id}
                userName={elem.userName}
                specializations={elem.specializations}
                description={elem.description}
                phoneNumber={elem.phoneNumber}
                email={elem.email}
                photoNo={elem.photoNo}
                rating={elem.rating}
            ></TrainerCard>))
        }
        return result;
    }

    const renderSkeletonList = () => {
        let result: React.JSX.Element[] = [];
        for (let i = 0; i < 8; i++) {
            result.push(getTrainerSkeleton(i))
        }
        return result;
    }

    const handleSearch = (event: any) => {
        let va1ue = event.target.value;
        search(va1ue)
    }

    const search = (value: string) => {
        setTrainersTempList(trainersList)
        // @ts-ignore
        if (trainersTempList !== null && trainersTempList !== undefined && Array.isArray(trainersTempList)) {
            // @ts-ignore
            let filter = trainersList.slice().filter(element => {
                if (!isBlank(element.userName) && element.userName.toLowerCase().includes(value.toLowerCase())) {
                    return true;
                } else if (!isBlank(element.specializations) && element.specializations.toLowerCase().includes(value.toLowerCase())) {
                    return true;
                } else if (!isBlank(element.description) && element.description.toLowerCase().includes(value.toLowerCase())) {
                    return true;
                }
                return false;
            });
            setTrainersTempList(filter)
        }
    }

    return (
        <Container sx={{display: "flex", justifyContent: "center", alignItems: "center"}}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField sx={{width: '100%', my: 4}}
                               label='Wyszukaj trenera' id='user-name-field' type='text' margin="normal"
                               onChange={handleSearch}></TextField>
                </Grid>
                {renderSkeleton ? renderSkeletonList() : renderList()}
            </Grid>
        </Container>
    )
}