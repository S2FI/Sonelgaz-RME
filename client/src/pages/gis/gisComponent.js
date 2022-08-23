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
import Legend from "./legend";
import { ScaleLine } from "ol/control";
import TileWMS from "ol/source/TileWMS";
import Popup from "ol-popup";

const GisComponent = () => {
  // const container = document.getElementById("popup");
  // const content = document.getElementById("popup-content");
  // let close = document.getElementById("popup-closer");
  let control;

  control = new ScaleLine({
    bar: true,
    steps: 2,
    minWidth: 140,
  });
  let popup = new Popup();
  // let popup = new Overlay({
  //   element: container,
  //   autoPan: true,
  //   autoPanAnimation: {
  //     duration: 250,
  //   },
  // });
  // popup.setPosition(undefined);

  // const marker = new Style({
  //   image: new Icon({
  //     anchor: [0.5, 46],
  //     anchorXUnits: "fraction",
  //     anchorYUnits: "pixels",
  //     // imgSize: [20, 20],
  //     src: "https://openlayers.org/en/latest/examples/data/icon.png",
  //   }),
  // });
  const setSymbologyStyleFunction = (feature, resolution) => {
    let featureType = feature.getGeometry().getType();

    let style;
    switch (featureType) {
      case "MultiLineString":
        if (feature.values_.code == null) {
          style = new Style({
            stroke: new Stroke({
              color: "red",
              width: 2,
            }),
          });
        } else {
          style = new Style({
            stroke: new Stroke({
              color: "white",
              width: 2,
              lineDash: [0],
            }),
          });
        }
        break;
      case "MultiPolygon":
        style = new Style({
          stroke: new Stroke({
            color: "blue",
            width: 4,
          }),
          fill: new Fill({
            color: "aqua",
          }),
        });
        break;
    }
    return style;
  };
  const initMap = () => {
    let tileLayers = [];
    // const raster = new TileLayer({
    //   source: new OSM(), "roads_free_1_clip",
    //"places_free_1_poly_clip",
    // });

    ["commune_sda", "gis_osm_buildings_a_free_1_c", "roads_free_1_clip"].map(
      (layer) => {
        const wmsSource = new TileWMS({
          url: "http://localhost:8080/geoserver/wms",
          params: {
            LAYERS: layer,
            TILED: true,
          },
          serverType: "geoserver",
          crossOrigin: "anonymous",
        });
        const wmsLayer = new TileLayer({
          source: wmsSource,
        });

        tileLayers.push(wmsLayer);
        console.log("a tile layer was added");
      }
    );

    const map = new Map({
      target: "map",
      layers: tileLayers,
      view: new View({
        center: fromLonLat([3.035556, 36.756111]),
        zoom: 15,
      }),
    });

    ["postesource", "postehtabt", "appareilc", "jeubarres", "liaison"].map(
      (layer) => {
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
          style: setSymbologyStyleFunction,
        });

        map.addLayer(vector);
        console.log("a layer was added");
      }
    );

    map.addOverlay(popup);

    // try {
    //   close.onclick = function () {
    //     popup.setPosition(undefined);
    //     close.blur();
    //     return false;
    //   };
    // } catch (error) {
    //   console.log("Close function", error);
    // }
    let feature = {};
    map.on("singleclick", function (evt) {
      // Show popup on marker click
      feature = map.forEachFeatureAtPixel(evt.pixel, function (feature, layer) {
        let featureType = feature.getGeometry().getType();
        console.log(feature);
        return feature.values_;
      });
      console.log(feature);
      // Show popup on marker click
      if (map.hasFeatureAtPixel(evt.pixel) === true) {
        let coordinate = evt.coordinate;
        const hdms = toStringHDMS(toLonLat(coordinate));
        popup.show(
          coordinate,
          `code d'ouvrage: <b>${feature.code}</b><br/> etat: <b>${feature.etat_s}</b> <br/> code de depart: <b>${feature.numdepart}</b>`
        );
        // popup.setPosition(coordinate);
        // Get marker description

        // content.innerHTML = "<p>You clicked here:</p><code>" + hdms + "</code>";
      } else {
        // popup.setPosition(undefined);
        // close.blur();
        popup.hide();
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
    <React.Fragment>
      <div
        id="map"
        style={{
          width: "100%",
          height: "600px",
          border: "3 px solid black",
          margin: "0px",
        }}
      ></div>
      <Legend />
    </React.Fragment>
  );
};

export default GisComponent;
