import {Container, Link} from "@mui/material";
import React from "react";
import {ACTIONS, storeAuth} from "../../../config/storage";

const logout = () => {
    storeAuth(ACTIONS.CLEAR, null);
}

export function Logout() {
    logout();

    return (
        <Container sx={{width: '90%', mb:2}}>
            <p>zostałeś prawidłowo wylogowany</p>
            <Link href="/" underline="hover">
                {'wróć do strony głównej'}
            </Link>
        </Container>
    )
}