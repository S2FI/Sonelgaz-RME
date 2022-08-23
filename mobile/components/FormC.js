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

export default function FormC({ navigation }) {
  const [message, setMessage] = useState();
  const [messageType, setMessageType] = useState();

  const handleMessage = (message, type = "") => {
    setMessage(message);
    setMessageType(type);
  };

  return (
    <View>
      <Formik
        initialValues={{
          code_ouvrage: "",
          emplacement: "",
          raison_panne: "",
          description: "",
        }}
        onSubmit={(values, { setSubmitting }) => {
          if (
            values.code_ouvrage == "" ||
            values.emplacement == "" ||
            values.raison_panne == "" ||
            values.description == ""
          ) {
            handleMessage("Veuillez remplir les champs");
            setSubmitting(false);
          } else {
            setSubmitting(true);
            console.log(code_ouvrage, emplacement, raison_panne, description);
          }
        }}
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
              keyboardType="code_ouvrage-address"
            />
            <MyTextInput
              label="Emplacement"
              placeholder="Ecrir ici..."
              placeholderTextColor={darkLight}
              onChangeText={handleChange("emplacement")}
              onBlur={handleBlur("emplacement")}
              value={values.emplacement}
            />
            <MyTextInput
              label="Raison de la panne"
              placeholder="Ecrir ici..."
              placeholderTextColor={darkLight}
              onChangeText={handleChange("raison_panne")}
              onBlur={handleBlur("raison_panne")}
              value={values.raison_panne}
            />
            <MyTextInput
              label="Description"
              placeholder="Ecrir ici..."
              placeholderTextColor={darkLight}
              onChangeText={handleChange("description")}
              onBlur={handleBlur("description")}
              value={values.description}
            />
            <ImagePickerExample />

            <Line />

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
