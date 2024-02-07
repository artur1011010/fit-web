import {Container, Skeleton, Stack, TextField} from "@mui/material";
import React, {useEffect, useState} from "react";
import {isBlank} from "../../commons/Commons";
import Grid from "@mui/material/Grid";
import {TrainingCard} from "./TrainingCard";
import Box from "@mui/material/Box";

function getTrainingSkeleton(): React.JSX.Element {
    return (
        <Stack spacing={1} sx={{m: 3}}>
            <Box sx={{display: 'flex', flexDirection: 'row'}}>
                <Skeleton variant="circular" width={45} height={45} sx={{mt: 3, ml:1}}/>
                <Stack spacing={2} sx={{ml: 3}}>
                    <Skeleton variant="text" width={245} sx={{fontSize: '1rem'}}/>
                    <Skeleton variant="text" width={245} sx={{fontSize: '1rem'}}/>
                    <Skeleton variant="text" width={245} sx={{fontSize: '1rem'}}/>
                </Stack>
            </Box>
            <Skeleton variant="rectangular" width={340} height={120}/>
            <Skeleton variant="rounded" width={340} height={170}/>
        </Stack>
    );
}


export function Trainings() {
    const [trainersList, setTrainersList] = useState(null);
    const [trainersTempList, setTrainersTempList] = useState(null);
    const [renderSkeleton, setRenderSkeleton] = useState(true);

    const url = `${process.env.REACT_APP_OFFER_URL}/offer/all?active=true&current=true`;

    const getTrainersList = () => {
        return fetch(url)
            .then((res) => res.json())
            .then((d) => {
                setRenderSkeleton(false)
                setTrainersList(d)
                setTrainersTempList(d)
            });
    }

    useEffect(() => {
        getTrainersList();
    }, []);

    const renderSkeletonList = () => {
        let result: React.JSX.Element[] = [];
        for (let i = 0; i < 8; i++) {
            result.push(getTrainingSkeleton())
        }
        return result;
    }

    const renderList = () => {
        let result: React.JSX.Element[] = [];
        if (Array.isArray(trainersTempList)) {
            // @ts-ignore
            trainersTempList.forEach(elem => result.push(<TrainingCard key={elem.id}
                                                                       id={elem.id}
                                                                       title={elem.title}
                                                                       description={elem.description}
                                                                       address={elem.address}
                                                                       ownerEmail={elem.ownerEmail}
                                                                       startTime={elem.startTime}
                                                                       duration={elem.duration}
                                                                       photoNo={elem.photo}

            ></TrainingCard>))
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
                } else if (!isBlank(element.address) && element.address.toLowerCase().includes(value.toLowerCase())) {
                    return true;
                }else if (!isBlank(element.ownerEmail) && element.ownerEmail.toLowerCase().includes(value.toLowerCase())) {
                    return true;
                }else if (!isBlank(element.title) && element.title.toLowerCase().includes(value.toLowerCase())) {
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
                               label='Wyszukaj trening' id='user-name-field' type='text' margin="normal"
                               onChange={handleSearch}></TextField>

                </Grid>
                {renderSkeleton ? renderSkeletonList() : renderList()}
            </Grid>
        </Container>
    )
}