import { styled, css, CircularProgress, Typography } from "@mui/material";

export const ProgressBarContainer = styled("div")(
  () => css`
    position: relative;
    display: inline-flex;
    justify-content: center;
    align-items: center;
  `
);

export const BaseCircularProgressBar = styled(CircularProgress)(
  ({ theme }) => css`
    color: ${theme.palette.grey[300]};
  `
);

export const ValueCircularProgressBar = styled(CircularProgress)(
  ({ theme }) => css`
    color: ${theme.palette.success.main};
    position: absolute;
    top: 0;
    left: 0;
  `
);

export const TextContainer = styled("div")(
  () => css`
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    position: absolute;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  `
);

export const NameText = styled(Typography)(
  ({ theme }) => css`
    color: ${theme.palette.text.primary};
    font-size: ${theme.typography.h5};
  `
);

export const ValueText = styled(Typography)(
  ({ theme }) => css`
    color: ${theme.palette.text.primary};
    font-size: ${theme.typography.h6};
  `
);
export const PercentText = styled(Typography)(
  ({ theme }) => css`
    color: ${theme.palette.text.secondary};
    font-size: ${theme.typography.body2};
  `
);
