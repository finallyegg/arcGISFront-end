import React, { useEffect, useRef, useState } from "react";
import { loadModules } from "esri-loader";
const axios = require("axios");

export const Stat = () => {
  const [st, setSt] = useState("null");

  useEffect(() => {
    async function sendData() {
      const sendURL =
        "http://ec2-54-159-32-235.compute-1.amazonaws.com:5000/send_location";
      await axios.get(sendURL);

      const fetchUrl =
        "http://ec2-54-159-32-235.compute-1.amazonaws.com:5000/locations";
      const response = await axios.get(fetchUrl);
      setSt(JSON.stringify(response.data.Items));
    }
    sendData();
  }, []);

  return <p> {st}</p>;
};
export const WebMapView = () => {
  const mapRef = useRef();
  //   With the useRef() hook, you can get a reference to a DOM element that is created with a React component.
  //   With the useEffect() hook, you can manage lifecycle events such as assigning a container to an instance of
  //   a MapView when the component is rendered.

  useEffect(() => {
    // lazy load the required ArcGIS API for JavaScript modules and CSS
    loadModules(
      [
        "esri/Map",
        "esri/views/MapView",
        "esri/Graphic",
        "esri/layers/GraphicsLayer",
      ],
      { css: true }
    ).then(async ([ArcGISMap, MapView, Graphic, GraphicsLayer]) => {
      const map = new ArcGISMap({
        basemap: "streets",
      });

      const fetchUrl =
        "http://ec2-54-159-32-235.compute-1.amazonaws.com:5000/locations";
      const response = await axios.get(fetchUrl);
      console.log(response.data.Items);

      const points = response.data.Items;

      var simpleMarkerSymbol = {
        type: "simple-marker",
        color: [226, 119, 40], // orange
        outline: {
          color: [255, 255, 255], // white
          width: 1,
        },
      };

      var graphicsLayer = new GraphicsLayer({});
      map.add(graphicsLayer);

      for (var i = 0; i < response.data.Count; i++) {
        var point = {
          type: "point",
          longitude: points[i].Long.N,
          latitude: points[i].Lat.N,
        };
        var pointGraphic = new Graphic({
          geometry: point,
          symbol: simpleMarkerSymbol,
        });

        graphicsLayer.add(pointGraphic);
      }

      // load the map view at the ref's DOM node
      const view = new MapView({
        // using of container
        container: mapRef.current,
        map: map,
        center: [-100, 40],
        zoom: 4,
      });

      return () => {
        if (view) {
          // destroy the map view
          view.container = null;
        }
      };
    });
  });

  return <div className="webmap" ref={mapRef} />;
};
