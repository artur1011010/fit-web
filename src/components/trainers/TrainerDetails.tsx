import * as React from "react";
import {useParams} from "react-router-dom";
import {
    Button,
    Card,
    CardContent,
    CardHeader,
    Container,
    Divider, Rating, TextField,
    Typography
} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import {deepOrange, red} from "@mui/material/colors";
import img from "./images/trainer4.png"
import Grid from "@mui/material/Grid";
import {CustomRating} from "./rating/CustomRating";
import {useEffect, useState} from "react";
import {STRING_EMPTY} from "../../commons/StaticText";
import OpinionListItem from "./OpinionListItem";
import {TrainerDetailsType} from "../../dto/TrainerDetails";

export default function TrainerDetails() {
    const {id} = useParams();
    const [value, setValue] = React.useState<number | null>(0);
    const [opinion, setOpinion] = useState(STRING_EMPTY);
    const [trainerDetails, setTrainerDetails] = useState<TrainerDetailsType | null>(null);


    const url = `http://localhost:8081/trainer/details/${id}`;

    const getTrainerDetails = () => {
        return fetch(url)
            .then((res) => res.json())
            .then((response) => {
                setTrainerDetails(response)
            });
    }

    useEffect(() => {
        getTrainerDetails();
    }, []);

    const handleChangeOpinion = (event: any) => {
        setOpinion(event.target.value)
    }

    const dispatchOpinion = () => {
        console.log("wysłanie opini");
    }

    const genOpinions = () => {
        let elem = [];
        if (trainerDetails && trainerDetails.opinions) {
            for (let i = 0; i < trainerDetails?.opinions.length; i++) {
                const opinion = trainerDetails.opinions[i];
                elem.push(<OpinionListItem
                    userName={opinion.userName || 'Nieznany użytkownik'}
                    rating={opinion.rating}
                    addedDate={opinion.addedDate ? new Date(opinion.addedDate) : new Date()}
                    content={opinion.content || 'Brak treści'}
                />)
            }
        }
        return elem;
    }

    return (
        <Container>
            <Grid item xs={12} md={10}>
                <Card sx={{maxWidth: '100%'}}>
                    <CardHeader
                        avatar={
                            <Avatar sx={{bgcolor: deepOrange[500], width: 70, height: 70}} src={img}
                                    aria-label="training-card">
                                {id}
                            </Avatar>
                        }
                        title={<Typography align='left' variant='h5' sx={{ml: 3}} color="text.secondary" gutterBottom>
                            {trainerDetails?.userName}
                        </Typography>}
                        subheader={<Typography align='left' sx={{fontSize: 16, ml: 3}} color="text.secondary"
                                               gutterBottom>
                            {trainerDetails?.email}
                        </Typography>}
                    />
                    <CardContent sx={{p: 10}}>
                        <CustomRating rating={trainerDetails?.rating || 0}></CustomRating>
                        <Typography align='left' sx={{fontSize: 19, mt: 2}} color="text.secondary" gutterBottom>
                            {trainerDetails?.description}
                        </Typography>
                        <Divider sx={{my: 5}}/>
                        <Typography align='left' variant='h5' sx={{my: 2}} color="text.secondary">
                            Doświadczenie
                        </Typography>
                        <Typography align='left' sx={{fontSize: 15, my: 2}} color="text.secondary">
                            {trainerDetails?.experience} miesięcy
                        </Typography>
                        <Typography align='left' variant='h5' sx={{my: 2}} color="text.secondary">
                            Specjalizacje
                        </Typography>
                        <Typography align='left' sx={{fontSize: 15}} color="text.secondary">
                            {trainerDetails?.specializations}
                        </Typography>
                        <Typography align='left' variant='h5' sx={{my: 2}} color="text.secondary">
                            Opinie
                        </Typography>
                        <Rating
                            name="simple-controlled"
                            precision={0.5}
                            value={value}
                            onChange={(event, newValue) => {
                                setValue(newValue);
                            }}
                        />
                        <TextField multiline rows={4} InputLabelProps={{shrink: true}}
                                   sx={{width: '100%'}}
                                   value={opinion}
                                   id='field' type='text' margin="none"
                                   onChange={handleChangeOpinion}
                                   inputProps={{maxLength: 8000}}
                        ></TextField>
                        <Button onClick={() => dispatchOpinion()} variant="contained" sx={{mt: 1}}>Wyślij
                            opinie</Button>
                    </CardContent>
                    {genOpinions()}
                </Card>
            </Grid>
        </Container>
    );
}