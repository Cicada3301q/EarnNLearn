import { css, styled } from "@mui/material";

export const Wrapper = styled("div")(
  () => css`
    max-width: 70%;
    margin-left: auto;
    margin-right: auto;
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
