import React from "react";
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
import imageUrl1 from './images/gym1.jpg'
import imageUrl2 from './images/gym2.jpg'
import imageUrl3 from './images/gym3.png'
import imageUrl4 from './images/gym4.png'
import imageUrl5 from './images/gym5.png'
import imageUrl6 from './images/gym6.png'
import imageUrl7 from './images/gym7.jpg'
import Avatar from "@mui/material/Avatar";
import {blue, red} from "@mui/material/colors";
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import PlaceIcon from '@mui/icons-material/Place';
import {editDate, limitText} from "../../commons/Commons";
import Box from "@mui/material/Box";
import {ACTIONS, isUserLogged, storeAuth} from "../../config/storage";


const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    maxWidth: 550,
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

export function TrainingCard(prop: {
    id: number,
    title: string,
    description: string,
    address: string,
    email: string,
    ownerEmail: string,
    startTime: string,
    duration: number,
    photoNo: number,
}) {
    const [modal1, setOpenModal1] = React.useState(false);

    const handleSignup = () => {
        // console.log("zapisz sie: " + prop.id)
        signupOnTraining(prop.id)
    }

    const url = `${process.env.REACT_APP_OFFER_URL}/offer/signup`;

    const signupOnTraining = (id: number) => {
        console.log(`featching:\n${url}?trainingId=${id}`)
        const auth = storeAuth(ACTIONS.GET, null);
        return fetch(`${url}?trainingId=${id}`, {
            headers: {Authorization: `Bearer ${auth.access_token}`},
            method: 'PATCH'
        })
            .then(() => {
                setOpenModal1(false)
            });
    }

    const getImage = (photoNo: number) => {
        switch (photoNo) {
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

    const renderTitle = () => {
        return (
            <Container disableGutters>
                <Container disableGutters sx={headerJustify}>
                    <AccessTimeIcon></AccessTimeIcon> <Typography sx={{ml: 1}}>{prop.duration} min. </Typography>
                </Container>
                <Container disableGutters sx={headerJustify}>
                    <CalendarMonthIcon></CalendarMonthIcon> <Typography sx={{ml: 1}}
                                                                        align='left'>{editDate(prop.startTime)}</Typography>
                </Container>
                <Container disableGutters sx={headerJustify}>
                    <PlaceIcon></PlaceIcon> <Typography sx={{ml: 1}} align='left'>{prop.address}</Typography>
                </Container>
            </Container>
        )
    }

    return (
        <Grid item xs={12} sm={6} md={4}>
            <Card sx={{maxWidth: 345}}>
                <CardHeader
                    avatar={
                        <Avatar sx={{bgcolor: red[500]}} aria-label="training-card">
                            {prop.ownerEmail.substring(0, 1)}
                        </Avatar>
                    }
                    title={renderTitle()}
                />
                <CardMedia
                    sx={{height: 140}}
                    image={getImage(prop.photoNo)}
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
                    <Button size="small" onClick={() => setOpenModal1(true)}>Wiecej</Button>
                </CardActions>
            </Card>
            <Modal
                open={modal1}
                onClose={() => setOpenModal1(false)}
                aria-labelledby="szczegóły treningu"
                aria-describedby="szczegóły treningu"
            >
                <Box sx={style}>
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
                            {isUserLogged() ?
                                <Button size="small" onClick={handleSignup} sx={{mt: 2}}>Zapisz się</Button> : null}
                        </Container>
                    </Typography>
                </Box>
            </Modal>
        </Grid>
    );
}