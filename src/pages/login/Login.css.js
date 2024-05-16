import { styled, css, Typography, Button } from "@mui/material";

export const Title = styled(Typography)(
  ({ theme }) => css`
    color: ${theme.palette.secondary.main};
    font-size: ${theme.typography.h3};
    font-weight: 700;
    font-family: "Freeman";
  `
);

export const Form = styled("form")(
  () => css`
    margin-top: 40px;
  `
);

export const RegisterText = styled(Typography)(
  () => css`
    a {
      margin-left: 4px;
    }
  `
);

export const LoginButton = styled(Button)(
  () => css`
    margin-top: 24px;
  `
);
