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
} from "../styles";
import { View, ActivityIndicator, TouchableOpacity, Text } from "react-native";
//colors
const { darkLight, brand, primary } = Colors;
import ImagePickerExample from "../ImageTP";
import axios from "axios";
import Environments from "../../constants/Env";
import { showMessage, hideMessage } from "react-native-flash-message";
import AsyncStorage from "@react-native-async-storage/async-storage";
export default function UpdateFormE(props) {
  const [Hdebut, setHdebut] = useState(props.updateData.heures_debut);
  const [Hfin, setHfin] = useState(props.updateData.heures_fin);
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [dateFin, setdateFin] = useState(new Date());
  const [showFin, setShowFin] = useState(false);
  const [code_ouvrage, setcode_ouvrage] = useState(
    props.updateData.code_ouvrage
  );

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

  const handleSubmit = (values, setSubmitting) => {
    const heures_debut = Hdebut;
    const heures_fin = Hfin;

    const valuesToSend = {
      ...values,
      heures_debut,
      heures_fin,
      code_ouvrage,
    };
    setSubmitting(true);

    const url = `http://${Environments.MOBILE_URL}:7000/api/posts/update_entretien/${props.updateData.id_form}`;
    axios
      .put(url, valuesToSend)
      .then((response) => {
        const data = response.data;
        showMessage({
          message: "update",
          description: data.message,
          type: "success",
        });
        props.reload();
      })
      .catch((error) => {
        console.log(error);
        console.log(error.toJSON());
      });
    props.statechange(false);
    console.log(valuesToSend);
  };
  console.log(parseInt(props.updateData.longueur_visiter));
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
          titre_formulaire: props.updateData.titre_formulaire,
          longueur_visiter: parseInt(props.updateData.longueur_visiter),
          nbr_isolateur_casses: props.updateData.nbr_isolateur_casse,
          fil_fer_degager: props.updateData.fil_fer_degager,
          pont_detache: props.updateData.pont_detache,
          elagage: props.updateData.elagage,
          armements: props.updateData.armements,
          conducteur_ebreche: props.updateData.conducteur_ebreche,
          portee_dereglee: props.updateData.portee_dereglee,
          support_incline: props.updateData.support_incline,
          nid_oiseau: props.updateData.nid_cigogne_oiseau,
          observation: props.updateData.observation,
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
              label="Longueur visiter"
              placeholder="En Km..."
              placeholderTextColor={darkLight}
              onChangeText={handleChange("longueur_visiter")}
              onBlur={handleBlur("longueur_visiter")}
              value={values.longueur_visiter}
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
              label="Armements"
              placeholder="Ecrir ici..."
              placeholderTextColor={darkLight}
              onChangeText={handleChange("armements")}
              onBlur={handleBlur("armements")}
              value={values.armements}
            />
            <MyTextInput
              label="Nid de cigogne ou oiseau"
              placeholder="Ecrir ici..."
              placeholderTextColor={darkLight}
              onChangeText={handleChange("nid_oiseau")}
              onBlur={handleBlur("nid_oiseau")}
              value={values.nid_oiseau}
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
