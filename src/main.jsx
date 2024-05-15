import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import ToastProvider from "./components/ToastProvider";
import { ThemeProvider, createTheme } from "@mui/material";
import { CssBaseline } from "@mui/material/";
import { AuthContextProvider } from "./context/AuthContextProvider";

export const themeOptions = createTheme({
  palette: {
    type: "light",
    primary: {
      main: "#165160",
      light: "#44737F",
      dark: "#0F3843",
      contrastText: "#fff",
    },
    secondary: {
      main: "#D95550",
      light: "#E07773",
      dark: "#973B38",
      contrastText: "#fff",
    },
    background: {
      default: "#f1f1f1",
      paper: "#ffffff",
    },
    text: {
      primary: "#D95550",
      secondary: "#0F3843",
    },
    error: {
      main: "#f44336",
      light: "#e57373",
      dark: "#d32f2f",
      contrastText: "#fff",
    },
    success: {
      main: "#4caf50",
      light: "#81c784",
      dark: "#388E3C",
      contrastText: "#000000",
    },
    info: {
      main: "#2196F3",
      light: "#64B5F6",
      dark: "#1976D2",
      contrastText: "#fff",
    },
  },
  typography: {
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 480,
      md: 768,
      lg: 1200,
      xl: 1500,
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // Strict mode causes components to re-render twice in development to check for bugs in rendering impure components
  <React.StrictMode>
    <ThemeProvider theme={themeOptions}>
      <CssBaseline />
      <BrowserRouter>
        <ToastProvider>
          <AuthContextProvider>
            <App />
          </AuthContextProvider>
        </ToastProvider>
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>
);
