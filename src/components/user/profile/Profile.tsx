import {Container, Typography} from "@mui/material";
import React from "react";
import UserDataPanel from "../account/UserDataPanel";

export function Profile () {
 return (
     <div>
         <Typography variant='h4' sx={{my: 2}}>Panel klienta: </Typography>
         <Container sx={{display: "flex", justifyContent: "center", alignItems: "center"}}>
             <UserDataPanel></UserDataPanel>
         </Container>
     </div>
 )
}