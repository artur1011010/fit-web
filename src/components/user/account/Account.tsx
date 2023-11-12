import {Grid, Typography, Container} from "@mui/material";
import React from "react";
import UserDataPanel from "./UserDataPanel";

export function Account() {
    return (
        <div>
            <Typography variant='h4'>Account</Typography>
            <Container sx={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                <UserDataPanel></UserDataPanel>
            </Container>
        </div>
    )
}