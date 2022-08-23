import React, { useState, useContext } from "react";

// formik
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
import { View, ActivityIndicator, StyleSheet } from "react-native";

//colors
const { darkLight, brand, primary } = Colors;

import DateTP from "./DateTP";
import ImagePickerExample from "./ImageTP";
import axios from "axios";

export default function FormV({ navigation }) {
  const [message, setMessage] = useState();
  const [messageType, setMessageType] = useState();

  const handleSubmit = (credentials) => {
    handleMessage(null);
    if (credentials.code_ouvrage == "" || credentials.description == "") {
      handleMessage("Veuillez remplir les champs");
      setSubmitting(false);
    } else {
      const url = "http://192.168.43.57:7000/api/posts/form-visite";
      axios
        .post(url, credentials)
        .then((response) => {
          const result = response.data.success;
          const data = response.data;
          console.log(data.message);
          handleMessage(data.message);
        })
        .catch((error) => {
          console.log(error);
          handleMessage("An error occurred. Check your network and try again");
          console.log(error.toJSON());
        });
    }
  };

  const handleMessage = (message, type = "") => {
    setMessage(message);
    setMessageType(type);
  };

  return (
    <View>
      <Formik
        initialValues={{ code_ouvrage: "", description: "" }}
        onSubmit={handleSubmit}
      >
        {({ handleChange, handleBlur, handleSubmit, values, isSubmitting }) => (
          <StyledFormArea>
            <DateTP />

            <MyTextInput
              label="Code de l'ouvrage"
              placeholder="Ecrir ici..."
              placeholderTextColor={darkLight}
              onChangeText={handleChange("code_ouvrage")}
              onBlur={handleBlur("code_ouvrage")}
              value={values.code_ouvrage}
              name="code_ouvrage"
              keyboardType="code_ouvrage"
            />
            <MyTextInput
              label="Description"
              placeholder="Ecrir ici..."
              placeholderTextColor={darkLight}
              onChangeText={handleChange("description")}
              onBlur={handleBlur("description")}
              value={values.description}
              name="description"
            />

            <ImagePickerExample />

            <Line />

            <MsgBox type={messageType}>{message}</MsgBox>

            {!isSubmitting && (
              <StyledButton onPress={handleSubmit}>
                <ButtonText>Enregistrer</ButtonText>
              </StyledButton>
            )}
            {isSubmitting && (
              <StyledButton disabled={true}>
                <ActivityIndicator size="large" color={primary} />
              </StyledButton>
            )}
          </StyledFormArea>
        )}
      </Formik>
    </View>
  );
}

const MyTextInput = ({ label, ...props }) => {
  return (
    <View>
      <StyledInputLabel2>{label}</StyledInputLabel2>
      <StyledTextInput2 {...props} />
    </View>
  );
};
