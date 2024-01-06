import React from "react";
import {Container, Typography} from "@mui/material";
import Grid from "@mui/material/Grid";

export function AddTraining() {

    return (
        <Container sx={{display: "flex", justifyContent: "center", alignItems: "center", my: 4}}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                <Typography variant="h3">Add Training </Typography>
                </Grid>
            </Grid>
        </Container>
    )
}