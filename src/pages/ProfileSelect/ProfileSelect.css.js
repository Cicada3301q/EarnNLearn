import {
  Avatar as MuiAvatar,
  List as MuiList,
  ListItem as MuiListItem,
  ListItemText as MuiListItemText,
  Button as MuiButton,
  css,
  styled,
} from "@mui/material";

export const Avatar = styled(MuiAvatar)(
  () => css`
    width: 100px;
    height: 100px;
    margin-bottom: 16px;
  `
);

export const List = styled(MuiList)(
  () => css`
    margin-top: 16px;
    width: 60%;
    display: flex;
    flex-direction: column;
    gap: 16px;
  `
);

export const MessageContainer = styled("p", {
  shouldForwardProp: (prop) => prop !== "error",
})(
  ({ theme, error }) => css`
    text-align: center;
    font-size: ${theme.typography.h5};
    font-weight: 600;
    color: ${error ? theme.palette.error.main : theme.palette.primary.light};
  `
);

export const ListItem = styled(MuiListItem)(
  ({ theme }) => css`
    display: flex;
    align-items: center;
    padding: 16px;
    border: 1px solid ${theme.palette.grey[400]};
    border-radius: 16px;
    height: 60px;
    gap: 16px;

    :hover {
      background-color: ${theme.palette.grey[300]};
      cursor: pointer;
    }
  `
);

export const ListItemText = styled(MuiListItemText)(
  ({ theme }) => css`
    color: ${theme.palette.text.secondary};
    span {
      font-weight: 700;
    }
  `
);

export const ItemAvatar = styled(MuiAvatar, {
  shouldForwardProp: (prop) => prop !== "backgroundColor",
})(
  ({ theme }) => css`
    background-color: ${theme.palette.primary.main};
  `
);

export const Button = styled(MuiButton)(
  ({ theme }) => css`
    margin-top: 16px;
    background-color: ${theme.palette.secondary.main};
  `
);
