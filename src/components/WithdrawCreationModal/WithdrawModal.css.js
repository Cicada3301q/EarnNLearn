import { styled, css, Modal as MuiModal, Typography } from "@mui/material";

export const Modal = styled(MuiModal)(
  ({ theme }) => css`
    .MuiBackdrop-root {
      background-color: rgba(0, 0, 0, 0.5);
    }

    .MuiPaper-root {
      position: relative;
      background-color: ${theme.palette.background.paper};
      top: 25%;
      margin: auto;
      padding: 20px;
      border-radius: 16px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
      width: 50%;
      outline: none;
    }
  `
);

export const Title = styled(Typography)(
  ({ theme }) => css`
    font-size: ${theme.typography.h4};
    font-weight: 700;
    margin-bottom: 28px;
  `
);
