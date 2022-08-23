import "ol/ol.css";
import Map from "ol/Map";
import OSM from "ol/source/OSM";
import TileLayer from "ol/layer/Tile";
import View from "ol/View";
import { ScaleLine, defaults as defaultControls } from "ol/control";

const GisScale = (props) => {
  const unitsSelect = document.getElementById("units");
  const typeSelect = document.getElementById("type");
  const stepsSelect = document.getElementById("steps");
  const scaleTextCheckbox = document.getElementById("showScaleText");
  const showScaleTextDiv = document.getElementById("showScaleTextDiv");

  let scaleType = "scaleline";
  let scaleBarSteps = 4;
  let scaleBarText = true;
  let control;

  control = new ScaleLine({
    bar: true,
    steps: 2,
    minWidth: 140,
  });

  props.map.addControl(control);
};

export default GisScale;
