import React, { useState } from "react";
import { Toolbar, Button, IconButton, Menu, MenuItem } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";
import { callApi } from "../../utils/api.util";
import { METHOD } from "../../constants/enums";
import * as S from "./HeaderBanner.css";
import { toast } from "react-toastify";

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

  const handleSignOut = async () => {
    try {
      await callApi("/api/user/logout", METHOD.POST);
      navigate("/login");
    } catch (error) {
      toast.error("Sorry, we failed to log you out");
    }
  };

  return (
    <S.Appbar position="static">
      <Toolbar>
        <S.Link to={"/profiles"}>
          <S.Avatar src="/EarnNLearn.jpg" alt="Logo" />
          <S.LogoText>EarnNLearn</S.LogoText>
        </S.Link>
        <IconButton color="inherit" onClick={handleMenuClick}>
          <MenuIcon />
        </IconButton>

        <Button color="inherit" onClick={handleSignOut}>
          Sign Out
        </Button>
        <Menu
          id="menu-appbar"
          keepMounted
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={() => handleNavigate("/")}>Home</MenuItem>
          <MenuItem onClick={() => handleNavigate("/about")}>About</MenuItem>
          <MenuItem onClick={() => handleNavigate("/contact")}>
            Contact
          </MenuItem>
        </Menu>
      </Toolbar>
    </S.Appbar>
  );
}

export default HeaderBanner;
