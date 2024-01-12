import {Container} from "@mui/material";
import React from "react";
import UserDataPanel from "../panel/UserDataPanel";

export function Profile () {
 return (
     <div>
         <Container sx={{display: "flex", justifyContent: "center", alignItems: "center", my: 5}}>
             <UserDataPanel></UserDataPanel>
         </Container>
     </div>
 )
}