import ListItem from "@mui/material/ListItem";
import IconButton from "@mui/material/IconButton";
import {Button, Divider, ListItemAvatar} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import ListItemText from "@mui/material/ListItemText";
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import {editDate, limitText} from "../../../../commons/Commons";
import React from "react";


export function TrainingListItem(prop: {
    id: number,
    title: string,
    description: string,
    address: string,
    email: string,
    ownerEmail: string,
    startTime: string,
    duration: number,
    photo: number,
    clientEmail?: string
    removeFunction: Function
}) {

    const handleRemoveTraining = (id: number) => {
        console.log("usuniecie treningu nr: " + id)
    }

    return (
        <>
            <ListItem
                secondaryAction={
                    <IconButton edge="end" aria-label="delete">
                        <RemoveCircleOutlineIcon onClick={() => prop.removeFunction(prop.id)}/>
                    </IconButton>
                }
            >
                <ListItemAvatar>
                    <Avatar>
                        <FitnessCenterIcon/>
                    </Avatar>
                </ListItemAvatar>
                <ListItemText
                    primary={`${limitText(prop.title, 30)},  ${prop.address},  ${editDate(prop.startTime)}`}
                    secondary={prop.ownerEmail}
                />
            </ListItem>
            <Divider></Divider>
        </>

    )
}