import React, {useEffect, useState} from "react";
import {Button, Card, CardActions, CardContent, CardHeader, CardMedia, Grid, Typography} from "@mui/material";
import imageUrl1 from './images/cards/gym1.jpg'
import imageUrl2 from './images/cards/gym2.jpg'
import imageUrl3 from './images/cards/gym3.png'
import imageUrl4 from './images/cards/gym4.png'
import imageUrl5 from './images/cards/gym5.png'
import Avatar from "@mui/material/Avatar";
import {red} from "@mui/material/colors";
import IconButton from "@mui/material/IconButton";

function MoreVertIcon() {
    return null;
}

export function TrainersCard(prop: {
    userName: string,
    specializations: string,
    description: string,
    experience: number
}) {

    const [counter, setCounter] = useState(0);

    const getRandomImage = () => {
        const imgNo = Math.floor(Math.random() * (5 - 1 + 1) + 1)
        switch (imgNo) {
            case 1:
                return imageUrl1;
            case 2:
                return imageUrl2;
            case 3:
                return imageUrl3;
            case 4:
                return imageUrl4;
            case 5:
                return imageUrl5;
            default:
                return imageUrl1;
        }
    }

    return (
        <Grid item xs={3}>
            <Card sx={{maxWidth: 345}}>
                <CardHeader
                    avatar={
                        <Avatar sx={{bgcolor: red[500]}} aria-label="recipe">
                            {prop.userName.substring(0, 1)}
                        </Avatar>
                    }
                    action={
                        <IconButton aria-label="settings">
                            <MoreVertIcon/>
                        </IconButton>
                    }
                    title={prop.userName}
                />
                <CardMedia
                    sx={{height: 140}}
                    image={getRandomImage()}
                    title={prop.userName}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {prop.specializations}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {prop.description}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small">Udostępnij</Button>
                    <Button size="small">Wiecej</Button>
                </CardActions>
            </Card>
        </Grid>
    );
}