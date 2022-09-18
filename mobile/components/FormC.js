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
  Line,
  Colors,
} from "./styles";
import { View, ActivityIndicator, StyleSheet, Text } from "react-native";
//colors
const { darkLight, brand, primary } = Colors;
import ImagePickerExample from "./ImageTP";
import axios from "axios";
import Environments from "../constants/Env";
import { showMessage, hideMessage } from "react-native-flash-message";
import AsyncStorage from "@react-native-async-storage/async-storage";
export default function FormC(props) {
  const [code_ouvrage, setcode_ouvrage] = useState(props.listOuvrage[0]);
  const storeData = async (item, value) => {
    try {
      await AsyncStorage.setItem(item, value);
    } catch (e) {
      console.log(e);
      console.log("data not saved in formC");
    }
  };
  const tracking = async (value) => {
    const url = "http://" + Environments.MOBILE_URL + ":7000/api/posts/track";
    axios
      .post(url, value)
      .then((response) => {})
      .catch((error) => {
        console.log(error);
        console.log(error.toJSON());
      });
  };

  const handleSubmit = (values, setSubmitting) => {
    const id_form_maintenance = props.id;
    const user_created_form = props.username;
    const signature = user_created_form.substring(0, 2).toUpperCase();
    const action_tracked = "a creer un formulaire de maintenance";
    const user_role = " Chef";
    const tracked_user = props.username;
    const valuesToTrack = {
      user_role,
      tracked_user,
      action_tracked,
    };
    const valuesToSend = {
      ...values,
      id_form_maintenance,
      user_created_form,
      signature,
      code_ouvrage,
    };
    if (
      values.titre_formulaire == "" ||
      values.raison_panne == "" ||
      values.description == ""
    ) {
      setSubmitting(false);
    } else {
      setSubmitting(true);
      const url =
        "http://" +
        Environments.MOBILE_URL +
        ":7000/api/posts/form-maintenance";
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
            id_form_maintenance + "Maintenance",
            JSON.stringify(props.listOuvrage)
          );
          console.log(
            "on maintenance insertion",
            id_form_maintenance + "Maintenance" + " =>",
            props.listOuvrage
          );
          tracking(valuesToTrack);
        })
        .catch((error) => {
          console.log(error);
          console.log(error.toJSON());
        });
      props.statechange(false);
    }
  };

  return (
    <View>
      <Formik
        initialValues={{
          titre_formulaire: "",
          raison_panne: "",
          description: "",
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
