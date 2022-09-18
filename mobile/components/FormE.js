import React, { useState, useContext } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";
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
  MsgBox,
} from "./styles";
import { View, ActivityIndicator, TouchableOpacity, Text } from "react-native";
//colors
const { darkLight, brand, primary } = Colors;
import ImagePickerExample from "./ImageTP";
import axios from "axios";
import Environments from "../constants/Env";
import { showMessage, hideMessage } from "react-native-flash-message";
import AsyncStorage from "@react-native-async-storage/async-storage";
export default function FormE(props) {
  const [Hdebut, setHdebut] = useState("");
  const [Hfin, setHfin] = useState("");
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [dateFin, setdateFin] = useState(new Date());
  const [showFin, setShowFin] = useState(false);
  const [code_ouvrage, setcode_ouvrage] = useState(props.listOuvrage[0]);

  const makeTwoDigits = (time) => {
    const timeString = `${time}`;
    if (timeString.length === 2) return time;
    return `0${time}`;
  };

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(false);
    setDate(currentDate);

    let tempDate = new Date(currentDate);
    let ftime =
      tempDate.getHours() + ":" + makeTwoDigits(tempDate.getMinutes());
    setHdebut(ftime);
  };
  const onChangefin = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowFin(false);
    setdateFin(currentDate);

    let tempDate = new Date(currentDate);
    let ftime =
      tempDate.getHours() + ":" + makeTwoDigits(tempDate.getMinutes());
    setHfin(ftime);
  };

  const showDatePicker = () => {
    setShow("time");
  };
  const showDatePickerFin = () => {
    setShowFin("time");
  };
  const storeData = async (item, value) => {
    try {
      await AsyncStorage.setItem(item, value);
    } catch (e) {
      // saving
      console.log(e);
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
    const heures_debut = Hdebut;
    const heures_fin = Hfin;
    const id_form_entretien = props.id;
    const user_created_form = props.username;
    const signature = user_created_form.substring(0, 2).toUpperCase();
    const ligne_depart = props.depart;
    const action_tracked = "a creer un formulaire d'entretien";
    const user_role = " Chef";
    const tracked_user = props.username;
    const valuesToTrack = {
      user_role,
      tracked_user,
      action_tracked,
    };
    const valuesToSend = {
      ...values,
      heures_debut,
      heures_fin,
      id_form_entretien,
      user_created_form,
      signature,
      code_ouvrage,
      ligne_depart,
    };
    if (
      values.titre_formulaire == "" ||
      values.longueur_visiter == 0 ||
      values.nbr_isolateur_casses == "" ||
      values.fil_fer_degager == "" ||
      values.pont_detache == "" ||
      values.elagage == "" ||
      values.portee_dereglee == "" ||
      values.support_incline == "" ||
      values.nid_oiseau == "" ||
      values.armements == "" ||
      values.observation == ""
    ) {
      setSubmitting(false);
    } else {
      setSubmitting(true);

      const url =
        "http://" + Environments.MOBILE_URL + ":7000/api/posts/form-entretien";
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
            id_form_entretien + "Entretien",
            JSON.stringify(props.listOuvrage)
          );
          tracking(valuesToTrack);
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
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode="time"
          is24Hour={true}
          display="default"
          onChange={onChange}
          style={{
            backgroundColor: "yellow",
          }}
        />
      )}
      {showFin && (
        <DateTimePicker
          testID="heureFin"
          value={dateFin}
          mode="time"
          is24Hour={true}
          display="default"
          onChange={onChangefin}
          style={{
            backgroundColor: "green",
          }}
        />
      )}
      <Formik
        initialValues={{
          titre_formulaire: "",
          longueur_visiter: 0,
          nbr_isolateur_casses: "",
          fil_fer_degager: "",
          pont_detache: "",
          elagage: "",
          armements: "",
          conducteur_ebreche: "",
          portee_dereglee: "",
          support_incline: "",
          nid_oiseau: "",
          observation: "",
        }}
        onSubmit={(values, { setSubmitting }) => {
          handleSubmit(values, setSubmitting);
        }}
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
            <MyTextInput
              label="Heure debut"
              placeholder="00:00.."
              placeholderTextColor={darkLight}
              onChangeText={handleChange("Heure_debut")}
              onBlur={handleBlur("Heure_debut")}
              value={Hdebut ? Hdebut.toString() : ""}
              editable={false}
              isDate={true}
              showDatePicker={showDatePicker}
            />
            <MyTextInput
              label="Heure fin"
              placeholder="00:00.."
              placeholderTextColor={darkLight}
              onChangeText={handleChange("Heure_fin")}
              onBlur={handleBlur("Heure_fin")}
              value={Hfin ? Hfin.toString() : ""}
              editable={false}
              isDate={true}
              showDatePicker={showDatePickerFin}
            />
            <MyTextInput
              label="Longeur visiter"
              placeholder="En Km..."
              placeholderTextColor={darkLight}
              onChangeText={handleChange("longueur_visiter")}
              onBlur={handleBlur("longueur_visiter")}
              value={values.longueur_visiter}
              keyboardType="numeric"
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
                    style={{ fontSize: 13 }}
                    key={ouvrage}
                  />
                ))}
              </Picker>
            </View>
            <MyTextInput
              label="Nombre d'isolateurs cassés"
              placeholder="Ecrir ici..."
              placeholderTextColor={darkLight}
              onChangeText={handleChange("nbr_isolateur_casses")}
              onBlur={handleBlur("nbr_isolateur_casses")}
              value={values.nbr_isolateur_casses}
              keyboardType="numeric"
            />
            <MyTextInput
              label="Fil de fer à dégager"
              placeholder="Ecrir ici..."
              placeholderTextColor={darkLight}
              onChangeText={handleChange("fil_fer_degager")}
              onBlur={handleBlur("fil_fer_degager")}
              value={values.fil_fer_degager}
              keyboardType="numeric"
            />
            <MyTextInput
              label="Conducteur ébréché"
              placeholder="Ecrir ici..."
              placeholderTextColor={darkLight}
              onChangeText={handleChange("conducteur_ebreche")}
              onBlur={handleBlur("conducteur_ebreche")}
              value={values.conducteur_ebreche}
              keyboardType="numeric"
            />
            <MyTextInput
              label="Pont détaché"
              placeholder="Ecrir ici..."
              placeholderTextColor={darkLight}
              onChangeText={handleChange("pont_detache")}
              onBlur={handleBlur("pont_detache")}
              value={values.pont_detache}
              keyboardType="numeric"
            />
            <MyTextInput
              label="Portée déréglée"
              placeholder="Ecrir ici..."
              placeholderTextColor={darkLight}
              onChangeText={handleChange("portee_dereglee")}
              onBlur={handleBlur("portee_dereglee")}
              value={values.portee_dereglee}
              keyboardType="numeric"
            />
            <MyTextInput
              label="Support incliné ou endommagé"
              placeholder="Ecrir ici..."
              placeholderTextColor={darkLight}
              onChangeText={handleChange("support_incline")}
              onBlur={handleBlur("support_incline")}
              value={values.support_incline}
              keyboardType="numeric"
            />
            <MyTextInput
              label="Elagage"
              placeholder="Ecrir ici..."
              placeholderTextColor={darkLight}
              onChangeText={handleChange("elagage")}
              onBlur={handleBlur("elagage")}
              value={values.elagage}
              keyboardType="numeric"
            />
            <MyTextInput
              label="Armements"
              placeholder="Ecrir ici..."
              placeholderTextColor={darkLight}
              onChangeText={handleChange("armements")}
              onBlur={handleBlur("armements")}
              value={values.armements}
              keyboardType="numeric"
            />
            <MyTextInput
              label="Nid de cigogne ou oiseau"
              placeholder="Ecrir ici..."
              placeholderTextColor={darkLight}
              onChangeText={handleChange("nid_oiseau")}
              onBlur={handleBlur("nid_oisea")}
              value={values.nid_oiseau}
              keyboardType="numeric"
            />
            <MyTextInput
              label="Observation"
              placeholder="Ecrir ici..."
              placeholderTextColor={darkLight}
              onChangeText={handleChange("observation")}
              onBlur={handleBlur("observation")}
              value={values.observation}
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

const MyTextInput = ({ label, isDate, showDatePicker, ...props }) => {
  return (
    <View>
      <StyledInputLabel>{label}</StyledInputLabel>
      {isDate && (
        <TouchableOpacity onPress={showDatePicker}>
          <StyledTextInput {...props} />
        </TouchableOpacity>
      )}
      {!isDate && <StyledTextInput2 {...props} />}
    </View>
  );
};
