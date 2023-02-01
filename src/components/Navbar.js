import React, { useState } from 'react';
import { Link, Navigate, useNavigate } from "react-router-dom"
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';

const Navbar = () => {

    let navigate = useNavigate();


    const [open, setOpen] = useState(false);


    const handleLogout = () => {
        setOpen(false)
        localStorage.removeItem("token")
        localStorage.removeItem("expiration")
        navigate("/login")
    };

    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
                    >
                        SPORTIZER
                    </Typography>
                    {
                        !!localStorage.getItem("token") && (
                            <>
                                <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                                    <Button
                                        key="townhalls"
                                        onClick={() => navigate("/townhalls")}
                                        sx={{ my: 2, color: 'white', display: 'block' }}
                                    >
                                        Townhalls
                                    </Button>
                                    <Button
                                        key="clubs"
                                        onClick={() => navigate("/clubs")}
                                        sx={{ my: 2, color: 'white', display: 'block' }}
                                    >
                                        Clubs
                                    </Button>
                                    <Button
                                        key="players"
                                        onClick={() => navigate("/players")}
                                        sx={{ my: 2, color: 'white', display: 'block' }}
                                    >
                                        Players
                                    </Button>
                                    <Button
                                        key="matchs"
                                        onClick={() => navigate("/matchs")}
                                        sx={{ my: 2, color: 'white', display: 'block' }}
                                    >
                                        Matchs
                                    </Button>
                                </Box>

                                <Box sx={{ flexGrow: 0 }}>
                                    <Tooltip title="Open settings">
                                        <IconButton onClick={() => setOpen(true)} sx={{ p: 0 }}>
                                            <Avatar alt="Aemy Sharp" src="/static/images/avatar/2.jpg" />
                                        </IconButton>
                                    </Tooltip>
                                    <Menu
                                        sx={{ mt: '45px' }}
                                        id="menu-appbar"
                                        anchorOrigin={{
                                            vertical: 'top',
                                            horizontal: 'right',
                                        }}
                                        keepMounted
                                        transformOrigin={{
                                            vertical: 'top',
                                            horizontal: 'right',
                                        }}
                                        open={open}
                                        onClose={() => setOpen(false)}
                                    >
                                        <MenuItem key="name">
                                            <Typography textAlign="center">Zahir MENDACI</Typography>
                                        </MenuItem>
                                        <MenuItem key="logout" onClick={handleLogout}>
                                            <Typography textAlign="center">Logout</Typography>
                                        </MenuItem>
                                    </Menu>
                                </Box>
                            </>
                        )
                    }
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default Navbar;