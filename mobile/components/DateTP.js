import { Platform, StyleSheet, Button, Text, View } from "react-native";
import React, { useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Formik } from "formik";
import {
  StyledInputLabel2,
  StyledTextInput2,
  StyledFormArea,
  StyledButton,
  ButtonText,
  MsgBox,
  Line,
  Colors,
} from "./styles";
export default function DateTP() {
  const data = [
    {
      pr: "rrr",
      kr: "3rr",
    },
    {
      pr: "zzz",
      kr: "khrrr",
    },
  ];

  return (
    <View>
      {["data", "beriwet"].map((data) => {
        <Text>{data}</Text>;
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
