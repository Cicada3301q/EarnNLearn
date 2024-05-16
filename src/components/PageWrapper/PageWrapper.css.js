import { css, styled } from "@mui/material";

export const Wrapper = styled("div")(
  ({ theme }) => css`
    width: 100%;
    margin-left: auto;
    margin-right: auto;

    ${theme.breakpoints.up("xs")} {
      width: 90%;
    }

    ${theme.breakpoints.up("sm")} {
      width: 80%;
    }
  `
);

export const Content = styled("div")(
  () => css`
    margin-top: 24px;
    display: flex;
    flex-direction: column;
    align-items: center;
  `
);
