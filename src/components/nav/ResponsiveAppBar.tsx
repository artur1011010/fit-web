import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import {Link, Paper} from "@mui/material";
import {RootState} from "../../config/store";
import {useSelector} from "react-redux";
import {Fragment, useEffect, useRef} from "react";
import {isUserLogged} from "../../config/storage";
import {subscribe, unsubscribe} from "../../services/events";
import { AccountCircle } from '@mui/icons-material';

interface Page {
    definition: string;
    site: string;
}

const pages: Page[] = [
    {definition: "Trenerzy", site: "/trainers"},
    {definition: "Treningi", site: "/trainings"},
    {definition: "Wyszukiwanie", site: "/search"},
    {definition: "Changelist", site: "/changelist"},
];

const settingsLogged: Page[] = [
    {definition: 'Profil', site: '/profile'},
    {definition: 'Konto', site: '/account'},
    {definition: 'Panel', site: '/panel'},
    {definition: 'Wylogowanie', site: '/logout'}];

const settings: Page[] = [
    {definition: 'Zaloguj', site: '/login'},
    {definition: 'Zarejestruj', site: '/register'}];

function ResponsiveAppBar() {
    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleLoginButton = (event: React.MouseEvent<HTMLElement>) => {
        console.log("handle login button")
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleEvent = () => {
        console.log("updateing state")
    }

    useEffect(() => {
        window.addEventListener("auth_update", handleEvent);
        return () => {
            window.removeEventListener("auth_update", handleEvent);
        };
    }, []);

    const getAvatarIconWhenLogged = () => {
        return (
            <Fragment>
                <Tooltip title="Ustawienia profilu">
                    {/*<IconButton onClick={handleOpenUserMenu} sx={{p: 0}}>*/}
                    {/*    <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg"/>*/}
                    {/*</IconButton>*/}

                    <IconButton
                        size="large"
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={handleOpenUserMenu}
                        color="inherit"
                    >
                        <AccountCircle fontSize={"large"}/>
                    </IconButton>
                </Tooltip>
                <Menu
                    sx={{mt: '45px'}}
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                >

                    {isUserLogged() ? settingsLogged.map((setting) => (
                        <MenuItem key={setting.definition} onClick={handleCloseUserMenu}>
                            <Link textAlign="center" href={setting.site} underline="hover"
                                  variant='body2'>{setting.definition}</Link>
                        </MenuItem>
                    )) : settings.map((setting) => (
                        <MenuItem key={setting.definition} onClick={handleCloseUserMenu}>
                            <Link textAlign="center" href={setting.site} underline="hover"
                                  variant='body2'>{setting.definition}</Link>
                        </MenuItem>
                    ))}
                </Menu>
            </Fragment>
        )
    }

    return (
        <Paper elevation={4}>
            <AppBar position="static">
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <FitnessCenterIcon sx={{display: {xs: 'none', md: 'flex'}, mr: 1}}/>
                        <Typography
                            variant="h6"
                            noWrap
                            component="a"
                            href="/"
                            sx={{
                                mr: 2,
                                display: {xs: 'none', md: 'flex'},
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                        >
                            FitApp
                        </Typography>

                        <Box sx={{flexGrow: 1, display: {xs: 'flex', md: 'none'}}}>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleOpenNavMenu}
                                color="inherit"
                            >
                                <MenuIcon/>
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorElNav}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                }}
                                open={Boolean(anchorElNav)}
                                onClose={handleCloseNavMenu}
                                sx={{
                                    display: {xs: 'block', md: 'none'},
                                }}
                            >
                                {pages.map((page) => (
                                    <MenuItem key={page.definition} onClick={handleCloseNavMenu}>
                                        <Typography textAlign="center">{page.definition}</Typography>
                                    </MenuItem>
                                ))}
                            </Menu>
                        </Box>
                        <FitnessCenterIcon sx={{display: {xs: 'flex', md: 'none'}, mr: 1}}/>
                        <Typography
                            variant="h5"
                            noWrap
                            component="a"
                            href="/"
                            sx={{
                                mr: 2,
                                display: {xs: 'flex', md: 'none'},
                                flexGrow: 1,
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                        >
                            FitApp
                        </Typography>
                        <Box sx={{flexGrow: 1, display: {xs: 'none', md: 'flex'}}}>
                            {pages.map((page) => (
                                <Button
                                    href={page.site}
                                    key={page.definition}
                                    onClick={handleCloseNavMenu}
                                    sx={{my: 2, color: 'white', display: 'block'}}
                                >
                                    {page.definition}
                                </Button>
                            ))}
                        </Box>

                        <Box sx={{flexGrow: 0}}>
                            {getAvatarIconWhenLogged()}
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
        </Paper>
    );
}

export default ResponsiveAppBar;