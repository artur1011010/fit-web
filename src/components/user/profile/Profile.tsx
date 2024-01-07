import {Container} from "@mui/material";
import React from "react";
import UserDataPanel from "../panel/UserDataPanel";
import ScrollToTopFab from "../../main/ScrollToTopFab";

export function Profile () {
 return (
     <div>
         <Container sx={{display: "flex", justifyContent: "center", alignItems: "center", my: 5}}>
             <UserDataPanel></UserDataPanel>
             <ScrollToTopFab></ScrollToTopFab>
         </Container>
     </div>
 )
}