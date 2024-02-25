import {Container, Typography} from "@mui/material";
import React from "react";
import backgroundImg from "./main-background.jpg";
import Box from "@mui/material/Box";

const mainClass = {
    height: 'calc(100vh - 69px)',
    backgroundImage: `url(${backgroundImg})`
}

export function Main() {


    return (
        <Box style={mainClass} sx={{p: 5}}>
            <Container>
                <Box sx={{width: '100%', backgroundColor: '#121212', p: 2, borderRadius: '3px'}}>
                    <Typography variant='h4'>Praca inż pt "Mikroserwisy i Domain driven design"</Typography>
                    <Typography variant='h6'>autor: Artur Zaczek</Typography>
                </Box>
            </Container>
        </Box>
    )
}