import React, { useState, useContext } from "react";
// formik
import { Formik } from "formik";
import {
  StyledInputLabel,
  StyledFormArea,
  StyledButton,
  StyledTextInput,
  ButtonText,
  Line,
  Colors,
  StyledTextInput2,
} from "./styles";
import { View, ActivityIndicator } from "react-native";
//colors
const { darkLight, brand, primary } = Colors;
import DateTP from "./DateTP";
import ImagePickerExample from "./ImageTP";

export default function FormE({ navigation }) {
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
              label="Numéro du support ou numéro de la portée"
              placeholder="Ecrir ici..."
              placeholderTextColor={darkLight}
              onChangeText={handleChange("code_ouvrage")}
              onBlur={handleBlur("code_ouvrage")}
              value={values.code_ouvrage}
            />
            <MyTextInput
              label="Nombre d'isolateurs cassés"
              placeholder="Ecrir ici..."
              placeholderTextColor={darkLight}
              onChangeText={handleChange("nbr_isolateur_casses")}
              onBlur={handleBlur("nbr_isolateur_casses")}
              value={values.nbr_isolateur_casses}
            />
            <MyTextInput
              label="Fil de fer à dégager"
              placeholder="Ecrir ici..."
              placeholderTextColor={darkLight}
              onChangeText={handleChange("fil_fer_degager")}
              onBlur={handleBlur("fil_fer_degager")}
              value={values.fil_fer_degager}
            />
            <MyTextInput
              label="Conducteur ébréché"
              placeholder="Ecrir ici..."
              placeholderTextColor={darkLight}
              onChangeText={handleChange("conducteur_ebreche")}
              onBlur={handleBlur("conducteur_ebreche")}
              value={values.conducteur_ebreche}
            />
            <MyTextInput
              label="Pont détaché"
              placeholder="Ecrir ici..."
              placeholderTextColor={darkLight}
              onChangeText={handleChange("pont_detache")}
              onBlur={handleBlur("pont_detache")}
              value={values.pont_detache}
            />
            <MyTextInput
              label="Portée déréglée"
              placeholder="Ecrir ici..."
              placeholderTextColor={darkLight}
              onChangeText={handleChange("portee_dereglee")}
              onBlur={handleBlur("portee_dereglee")}
              value={values.portee_dereglee}
            />
            <MyTextInput
              label="Support incliné ou endommagé"
              placeholder="Ecrir ici..."
              placeholderTextColor={darkLight}
              onChangeText={handleChange("support_incline")}
              onBlur={handleBlur("support_incline")}
              value={values.support_incline}
            />
            <MyTextInput
              label="Elagage"
              placeholder="Ecrir ici..."
              placeholderTextColor={darkLight}
              onChangeText={handleChange("elagage")}
              onBlur={handleBlur("elagage")}
              value={values.elagage}
            />
            <MyTextInput
              label="Amements"
              placeholder="Ecrir ici..."
              placeholderTextColor={darkLight}
              onChangeText={handleChange("amements")}
              onBlur={handleBlur("amements")}
              value={values.amements}
            />
            <MyTextInput
              label="Nid de cigogne ou oiseau"
              placeholder="Ecrir ici..."
              placeholderTextColor={darkLight}
              onChangeText={handleChange("nid_oiseau")}
              onBlur={handleBlur("nid_oisea")}
              value={values.nid_oisea}
            />
            <MyTextInput
              label="Observation"
              placeholder="Ecrir ici..."
              placeholderTextColor={darkLight}
              onChangeText={handleChange("observation")}
              onBlur={handleBlur("observation")}
              value={values.observation}
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
      <StyledInputLabel>{label}</StyledInputLabel>
      <StyledTextInput2 {...props} />
    </View>
  );
};
