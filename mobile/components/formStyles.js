import { Colors } from "./styles";
import styled from "styled-components/native";
export const StyledCard = styled.View`
  height: 250px;
  width: 90%;
  alignitems: "center";
  justifycontent: "center";

  bordercolor: ${Colors.brand};
  //   borderwidth: 2px;
  shadowcolor: ${Colors.brand};

  elevation: 1;
  flexdirection: "row";
  justifycontent: "space-between";
  padding-left: 35px;
  padding-right: 35px;
  margin-top: 6px;
  margin-bottom: 6px;
  margin-left: 4px;
  margin-right: 4px;
  background-color: ${Colors.primary};
`;
