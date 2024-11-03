import React from 'react';
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

const container = document.querySelector("#root");
const root = createRoot(container);
root.render(
  <BrowserRouter basename="/info474-react-parcel-template">
    <App />
  </BrowserRouter>
);