import {
  Avatar as MuiAvatar,
  Box as MuiBox,
  Button,
  css,
  styled,
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
    width: 100%;
  `
);

export const ProfileItem = styled(MuiBox)(
  () => css`
    display: flex;
    align-items: center;
    padding: 16px;
    margin-bottom: 8px;
    border: 1px solid #ccc;
    border-radius: 5px;
    height: 60px;
    gap: 16px;

    :hover {
      background-color: #f0f0f0;
      cursor: pointer;
    }
  `
);

export const ItemAvatar = styled(MuiAvatar, {
  shouldForwardProp: (prop) => prop !== "backgroundColor",
})(
  ({ backgroundColor }) => css`
    background-color: ${backgroundColor};
  `
);

export const CreateChildButton = styled(Button)(
  () => css`
    margin-top: 16px;
  `
);
