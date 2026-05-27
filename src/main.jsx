import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ToastProvider } from "./components/Toast";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter future={{ v7_startTransition: true }}>
    <ToastProvider>

      <App />
      
    </ToastProvider>
  </BrowserRouter>
);
