import React, { useEffect, useState } from "react";
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
import SearchFeature from "ol-ext/control/SearchFeature";
import Button from "ol-ext/control/Button";
import Select from "ol/interaction/Select";
import { Modal, Popover } from "antd";

const GisComponent = () => {
  const [tren, settren] = useState(0);
  const [vectorSearch, setVectorSearch] = useState();
  const [visible, setVisible] = useState(false);
  let control;
  let search;
  const styles = {};
  const white = [255, 255, 255, 1];
  const blue = "#1F4690"; //rgb(31, 70, 144)
  const red = "#B20600";
  const width = 3;
  control = new ScaleLine({
    bar: true,
    steps: 2,
    minWidth: 140,
  });
  let popup = new Popup();

  let hello = new Button({
    html: '<i class="fa fa-bars"></i>',
    className: "hello",
    title: "",
    handleClick: function () {
      setVisible(true);
    },
  });

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

  const setSymbologyStyleFunction = (feature, resolution) => {
    let featureType = feature.getGeometry().getType();

    let style;
    switch (featureType) {
      case "MultiLineString":
        if (feature.values_.code == null) {
          styles[GeometryType.LINE_STRING] = [
            new Style({
              stroke: new Stroke({
                color: white,
                width: width + 2,
              }),
            }),
            new Style({
              stroke: new Stroke({
                color: red,
                width: width,
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
          // style = new Style({
          //   stroke: new Stroke({
          //     color: "white",
          //     width: width + 2,
          //     lineDash: [0],
          //   }),
          //   fill: new Fill({
          //     color: "blue",
          //     width: width,
          //   }),
          // });
        }
        break;
      case "MultiPolygon":
        styles[GeometryType.POLYGON] = [
          new Style({
            fill: new Fill({
              color: [255, 255, 255, 0.5],
            }),
          }),
        ];
        style = styles[GeometryType.POLYGON];
        break;
    }
    return style;
  };
  const initMap = () => {
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
      feature = map.forEachFeatureAtPixel(evt.pixel, function (feature, layer) {
        let featureType = feature.getGeometry().getType();
        console.log(feature.values_);
        // showModal();
        // document.getElementById("popupButton")?.on("click", function () {
        //   console.log("pppppppppppppppppp");
        // });
        return feature.values_;
      });
      console.log(feature);
      settren(feature);

      if (map.hasFeatureAtPixel(evt.pixel) === true) {
        let coordinate = evt.coordinate;
        const hdms = toStringHDMS(toLonLat(coordinate));
        if (feature.code == null) {
          popup.show(coordinate, `Non identifier`);
        } else {
          // popup.show(
          //   coordinate,
          //   `code d'ouvrage: <b>${feature.code}</b><br/> etat: <b>${feature.etat_s}</b> <br/> code de depart: <b>${feature.numdepart}</b>`
          // );
        }
      } else {
        popup.hide();
      }
      console.log("Marker clicked/hovered !!!");
    });

    // Control Select
    const select = new Select({
      style: new Style({
        fill: new Fill({
          color: "#eeeeee",
        }),
        stroke: new Stroke({
          color: "green",
          width: 5,
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
      map.getView().animate({ center: p, zoom: 17 });
      popup.show(
        p,
        `code d'ouvrage: <b>${feature.code}</b><br/> etat: <b>${feature.etat_s}</b> <br/> code de depart: <b>${feature.numdepart}</b>`
      );
    });
  };

  useEffect(() => {
    initMap();
    console.log("set the map");
    // return () => {
    //   map.setTarget("");
    // };
  }, []);
  const handleCancel = () => {
    console.log("Clicked cancel button");
    setVisible(false);
  };
  const showModal = () => {
    setVisible(true);
  };

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
      <Modal
        title="MAP LELOUCHA"
        visible={visible}
        destroyOnClose="true"
        onCancel={handleCancel}
        footer={[]}
        mask={false}
        width={500}
      >
        <p>{tren?.code}</p>
      </Modal>
    </React.Fragment>
  );
};

export default GisComponent;
