import {
  styled,
  css,
  List as MuiList,
  ListItem as MuiListItem,
  Select as MuiSelect,
  MenuItem as MuiMenuItem,
  Typography,
  Button as MuiButton,
} from "@mui/material";
import { CHORE_STATUS } from "../../constants/enums";

const getStatusColor = (theme, status) => {
  switch (status) {
    case CHORE_STATUS.COMPLETED:
      return theme.palette.success.main;
    case CHORE_STATUS.APPROVAL:
      return "orange";
    case CHORE_STATUS.NOT_ACCEPTED:
      return theme.palette.error.main;
    case CHORE_STATUS.IN_PROGRESS:
      return theme.palette.info.main;
    default:
      return "inherit";
  }
};

export const List = styled(MuiList)(
  ({ theme }) => css`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 16px;

    ${theme.breakpoints.up("md")} {
      width: 75%;
    }

    ${theme.breakpoints.up("lg")} {
      width: 50%;
    }
  `
);

export const ListItem = styled(MuiListItem)(
  ({ theme }) => css`
    display: flex;
    border-radius: 16px;
    background-color: ${theme.palette.secondary.contrastText};
    box-shadow: 0px 3px 3px -2px rgb(0 0 0 / 20%),
      0px 3px 4px 0px rgb(0 0 0 / 14%), 0px 1px 8px 0px rgb(0 0 0 / 12%);
    width: 100%;
    padding: 0;

    .reward-container {
      display: flex;
      align-items: center;
      height: 100%;
      margin-right: 16px;
      background-color: ${theme.palette.primary.light};
      padding: 16px;
      border-radius: 16px 0 0 16px;

      p {
        font-size: ${theme.typography.h6};
        color: ${theme.palette.success.light};
        font-weight: 600;
      }
    }
  `
);

export const ItemContainer = styled("div")(
  () => css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    width: 100%;

    .chore-status-container {
      display: flex;
      margin-top: 4px;
      gap: 8px;
    }

    .options-container {
      margin-right: 16px;
    }
  `
);

export const SecondaryText = styled(Typography)(
  ({ theme, status }) => css`
    font-size: ${theme.typography.body2};
    color: ${!status && theme.palette.text.secondary};

    color: ${!status
      ? theme.palette.text.secondary
      : getStatusColor(theme, status)};
  `
);

export const Select = styled(MuiSelect)(
  ({ theme }) => css`
    div {
      padding: 8px;
      font-size: ${theme.typography.body2};
    }
  `
);

export const MenuItem = styled(MuiMenuItem)(
  ({ theme }) => css`
    font-size: ${theme.typography.body2};
  `
);

export const Chip = styled("div")(
  ({ theme, status }) => css`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 20px;
    padding: 1px 8px;
    border-radius: 25px;
    border: 2px solid ${getStatusColor(theme, status)};

    span {
      color: ${getStatusColor(theme, status)};
      font-size: ${theme.typography.caption};
    }
  `
);

export const Button = styled(MuiButton)(
  () => css`
    margin-top: 16px;
  `
);
