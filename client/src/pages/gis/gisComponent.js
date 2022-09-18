import React, { useEffect, useRef, useState } from "react";
import "ol/ol.css";
import { Map, Overlay, View } from "ol";
import { Vector as VectorLayer, Tile as TileLayer } from "ol/layer";
import { Vector as VectorSource, OSM } from "ol/source";
import GeoJSON from "ol/format/GeoJSON";
import { bbox as bboxStrategy } from "ol/loadingstrategy";
import { fromLonLat, toLonLat } from "ol/proj";
import { Circle, Fill, Stroke, Style } from "ol/style";
import GeometryType from "ol/geom/GeometryType";
import { toStringHDMS } from "ol/coordinate";
import Legend from "./legend";
import { ScaleLine } from "ol/control";
import TileWMS from "ol/source/TileWMS";
import Popup from "ol-popup";
import SearchFeature from "ol-ext/control/SearchFeature";
import Button from "ol-ext/control/Button";
import Select from "ol/interaction/Select";
import * as antd from "antd";
import { Store } from "react-notifications-component";
import GisModal from "./gisModal";
import { getMap } from "../../api/planning";

const GisComponent = () => {
  const [tren, settren] = useState(0);
  const [mapC, setmapC] = useState([]);
  const [visible, setVisible] = useState(false);
  const stateRef = useRef();
  stateRef.current = tren;
  let control;
  let search;
  const styles = {};
  const white = [255, 255, 255, 1];
  const blue = "#1F4690"; //rgb(31, 70, 144)
  const red = "#B20600";
  const visite = "#ffc100";
  const entretien = "#ff7400";
  const maintenance = "#ff0000";
  const disabled = "#dddddd";
  const green = "#d5ff75";
  const myblue = [0, 153, 255, 1];
  const width = 3;

  const mapColorData = async () => {
    await getMap()
      .then((result) => {
        setmapC(result.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    mapColorData();
  }, []);
  const InsertNotifError = () => {
    Store.addNotification({
      title: "GIS",
      message: "Veuillez choisir un ouvrage sur la map",
      type: "danger",
      insert: "top",
      container: "top-right",
      animationIn: ["animate__animated", "animate__fadeIn"],
      animationOut: ["animate__animated", "animate__fadeOut"],
      dismiss: {
        duration: 3000,
        onScreen: true,
      },
    });
  };
  //button modal
  let hello = new Button({
    html: '<i class="fa fa-bars"></i>',
    className: "hello",
    title: "",
    handleClick: function () {
      console.log(stateRef.current);
      stateRef.current != undefined && stateRef.current != 0
        ? setVisible(true)
        : InsertNotifError();
    },
  });

  //les controles
  control = new ScaleLine({
    bar: true,
    steps: 2,
    minWidth: 140,
  });
  let popup = new Popup();

  new VectorSource({
    format: new GeoJSON(),
    wrapX: false,
    url: function (extent) {
      return (
        "http://localhost:8080/geoserver/wms?service=WFS&" +
        "version=1.1.0&request=GetFeature&typename=Sonelgaz-RME:liaison&" +
        "outputFormat=application/json&srsname=EPSG:3857&" +
        "bbox=" +
        // [extent[1], extent[0], extent[3], extent[2]].join
        extent.join(",") +
        ",EPSG:3857"
      );
    },
    strategy: bboxStrategy,
  });
  //Styling function
  const setSymbologyStyleFunction = (feature, resolution) => {
    let featureType = feature.getGeometry().getType();

    let style;
    switch (featureType) {
      case "MultiLineString":
        if (feature.values_.code == null) {
          styles[GeometryType.LINE_STRING] = [
            new Style({
              stroke: new Stroke({
                color: disabled,
                width: 1,
              }),
            }),
          ];
          style = styles[GeometryType.LINE_STRING];
        } else if (mapC[1]?.Entretien.includes(feature.values_.code)) {
          styles[GeometryType.LINE_STRING] = [
            new Style({
              stroke: new Stroke({
                color: white,
                width: 6,
              }),
            }),
            new Style({
              stroke: new Stroke({
                color: entretien,
                width: 4,
              }),
            }),
          ];
          style = styles[GeometryType.LINE_STRING];
        } else if (mapC[2]?.Maintenance.includes(feature.values_.code)) {
          styles[GeometryType.LINE_STRING] = [
            new Style({
              stroke: new Stroke({
                color: white,
                width: 6,
              }),
            }),
            new Style({
              stroke: new Stroke({
                color: maintenance,
                width: 4,
              }),
            }),
          ];
          style = styles[GeometryType.LINE_STRING];
        } else if (mapC[0]?.Visite.includes(feature.values_.code)) {
          styles[GeometryType.LINE_STRING] = [
            new Style({
              stroke: new Stroke({
                color: white,
                width: 6,
              }),
            }),
            new Style({
              stroke: new Stroke({
                color: visite,
                width: 4,
              }),
            }),
          ];
          style = styles[GeometryType.LINE_STRING];
        } else {
          styles[GeometryType.LINE_STRING] = [
            new Style({
              stroke: new Stroke({
                color: white,
                width: width + 2,
              }),
            }),
            new Style({
              stroke: new Stroke({
                color: blue,
                width: width,
              }),
            }),
          ];
          style = styles[GeometryType.LINE_STRING];
        }
        break;
      case "MultiPolygon":
        style = new Style({
          stroke: new Stroke({
            color: "black",
          }),
          fill: new Fill({
            color: green,
          }),
        });
        break;

      case "Polygon": {
        style = new Style({
          stroke: new Stroke({
            color: "black",
          }),
          fill: new Fill({
            color: green,
          }),
        });
        break;
      }
    }
    return style;
  };

  //map initialisation
  const initMap = () => {
    if (mapC.length !== 0) {
      let tileLayers = [];
      //"roads_free_1_clip"
      ["commune_sda", "gis_osm_buildings_a_free_1_c"].map((layer) => {
        const wmsSource = new TileWMS({
          url: "http://localhost:8080/geoserver/wms",
          params: {
            LAYERS: layer,
            TILED: true,
            STYLES: undefined,
          },
          serverType: "geoserver",
          crossOrigin: "anonymous",
        });
        const wmsLayer = new TileLayer({
          source: wmsSource,
        });

        tileLayers.push(wmsLayer);
        console.log("a tile layer was added");
      });

      const map = new Map({
        target: "map",
        layers: tileLayers,
        view: new View({
          center: fromLonLat([3.035556, 36.756111]),
          zoom: 15,
        }),
      });

      ["postesource", "postehtabt", "liaison"].map((layer) => {
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

        if (layer == "liaison") {
          console.log("search", layer);
          search = new SearchFeature({
            //target: $(".options").get(0),
            source: vectorSource,
            getTitle: function (feature) {
              return feature.values_.code;
            },
          });
        }
      });

      map.addOverlay(popup);
      map.addControl(hello);
      let feature = {};
      map.on("singleclick", function (evt) {
        feature = map.forEachFeatureAtPixel(
          evt.pixel,
          function (feature, layer) {
            let featureType = feature.getGeometry().getType();
            //console.log(feature.values_);
            return feature.values_;
          }
        );
        //console.log(feature);
        settren(feature);
        if (map.hasFeatureAtPixel(evt.pixel) === true) {
          let coordinate = evt.coordinate;
          const hdms = toStringHDMS(toLonLat(coordinate));
          if (feature.code == null) {
            popup.show(coordinate, `Ouvrage non identifier`);
          } else {
            popup.show(
              coordinate,
              `<b>code de depart</b>: ${feature.numdepart}<br/> <b>code d'ouvrage</b>:${feature.code}<br/>
            <b>coordonée</b>: ${hdms}<br/>
            <h6>.....pour plus d'informations veuillez appuyez sur <i class="fa fa-bars"></i></h6> `
            );
          }
        } else {
          popup.hide();
        }
        //console.log("Marker clicked/hovered !!!");
      });

      // Control Select
      const select = new Select({
        style: new Style({
          stroke: new Stroke({
            color: "green",
            width: width + 3,
          }),
          stroke: new Stroke({
            color: myblue,
            width: width + 1,
          }),
        }),
      });

      map.addInteraction(select);
      map.addControl(search);
      console.log(search);
      map.addControl(control);
      // Select feature when click on the reference index
      search.on("select", function (e) {
        popup.hide();
        select.getFeatures().clear();
        select.getFeatures().push(e.search);
        console.log("search event=>", e);

        let p = e.search.getGeometry().getFirstCoordinate();
        let feature = e.search.values_;
        const hdms = toStringHDMS(toLonLat(p));
        map.getView().animate({ center: p, zoom: 17 });
        settren(feature);
        popup.show(
          p,
          `<b>code de depart</b>: ${feature.numdepart}<br/> <b>code d'ouvrage</b>:${feature.code}<br/> 
        <b>coordonée</b>: ${hdms}<br/>
        <h6>.....pour plus d'informations veuillez appuyez sur <i class="fa fa-bars"></i></h6>`
        );
      });
    }
  };
  useEffect(() => {
    initMap();
    console.log("set the map");
  }, [mapC]);
  const handleCancel = () => {
    setVisible(false);
  };
  console.log(mapC);
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
      <GisModal
        visibilite={visible}
        hidemodal={handleCancel}
        ouvrage={tren?.code}
      />
    </React.Fragment>
  );
};

export default GisComponent;
