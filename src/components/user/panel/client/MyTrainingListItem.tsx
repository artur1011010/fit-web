import ListItem from "@mui/material/ListItem";
import IconButton from "@mui/material/IconButton";
import {Button, Container, Divider, ListItemAvatar, Modal, Tooltip, Typography} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import ListItemText from "@mui/material/ListItemText";
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import {editDate, isBlank, limitText} from "../../../../commons/Commons";
import React from "react";
import Box from "@mui/material/Box";
import {red} from "@mui/material/colors";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import PlaceIcon from "@mui/icons-material/Place";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";

const modalStyle = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const headerJustify = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'start',
    mb: 1
}

export function MyTrainingListItem(prop: {
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
    resignTraining: Function
}) {

    const [modal1, setOpenModal1] = React.useState(false);


    const getSecondaryStyle = () => {
        if (isBlank(prop.clientEmail)) {
            return {color: 'yellow'}
        }
        return {color: 'green'}
    }

    return (
        <>
            <ListItem
                secondaryAction={
                    <IconButton edge="end" aria-label="delete">
                        <Tooltip title="Wypisz się z treningu">
                            <RemoveCircleOutlineIcon onClick={() => prop.resignTraining(prop.id)}/>
                        </Tooltip>
                    </IconButton>
                }
            >
                <ListItemAvatar>
                    <Avatar>
                        <Tooltip title="Pokaż szczegóły">
                            <FitnessCenterIcon onClick={() => setOpenModal1(true)}/>
                        </Tooltip>
                    </Avatar>
                </ListItemAvatar>
                <ListItemText
                    primary={`${limitText(prop.title, 30)},  ${prop.address},  ${editDate(prop.startTime)}`}
                    secondary={<Typography variant="body2"
                                           style={getSecondaryStyle()}>Uczestnik: {isBlank(prop.clientEmail) ? 'brak' : prop.clientEmail}</Typography>}
                />
            </ListItem>
            <Divider></Divider>
            <Modal
                open={modal1}
                onClose={() => setOpenModal1(false)}
                aria-labelledby="szczegóły treningu"
                aria-describedby="szczegóły treningu"
            >
                <Box sx={modalStyle}>
                    <Container sx={{display: 'flex', flexDirection: 'row'}}>
                        <Avatar sx={{bgcolor: red[500]}} aria-label="recipe">
                            {prop.ownerEmail.substring(0, 1)}
                        </Avatar>
                        <Typography id="modal-modal-description" sx={{m: 1}}>
                            {prop.ownerEmail}
                        </Typography>
                    </Container>
                    <Container sx={{mt: 3}}>
                        <Container disableGutters sx={headerJustify}>
                            <AccessTimeIcon></AccessTimeIcon> <Typography
                            sx={{ml: 1}}>{prop.duration} min. </Typography>
                        </Container>
                        <Container disableGutters sx={headerJustify}>
                            <CalendarMonthIcon></CalendarMonthIcon> <Typography sx={{ml: 1}}
                                                                                align='left'>{editDate(prop.startTime)}</Typography>
                        </Container>
                        <Container disableGutters sx={headerJustify}>
                            <PlaceIcon></PlaceIcon> <Typography sx={{ml: 1}} align='left'>{prop.address}</Typography>
                        </Container>
                    </Container>
                    <Typography id="modal-modal-description" sx={{mt: 2, ml: 3}}>
                        <Typography variant="h5">
                            {prop.title}
                        </Typography>
                        <Typography variant="h6" sx={{my: 2}}>
                            Opis:
                        </Typography>
                        <Typography variant="body2">
                            {prop.description}
                        </Typography>
                        <p><AlternateEmailIcon></AlternateEmailIcon> {prop.ownerEmail}</p>
                        <Divider></Divider>
                        <Container disableGutters sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            mb: 1
                        }}>
                            <Button size="small" onClick={() => setOpenModal1(false)} sx={{mt: 2}}>zamknij</Button>
                            <Button size="small" onClick={() => prop.resignTraining(prop.id)} sx={{mt: 2}}>Wypisz się</Button>
                        </Container>
                    </Typography>
                </Box>
            </Modal>
        </>

    )
}