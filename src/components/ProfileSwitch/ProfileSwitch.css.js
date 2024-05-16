import {
  styled,
  css,
  ToggleButtonGroup as MuiToggleButtonGroup,
  ToggleButton as MuiToggleButton,
} from "@mui/material";

export const ToggleButtonGroup = styled(MuiToggleButtonGroup)(
  ({ theme }) => css`
    margin: 24px 0;
    button {
      margin: 0;
    }

    & .MuiToggleButtonGroup-grouped {
      border: 0;

      &:not(:first-of-type) {
        border-radius: ${theme.shape.borderRadius};
      }

      &:first-of-type {
        border-radius: ${theme.shape.borderRadius};
      }
    }
  `
);

export const ToggleButton = styled(MuiToggleButton)(
  ({ theme }) => css`
    &.MuiButtonBase-root {
      margin: 0;
    }

    &.Mui-selected,
    &.Mui-selected:hover {
      color: white;
      background-color: ${theme.palette.secondary.light};
    }
    background-color: ${theme.palette.primary.contrastText};
    color: black;

    &:hover {
      background-color: lightblue;
    }
  `
);
