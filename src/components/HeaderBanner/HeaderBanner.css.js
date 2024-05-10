import {
  styled,
  css,
  Avatar as MuiAvatar,
  Typography,
  AppBar as MuiAppbar,
} from "@mui/material";
import { Link as RouteLink } from "react-router-dom";

import {} from "@mui/material";

export const Avatar = styled(MuiAvatar)(
  () => css`
    width: 50px;
    height: 50px;
  `
);

export const Appbar = styled(MuiAppbar)(
  () => css`
    padding-top: 5px;
    padding-bottom: 5px;
  `
);

export const LogoText = styled(Typography)(
  ({ theme }) => css`
    font-size: ${theme.typography.h4};
    flex-grow: 1;
    margin-left: 10px;
    font-weight: 700;
    font-family: "Freeman";
    color: #ff7e87;
  `
);

export const Link = styled(RouteLink)(
  () => css`
    display: flex;
    align-items: center;
    margin-right: auto;
    text-decoration: none;
  `
);
