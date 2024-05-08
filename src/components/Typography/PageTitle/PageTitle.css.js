import { Typography as MuiTypography, css, styled } from "@mui/material";

export const PageTitle = styled(MuiTypography)(
  ({ theme }) => css`
    font-size: ${theme.typography.h3};
    color: ${theme.palette.text.primary};
    font-weight: 600;
  `
);
