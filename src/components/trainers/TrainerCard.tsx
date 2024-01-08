import {
    Button,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    CardMedia,
    Container, Divider,
    Grid,
    Modal,
    Typography
} from "@mui/material";
import React, {useState} from "react";
import imageUrl1 from './images/trainer1.png'
import imageUrl2 from './images/trainer2.jpg'
import imageUrl3 from './images/trainer3.jpg'
import imageUrl4 from './images/trainer4.png'
import imageUrl5 from './images/trainer5.png'
import Avatar from "@mui/material/Avatar";
import {blue, red} from "@mui/material/colors";
import IconButton from "@mui/material/IconButton";
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import {limitText} from "../../commons/Commons";
import Box from "@mui/material/Box";
import {CustomRating} from "./rating/CustomRating";

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

export function TrainerCard(prop: {
    userName: string,
    specializations: string,
    description: string,
    experience: number,
    email: string,
    phoneNumber: string,
    photoNo?: number
}) {

    const [modal1, setOpenModal1] = React.useState(false);
    const [modal2, setOpenModal2] = React.useState(false);

    const getImage = (photo?: number) => {
        switch (photo) {
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
            default:
                return imageUrl1;
        }
    }

    return (
        <Grid item xs={12} sm={6} md={3}>
            <Card sx={{maxWidth: 345}}>
                <CardHeader
                    avatar={
                        <Avatar sx={{bgcolor: blue[500]}} aria-label="recipe">
                            {prop.userName.substring(0, 1)}
                        </Avatar>
                    }
                    action={
                        <IconButton aria-label="settings">
                            <MoreVertIcon/>
                        </IconButton>
                    }
                    title={prop.userName}
                />
                <CardMedia
                    sx={{height: 140}}
                    image={getImage(prop.photoNo)}
                    title={prop.userName}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {limitText(prop.specializations, 40)}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {limitText(prop.description, 150)}
                    </Typography>
                    <Grid sx={{mt: 1}}>
                        <CustomRating></CustomRating>
                    </Grid>
                </CardContent>
                <CardActions>
                    <Button size="small" onClick={() => setOpenModal1(true)}>Wiecej</Button>
                    <Button size="small" onClick={() => setOpenModal2(true)}>Kontakt</Button>
                </CardActions>
            </Card>
            <Modal
                open={modal1}
                onClose={() => setOpenModal1(false)}
                aria-labelledby="szczegóły trenera"
                aria-describedby="szczegóły trenera"
            >
                <Box sx={style}>
                    <Container sx={{display: 'flex', flexDirection: 'row'}}>
                        <Avatar sx={{bgcolor: blue[500]}} aria-label="recipe">
                            {prop.userName.substring(0, 1)}
                        </Avatar>
                        <Typography id="modal-modal-description" sx={{m: 1}}>
                            {prop.userName}
                        </Typography>
                    </Container>
                    <Typography id="modal-modal-description" sx={{mt: 2, ml: 3}}>
                        <Typography variant="h6" sx={{mb: 2}}>
                            Specjalizacje:
                        </Typography>
                        <Typography variant="body2">
                            {prop.specializations}
                        </Typography>
                        <Typography variant="h6" sx={{my: 2}}>
                            Opis:
                        </Typography>
                        <Typography variant="body2">
                            {prop.description}
                        </Typography>
                        <Divider sx={{mt: 2}}></Divider>
                        <Button size="small" onClick={() => setOpenModal1(false)} sx={{mt: 2}}>zamknij</Button>
                    </Typography>
                </Box>
            </Modal>
            <Modal
                open={modal2}
                onClose={() => setOpenModal2(false)}
                aria-labelledby="kontakt do trenera"
                aria-describedby="kontakt do trenera"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Dane kontaktowe: {prop.userName}
                    </Typography>
                    <Typography id="modal-modal-description" sx={{mt: 2}}>
                        <p><AlternateEmailIcon></AlternateEmailIcon> {prop.email}</p>
                        <p><LocalPhoneIcon></LocalPhoneIcon> {prop.phoneNumber}</p>
                        <Divider sx={{my: 2}}></Divider>
                        <Button size="small" onClick={() => setOpenModal2(false)}>zamknij</Button>
                    </Typography>
                </Box>
            </Modal>
        </Grid>
    );
}