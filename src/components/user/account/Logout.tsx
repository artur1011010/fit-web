import {Link} from "@mui/material";
import React from "react";
import {ACTIONS, storeAuth} from "../../../config/storage";

const logout = () => {
    storeAuth(ACTIONS.CLEAR, null);
}

export function Logout() {
    logout();

    return (
        <div>
            <p>zostałeś prawidłowo wylogowany</p>
            <Link href="/" underline="hover">
                {'wróć do strony głównej'}
            </Link>
        </div>
    )
}