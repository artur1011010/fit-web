import * as React from 'react';
import {styled} from '@mui/material/styles';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';
import PersonIcon from '@mui/icons-material/Person';
import {ListItemIcon} from "@mui/material";
import {getEmptyUserDto} from "../../../dto/UserDto";
import {useEffect, useState} from "react";

function generate(element: React.ReactElement) {
    return [0, 1, 2, 4, 5].map((value) =>
        React.cloneElement(element, {
            key: value,
        }),
    );
}

const PersonalDataList = styled('div')(({theme}) => ({
    backgroundColor: theme.palette.background.paper,
}));

const url = 'http://localhost:8081/user?userId=1';

export default function DataList() {
    const [userData, setUserData] = useState(getEmptyUserDto());

    const fetchInfo = () => {
        return fetch(url)
            .then((res) => res.json())
            .then((d) => {
                console.log(d)
                setUserData(d)
            });
    }

    useEffect(() => {
        fetchInfo();
    }, []);


    return (
        <Box sx={{flexGrow: 1, border: 'solid black 1px'}}>
            <Grid container spacing={2}>
                <Grid item md={8}>
                    <ListItem>
                        <ListItemIcon>
                            <PersonIcon/>
                        </ListItemIcon>
                        <ListItemText primary='Dane profilowe:'/>
                    </ListItem>
                    <PersonalDataList>
                        <List>
                            {generate(
                                <ListItem>
                                    <ListItemText
                                        primary='Nazwa użytkownika'
                                        secondary={userData.phoneNumber}
                                    />
                                </ListItem>,
                            )}
                        </List>
                    </PersonalDataList>
                </Grid>
            </Grid>
        </Box>
    );
}