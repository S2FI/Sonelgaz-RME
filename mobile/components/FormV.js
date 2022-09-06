import React, { useState, useContext } from "react";
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
} from "./styles";
import {
  View,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  Text,
} from "react-native";

//colors
const { darkLight, brand, primary } = Colors;

import ImagePickerExample from "./ImageTP";
import axios from "axios";
import Environments from "../constants/Env";
import { showMessage, hideMessage } from "react-native-flash-message";
import AsyncStorage from "@react-native-async-storage/async-storage";
export default function FormV(props) {
  const [action, setaction] = useState("Valid");
  const [code_ouvrage, setcode_ouvrage] = useState(props.listOuvrage[0]);

  const storeData = async (item, value) => {
    try {
      await AsyncStorage.setItem(item, value);
    } catch (e) {
      // saving error
    }
  };

  const handleSubmit = async (values, setSubmitting) => {
    const id_form_visite = props.id;
    const user_created_form = props.username;
    const signature = user_created_form.substring(0, 2).toUpperCase();
    const valuesToSend = {
      ...values,
      action,
      id_form_visite,
      user_created_form,
      signature,
      code_ouvrage,
    };

    if (values.description == "" || values.titre_formulaire == "") {
      setSubmitting(false);
    } else {
      setSubmitting(true);
      const url =
        "http://" + Environments.MOBILE_URL + ":7000/api/posts/form-visite";
      axios
        .post(url, valuesToSend)
        .then((response) => {
          const data = response.data;
          showMessage({
            message: "Insertion",
            description: data.message,
            type: "success",
          });
          storeData(
            id_form_visite + "Visite",
            JSON.stringify(props.listOuvrage)
          );
        })
        .catch((error) => {
          console.log(error);

          console.log(error.toJSON());
        });
      props.statechange(false);
      console.log(valuesToSend);
    }
  };

  return (
    <View>
      <Formik
        initialValues={{
          description: "",
          titre_formulaire: "",
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
                {props.listOuvrage?.map((ouvrage) => (
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
                  value="Maintenance"
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
