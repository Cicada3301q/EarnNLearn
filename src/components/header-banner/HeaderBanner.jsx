import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Avatar, Menu, MenuItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';

function HeaderBanner() {
    const [anchorEl, setAnchorEl] = useState(null);
    const navigate = useNavigate();

    const handleMenuClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleNavigate = (path) => {
        navigate(path);
        handleMenuClose();
    };

    const handleSignOut = () => {
        // Add your sign out logic here
        console.log("Signing out...");
        // For example, navigating to the login page after sign out
        navigate('/login');
    };

    return (
        <AppBar position="static">
            <Toolbar>
                <Avatar
                    edge= "start"
                    src="/EarnNLearn.jpg"
                    alt="Logo"
                    sx={{ width: 50, height: 50, marginBottom: 2, marginTop: 2, marginRight: 2 }}
                />
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    EarnNLearn
                </Typography>
                <IconButton
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    onClick={handleMenuClick}
                >
                    <MenuIcon />
                </IconButton>

                <Button color="inherit" onClick={handleSignOut}>Sign Out</Button>
                <Menu
                    id="menu-appbar"
                    anchorEl={anchorEl}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    open={Boolean(anchorEl)}
                    onClose={handleMenuClose}
                >
                    <MenuItem onClick={() => handleNavigate('/')}>Home</MenuItem>
                    <MenuItem onClick={() => handleNavigate('/about')}>About</MenuItem>
                    <MenuItem onClick={() => handleNavigate('/contact')}>Contact</MenuItem>
                    {/* Add more MenuItem components as needed for additional pages */}
                </Menu>
            </Toolbar>
        </AppBar>
    );
}

export default HeaderBanner;