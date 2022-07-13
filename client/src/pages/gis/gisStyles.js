import { Circle, Fill, Stroke, Style } from "ol/style";
import GeometryType from "ol/geom/GeometryType";

const GisStyles = (props) => {
  const styles = {};
  const white = [255, 255, 255, 1];
  const blue = [0, 153, 255, 1];
  const width = 3;

  styles[GeometryType.POLYGON] = [
    new Style({
      fill: new Fill({
        color: [255, 255, 255, 0.5],
      }),
    }),
  ];
  styles[GeometryType.MULTI_POLYGON] = styles[GeometryType.POLYGON];

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
  styles[GeometryType.MULTI_LINE_STRING] = styles[GeometryType.LINE_STRING];

  styles[GeometryType.CIRCLE] = styles[GeometryType.POLYGON].concat(
    styles[GeometryType.LINE_STRING]
  );

  styles[GeometryType.POINT] = [
    new Style({
      image: new Circle({
        radius: width * 2,
        fill: new Fill({
          color: blue,
        }),
        stroke: new Stroke({
          color: white,
          width: width / 2,
        }),
      }),
      zIndex: Infinity,
    }),
  ];
  styles[GeometryType.MULTI_POINT] = styles[GeometryType.POINT];

  styles[GeometryType.GEOMETRY_COLLECTION] = styles[
    GeometryType.POLYGON
  ].concat(styles[GeometryType.LINE_STRING], styles[GeometryType.POINT]);

  return styles[GeometryType.GEOMETRY_COLLECTION];
};
export default GisStyles;
