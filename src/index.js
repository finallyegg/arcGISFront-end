import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "./arcgis/mapCSS.css";
import App from "./App";
import { WebMapView, Stat } from "./arcgis/webMapView";
import * as serviceWorker from "./serviceWorker";

ReactDOM.render(
  <React.StrictMode>
    {/* <App /> */}

    <WebMapView />
    <Stat />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
