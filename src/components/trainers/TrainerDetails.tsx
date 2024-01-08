import * as React from "react";
import {useParams} from "react-router-dom";
import {
    Button,
    Card,
    CardActions,
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

export default function TrainerDetails() {
    const {id} = useParams();

    return (
        <Container sx={{mt: 4}}>
            <Grid item xs={12} md={10}>
                <Card sx={{maxWidth: '100%'}}>
                    <CardHeader
                        avatar={
                            <Avatar sx={{bgcolor: deepOrange[500], width: 70, height: 70}} src={img}
                                    aria-label="training-card">
                                {id}
                            </Avatar>
                        }
                        title={<Typography align='left' sx={{fontSize: 25, ml: 3}} color="text.secondary" gutterBottom>
                            user name trenera
                        </Typography>}
                        subheader={<Typography align='left' sx={{fontSize: 16, ml: 3}} color="text.secondary"
                                               gutterBottom>
                            mail trenera
                        </Typography>}
                    />
                    <CardContent sx={{p: 10}}>
                        <Typography align='left' sx={{fontSize: 15}} color="text.secondary" gutterBottom>
                            user name trenera opis trenera
                        </Typography>
                        <Divider sx={{my: 5}} />
                        <Typography align='left' sx={{fontSize: 15,my: 2}} color="text.secondary">
                            Doświadczenie: doświadczenie z ws w miesiącach
                        </Typography>
                        <Typography  align='left' sx={{fontSize: 15}} color="text.secondary">
                            Specjalizacje
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="small" onClick={() => console.log("ddd")}>Wiecej</Button>
                    </CardActions>
                </Card>
            </Grid>
        </Container>
    );
}