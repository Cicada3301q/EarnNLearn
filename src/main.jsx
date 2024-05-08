import React from "react";
import ReactDOM from "react-dom/client";
import "./main.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import ToastProvider from "./components/ToastProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // Strict mode causes components to re-render twice in development to check for bugs in rendering impure components
  <React.StrictMode>
    <BrowserRouter>
      <ToastProvider>
        <App />
      </ToastProvider>
    </BrowserRouter>
  </React.StrictMode>
);
