import React, { useState, useContext, useEffect } from "react";
import { Picker } from "@react-native-picker/picker";
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
} from "../styles";
import {
  View,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  Text,
} from "react-native";

//colors
const { darkLight, brand, primary } = Colors;

import ImagePickerExample from "../ImageTP";
import axios from "axios";
import Environments from "../../constants/Env";
import { showMessage, hideMessage } from "react-native-flash-message";

export default function UpdateFormV(props) {
  const [action, setaction] = useState(props.updateData.action);
  const [code_ouvrage, setcode_ouvrage] = useState(
    props.updateData.code_ouvrage
  ); //props.listOuvrage[0]
  const [list, setlist] = useState([]);
  const handleSubmit = (values, setSubmitting) => {
    const valuesToSend = {
      ...values,
      action,
      code_ouvrage,
    };
    setSubmitting(true);
    const url = `http://${Environments.MOBILE_URL}:7000/api/posts/update_visite/${props.updateData.id_form}`;
    axios
      .put(url, valuesToSend)
      .then((response) => {
        const data = response.data;
        showMessage({
          message: "Update",
          description: data.message,
          type: "success",
        });
        props.reload()
      })
      .catch((error) => {
        console.log(error);

        console.log(error.toJSON());
      });
    props.statechange(false);
    console.log(valuesToSend);
  };

  useEffect(() => {
    setlist(props.listOuvrage);
  }, [props.listOuvrage]);

  return (
    <View>
      <Formik
        initialValues={{
          description: props.updateData.description,
          titre_formulaire: props.updateData.titre_formulaire,
        }}
        onSubmit={(values, { setSubmitting }) =>
          handleSubmit(values, setSubmitting)
        }
      >
        {({ handleChange, handleBlur, handleSubmit, values, isSubmitting }) => (
          <StyledFormArea>
            <MyTextInput
              label="Titre formulaire"
              placeholder="Titre..."
              placeholderTextColor={darkLight}
              onChangeText={handleChange("titre_formulaire")}
              onBlur={handleBlur("titre_formulaire")}
              value={values.titre_formulaire}
            />
            <Text style={{ fontSize: 12 }}>Code de l'ouvrage</Text>
            <View
              style={{
                borderWidth: 1,
                borderRadius: 5,
                height: 40,
                backgroundColor: "#e1e2e6",
                borderColor: "#e1e2e6",
                marginBottom: 10,
              }}
            >
              <Picker
                style={{ bottom: 8 }}
                selectedValue={code_ouvrage}
                onValueChange={(itemValue, itemIndex) =>
                  setcode_ouvrage(itemValue)
                }
              >
                {list?.map((ouvrage) => (
                  <Picker.Item
                    label={ouvrage}
                    value={ouvrage}
                    key={ouvrage}
                    style={{ fontSize: 13 }}
                  />
                ))}
              </Picker>
            </View>
            <Text style={{ fontSize: 12 }}>Action a performer</Text>
            <View
              style={{
                borderWidth: 1,
                borderRadius: 5,
                height: 40,
                backgroundColor: "#e1e2e6",
                borderColor: "#e1e2e6",
              }}
            >
              <Picker
                style={{ bottom: 8, color: Colors.tertiary }}
                selectedValue={action}
                onValueChange={(itemValue, itemIndex) => setaction(itemValue)}
              >
                <Picker.Item
                  label="Valid"
                  value="Validation"
                  style={{ fontSize: 13 }}
                />
                <Picker.Item
                  label="A Entretenir"
                  value="Entretien"
                  style={{ fontSize: 13 }}
                />
                <Picker.Item
                  label="A Mantenir"
                  value="Mantenance"
                  style={{ fontSize: 13 }}
                />
              </Picker>
            </View>
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
