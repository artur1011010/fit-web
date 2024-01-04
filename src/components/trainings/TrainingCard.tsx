import React, {useState} from "react";
import {Button, Card, CardActions, CardContent, CardHeader, CardMedia, Grid, Modal, Typography} from "@mui/material";
import imageUrl1 from './images/gym1.jpg'
import imageUrl2 from './images/gym2.jpg'
import imageUrl3 from './images/gym3.png'
import imageUrl4 from './images/gym4.png'
import imageUrl5 from './images/gym5.png'
import imageUrl6 from './images/gym6.png'
import imageUrl7 from './images/gym7.jpg'
import Avatar from "@mui/material/Avatar";
import {red} from "@mui/material/colors";
import IconButton from "@mui/material/IconButton";
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import {limitText} from "../../commons/FieldValidator";
import Box from "@mui/material/Box";
import * as string_decoder from "string_decoder";

function MoreVertIcon() {
    return null;
}

const style = {
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

export function TrainingCard(prop: {
    title: string,
    description: string,
    address: string,
    email: string,
    ownerEmail: string,
    startTime: string,
    duration: number,
}) {

    const [open, setOpen] = React.useState(false);
    const handleOpenModal = () => setOpen(true);
    const handleCloseModal = () => setOpen(false);

    const getRandomImage = () => {
        const imgNo = Math.floor(Math.random() * (7 - 1 + 1) + 1)
        switch (imgNo) {
            case 1:
                return imageUrl1;
            case 2:
                return imageUrl2;
            case 3:
                return imageUrl3;
            case 4:
                return imageUrl4;
            case 5:
                return imageUrl5;
            case 6:
                return imageUrl6;
            case 7:
                return imageUrl7;
            default:
                return imageUrl1;
        }
    }

    return (
        <Grid item xs={12} sm={6} md={3}>
            <Card sx={{maxWidth: 345}}>
                <CardHeader
                    avatar={
                        <Avatar sx={{bgcolor: red[500]}} aria-label="recipe">
                            {prop.title.substring(0, 1)}
                        </Avatar>
                    }
                    action={
                        <IconButton aria-label="settings">
                            <MoreVertIcon/>
                        </IconButton>
                    }
                    title={prop.title}
                />
                <CardMedia
                    sx={{height: 140}}
                    image={getRandomImage()}
                    title={prop.title}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {limitText(prop.description, 20)}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {limitText(prop.description, 150)}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small" onClick={handleOpenModal}>Zapisz się</Button>
                </CardActions>
            </Card>
            <Modal
                open={open}
                onClose={handleCloseModal}
                aria-labelledby="kontakt do trenera"
                aria-describedby="kontakt do trenera"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Dane kontaktowe {prop.title}
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        <p><AlternateEmailIcon></AlternateEmailIcon>{prop.email}</p>
                        <p><LocalPhoneIcon></LocalPhoneIcon>{prop.description}</p>
                        <Button size="small" onClick={handleCloseModal}>zamknij</Button>
                    </Typography>
                </Box>
            </Modal>
        </Grid>
    );
}