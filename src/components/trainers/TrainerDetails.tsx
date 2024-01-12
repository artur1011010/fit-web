import * as React from "react";
import {useParams} from "react-router-dom";
import {
    Card,
    CardContent,
    CardHeader,
    Container,
    Divider,
    Typography
} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import {deepOrange, red} from "@mui/material/colors";
import img from "./images/trainer4.png"
import Grid from "@mui/material/Grid";
import {CustomRating} from "./rating/CustomRating";
import {useEffect, useState} from "react";
import OpinionListItem from "./OpinionListItem";
import {TrainerDetailsType} from "../../dto/TrainerDetails";
import {RatingForm} from "./RatingForm";
import {OpinionDto} from "../../dto/OpinionDto";
import {ACTIONS, isUserLogged, storeAuth} from "../../config/storage";

export default function TrainerDetails() {
    const {id} = useParams();
    const [trainerDetails, setTrainerDetails] = useState<TrainerDetailsType | null>(null);

    const GET_URL = `http://localhost:8081/trainer/details/${id}`
    const POST_OPINION_URL = `http://localhost:8081/opinion/${id}`

    const getTrainerDetails = () => {
        return fetch(GET_URL)
            .then((res) => res.json())
            .then((response) => {
                setTrainerDetails(response)
            });
    }

    useEffect(() => {
        getTrainerDetails();
    }, []);

    const dispatchOpinion = (opinionDto: OpinionDto) => {
        console.log("wysłanie opini: " + opinionDto);
        postOpinion(opinionDto)
    }

    const postOpinion = (opinionDto: OpinionDto) => {
        const auth = storeAuth(ACTIONS.GET, null);
        fetch(POST_OPINION_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${auth.access_token}`
            },
            body: JSON.stringify(opinionDto),
        }).then(()=>{
            getTrainerDetails();
        }).catch(()=>{
            console.log("dispatch error message")
        })
    }

    const genOpinions = () => {
        let elem = [];
        if (trainerDetails && trainerDetails.opinions) {
            for (let i = 0; i < trainerDetails?.opinions.length; i++) {
                const opinion = trainerDetails.opinions[i];
                elem.push(<OpinionListItem
                    key={opinion.userName}
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
                        {isUserLogged() ? <RatingForm handleOpinionFunc={dispatchOpinion}></RatingForm> : null}
                    </CardContent>
                    {genOpinions()}
                </Card>
            </Grid>
        </Container>
    );
}