import {ACTIONS, storeAuth} from "../../../../config/storage";
import React, {useEffect, useState} from "react";
import {MyTrainingListItem} from "./MyTrainingListItem"
import List from "@mui/material/List";
import {ListItemIcon, Typography} from "@mui/material";
import ListItem from "@mui/material/ListItem";
import SportsIcon from "@mui/icons-material/Sports";
import ListItemText from "@mui/material/ListItemText";
import Grid from "@mui/material/Grid";

export function MyTrainingList() {

    const [trainingList, setTrainingList] = useState(null);

    const url = 'http://localhost:8083/offer/client';
    const getMyTrainingsList = () => {
        const auth = storeAuth(ACTIONS.GET, null);
        return fetch(url, {
            headers: {Authorization: `Bearer ${auth.access_token}`}
        })
            .then((res) => res.json())
            .then((d) => {
                setTrainingList(d)
            });
    }

    useEffect(() => {
        getMyTrainingsList();
    }, []);

    const resignTraining = (id: number) => {
        console.log(`featching:\n${url}?trainingId=${id}`)
        const auth = storeAuth(ACTIONS.GET, null);
        return fetch(`${url}?trainingId=${id}`, {
            headers: {Authorization: `Bearer ${auth.access_token}`},
            method: 'DELETE'
        })
            .then((res) => res.json())
            .then((d) => {
                setTrainingList(d)
            });
    }


    const renderList = () => {
        let result: React.JSX.Element[] = [];
        // @ts-ignore
        if (Array.isArray(trainingList) && trainingList.length !== 0) {
            // @ts-ignore
            trainingList.forEach(elem => result.push(<MyTrainingListItem key={elem.id}
                                                                         id={elem.id}
                                                                         photo={elem.photo}
                                                                         title={elem.title}
                                                                         description={elem.description}
                                                                         address={elem.address}
                                                                         ownerEmail={elem.ownerEmail}
                                                                         clientEmail={elem.clientEmail}
                                                                         startTime={elem.startTime}
                                                                         duration={elem.duration}
                                                                         resignTraining={resignTraining}
            ></MyTrainingListItem>))
            return result;
        }
        return (
            <Typography variant='body2' my={1} sx={{color: 'yellow'}}>Brak treningów</Typography>
        )

    }

    return (
        <Grid item xs={12}>
            <ListItem>
                <ListItemIcon>
                    <SportsIcon/>
                </ListItemIcon>
                <ListItemText primary='Lista Treningów na które się zapisałeś:'/>
            </ListItem>
            <List dense={true}>
                {renderList()}
            </List>
        </Grid>
    )
}