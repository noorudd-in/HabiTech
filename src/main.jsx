import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { HabitechContextProvider } from "./contexts/HabitechContext.jsx";

import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HabitechContextProvider>
      <App />
    </HabitechContextProvider>
  </React.StrictMode>
);
