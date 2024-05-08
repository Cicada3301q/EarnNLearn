import {
  Avatar as MuiAvatar,
  Box as MuiBox,
  Button,
  css,
  styled,
  Typography,
} from "@mui/material";

export const Logo = styled(MuiAvatar)(
  () => css`
    width: 100px;
    height: 100px;
    margin-bottom: 16px;
  `
);

export const List = styled("div")(
  () => css`
    margin-top: 24px;
    padding: 24px;
    width: 60%;
  `
);

export const MessageContainer = styled("div")(
  ({ theme }) => css`
    text-align: center;
    font-size: ${theme.typography.h5};
    font-weight: 600;
    color: ${theme.palette.primary.light};
  `
);

export const ProfileItem = styled(MuiBox)(
  ({ theme }) => css`
    display: flex;
    align-items: center;
    padding: 16px;
    margin-bottom: 8px;
    border: 1px solid ${theme.palette.grey[400]};
    border-radius: 5px;
    height: 60px;
    gap: 16px;

    :hover {
      background-color: ${theme.palette.grey[300]};
      cursor: pointer;
    }
  `
);

export const ItemAvatar = styled(MuiAvatar, {
  shouldForwardProp: (prop) => prop !== "backgroundColor",
})(
  ({ theme }) => css`
    background-color: ${theme.palette.grey[600]};
  `
);

export const ItemText = styled(Typography)(
  ({ theme }) => css`
    font-size: ${theme.typography.h6};
    color: ${theme.palette.text.primary};
  `
);

export const CreateChildButton = styled(Button)(
  () => css`
    margin-top: 16px;
  `
);
