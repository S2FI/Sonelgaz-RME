import React, { useEffect } from "react";
import { Map, Overlay, View } from "ol";
import { Vector as VectorLayer, Tile as TileLayer } from "ol/layer";
import { Vector as VectorSource, OSM } from "ol/source";
import GeoJSON from "ol/format/GeoJSON";
import { bbox as bboxStrategy } from "ol/loadingstrategy";
import { fromLonLat, toLonLat } from "ol/proj";
import { Circle, Fill, Stroke, Style } from "ol/style";
import GeometryType from "ol/geom/GeometryType";
import Point from "ol/geom/Point";
import GisStyles from "./gisStyles";
import Feature from "ol/Feature";
import Icon from "ol/style/Icon";
import { toStringHDMS } from "ol/coordinate";
import Target from "ol/events/Target";
import GisScale from "./gisScale";
import { ScaleLine } from "ol/control";
import TileWMS from "ol/source/TileWMS";

const GisComponent = () => {
  const container = document.getElementById("popup");
  const content = document.getElementById("popup-content");
  let close = document.getElementById("popup-closer");
  let control;

  control = new ScaleLine({
    bar: true,
    steps: 2,
    minWidth: 140,
  });

  var popup = new Overlay({
    element: container,
    autoPan: true,
    autoPanAnimation: {
      duration: 250,
    },
  });
  popup.setPosition(undefined);

  const marker = new Style({
    image: new Icon({
      anchor: [0.5, 46],
      anchorXUnits: "fraction",
      anchorYUnits: "pixels",
      // imgSize: [20, 20],
      src: "https://openlayers.org/en/latest/examples/data/icon.png",
    }),
  });

  const initMap = () => {
    // const raster = new TileLayer({
    //   source: new OSM(),
    // });
    const wmsSource = new TileWMS({
      url: "http://localhost:8080/geoserver/wms",
      params: {
        LAYERS: "Sonelgaz-RME:alger_project",
        TILED: true,
      },
      serverType: "geoserver",
      crossOrigin: "anonymous",
    });
    const wmsLayer = new TileLayer({
      source: wmsSource,
    });

    const map = new Map({
      target: "map",
      layers: [wmsLayer],
      view: new View({
        center: fromLonLat([3.035556, 36.756111]),
        zoom: 15,
      }),
    });
    [
      "accesssoire",
      "appareilc",
      "jeubarres",
      "liaison",
      "postehtabt",
      "postesource",
    ].map((layer) => {
      const vectorSource = new VectorSource({
        format: new GeoJSON(),
        wrapX: false,
        url: function (extent) {
          return (
            "http://localhost:8080/geoserver/wms?service=WFS&" +
            "version=1.1.0&request=GetFeature&typename=Sonelgaz-RME:" +
            layer +
            "&" +
            "outputFormat=application/json&srsname=EPSG:3857&" +
            "bbox=" +
            // [extent[1], extent[0], extent[3], extent[2]].join
            extent.join(",") +
            ",EPSG:3857"
          );
        },
        strategy: bboxStrategy,
      });

      const vector = new VectorLayer({
        source: vectorSource,
        style: GisStyles(),
      });

      map.addLayer(vector);
      console.log("a layer was added");
    });

    map.addOverlay(popup);

    close.onclick = function () {
      popup.setPosition(undefined);
      close.blur();
      return false;
    };
    map.on("singleclick", function (evt) {
      // Show popup on marker click
      var feature = map.forEachFeatureAtPixel(
        evt.pixel,
        function (feature, layer) {
          console.log(feature);
          return feature;
        }
      );

      // Show popup on marker click
      if (map.hasFeatureAtPixel(evt.pixel) === true) {
        var coordinate = evt.coordinate;
        popup.setPosition(coordinate);
        // Get marker description
        const hdms = toStringHDMS(toLonLat(coordinate));
        content.innerHTML = "<p>You clicked here:</p><code>" + hdms + "</code>";
      } else {
        popup.setPosition(undefined);
        close.blur();
      }
      console.log("Marker clicked/hovered !!!");
    });
    map.addControl(control);
  };

  useEffect(() => {
    initMap();
    console.log("set the map");
    // return () => {
    //   map.setTarget("");
    // };
  }, []);

  return (
    <div>
      <div
        id="map"
        style={{
          width: "1000px",
          height: "600px",
          border: "3 px solid black",
        }}
      ></div>
    </div>
  );
};

export default GisComponent;
