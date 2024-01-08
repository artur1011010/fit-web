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
import {Fragment, useEffect} from "react";
import {isUserLogged} from "../../config/storage";
import SearchIcon from '@mui/icons-material/Search';
import {Link as RouterLink, LinkProps as RouterLinkProps, NavLink} from "react-router-dom";

interface Page {
    definition: string;
    site: string;
}

const pages: Page[] = [
    {definition: "Trenerzy", site: "/trainers"},
    {definition: "Treningi", site: "/trainings"},
];

const settingsLogged: Page[] = [
    {definition: 'Profil', site: '/profile'},
    {definition: 'Wylogowanie', site: '/logout'}];

const settings: Page[] = [
    {definition: 'Zaloguj', site: '/login'},
    {definition: 'Zarejestruj', site: '/register'}];

const getLink = (site: string) => {
    const LinkBehavior = React.forwardRef<any, Omit<RouterLinkProps, 'to'>>(
        (props, ref) => <RouterLink ref={ref} to={site} {...props} role={undefined} />,
    );
    return LinkBehavior;
}

function ResponsiveAppBar() {
    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
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
                      <IconButton
                        size="large"
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={handleOpenUserMenu}
                        color="inherit"
                    >
                        <Avatar alt="A" src='src/components/nav/avatar.png'/>
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
                            <Link textAlign="center" component={getLink(setting.site)} underline="hover"
                                  variant='body2'>{setting.definition.toUpperCase()}</Link>
                        </MenuItem>
                    )) : settings.map((setting) => (
                        <MenuItem key={setting.definition} onClick={handleCloseUserMenu}>
                            <Link textAlign="center" component={getLink(setting.site)} underline="hover"
                                  variant='body2'>{setting.definition.toUpperCase()}</Link>
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
                                key="icon-menu"
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
                                    <Container sx={{display: 'flex', flexDirection: 'row'}}>
                                        <SearchIcon sx={{mt: 2}}></SearchIcon>
                                        <Button
                                            component={getLink(page.site)}
                                            key={page.definition}
                                            onClick={handleCloseNavMenu}
                                            sx={{my: 2, color: 'white', display: 'block'}}
                                        >
                                            {page.definition}
                                        </Button>
                                    </Container>
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
                                <>
                                    <SearchIcon sx={{mt: 3, ml: 2}}></SearchIcon>
                                    <Button
                                        component={getLink(page.site)}
                                        key={page.definition}
                                        onClick={handleCloseNavMenu}
                                        sx={{my: 2, color: 'white', display: 'block'}}
                                    >
                                        {page.definition}
                                    </Button>
                                </>
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