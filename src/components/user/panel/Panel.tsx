import {Container, Typography} from "@mui/material";
import React from "react";
import UserDataPanel from "../account/UserDataPanel";

export function Panel () {
 return (
     <div>
         <Typography variant='h4'>Panel</Typography>
         <Container sx={{display: "flex", justifyContent: "center", alignItems: "center"}}>
             <UserDataPanel></UserDataPanel>
         </Container>
     </div>
 )
}