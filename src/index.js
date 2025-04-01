import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "./fonts/fonts.css";
import "./components/ui/common.css";
import "./components/ui/box.css";
import App from "./components/app/app";
import reportWebVitals from "./reportWebVitals";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

// Si quieres empezar a medir el rendimiento de tu aplicación, pasa una función
// para registrar los resultados (por ejemplo: reportWebVitals(console.log))
// o envíala a un endpoint de análisis. Más información: https://bit.ly/CRA-vitals
reportWebVitals();
