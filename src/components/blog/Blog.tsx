import {List, ListItem, Typography} from "@mui/material";
import React from "react";
import Container from "@mui/material/Container";

export function Blog() {
    return (
        <div>
            <Typography variant='h4' mb='2'>Project changelist: </Typography>
            <Container sx={{display: "flex", justifyContent: "left", alignItems: "center"}}>
                <List sx={{listStyleType: 'disc'}}>
                    <ListItem sx={{display: 'list-item'}}>12-11-2023 - Utworzenie changelisty </ListItem>
                    <ListItem sx={{display: 'list-item'}}>10-11-2023 - Dodanie React redux - wstępna konfiguracja stanu dla użytkownika</ListItem>
                    <ListItem sx={{display: 'list-item'}}>10-11-2023 - Dodanie biblioteki react router, dodanie nawigacji - podlinkowanie z react router</ListItem>
                    <ListItem sx={{display: 'list-item'}}>09-11-2023 - Utworzenie projektu przy użyciu Create react App</ListItem>
                </List>
            </Container>
        </div>
    )
}