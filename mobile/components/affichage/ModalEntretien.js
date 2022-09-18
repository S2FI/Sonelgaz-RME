import React, { useEffect, useState } from "react";
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View,
  SafeAreaView,
  ScrollView,
  StatusBar,
  TouchableOpacity,
} from "react-native";

//colors
const { darkLight, brand, primary } = Colors;

// icon
import { Octicons, Fontisto, Ionicons, AntDesign } from "@expo/vector-icons";

import { StyledInputLabel, StyledTextInput, Colors, Line } from "../styles";

export default function ModalVisite(props) {
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    if (props.visibilite == true) {
      setModalVisible(true);
    }
  }, [props.visibilite]);

  return (
    <View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <SafeAreaView style={styles.container}>
          <ScrollView style={styles.scrollView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>
                <Text
                  style={{
                    fontWeight: "bold",
                  }}
                >
                  {props.entretienData.titre_formulaire}
                </Text>
              </Text>
              <View>
                <Text>
                  Ligne de depart:{props.entretienData.ligne_depart}
                  {"\n"}
                  Code de l'ouvrage:{props.entretienData.code_ouvrage}
                  {"\n"}
                  Date de creation:{" "}
                  {props.entretienData.date_procedure
                    ? props.entretienData.date_procedure.split("T")[0]
                    : " "}
                  {"\n"}
                  Heure de debut: {props.entretienData.heures_debut}
                  {"\n"}
                  Heure de fin: {props.entretienData.heures_fin}
                  {"\n"}
                  Longueur visiter: {props.entretienData.longueur_visiter} km
                  {"\n"}
                  Nombre d'isolateurs cassees:{" "}
                  {props.entretienData.nbr_isolateur_casse}
                  {"\n"}
                  Fils de fer degager: {props.entretienData.fil_fer_degager}
                  {"\n"}
                  Conducteurs ebreches: {props.entretienData.conducteur_ebreche}
                  {"\n"}
                  Ponts detaches: {props.entretienData.pont_detache}
                  {"\n"}
                  Portees dereglees: {props.entretienData.portee_dereglee}
                  {"\n"}
                  Supports inclines: {props.entretienData.support_incline}
                  {"\n"}
                  Elagage: {props.entretienData.elagage} m3
                  {"\n"}
                  Armements: {props.entretienData.armements}
                  {"\n"}
                  Nid cigogne ou oiseau:{" "}
                  {props.entretienData.nid_cigogne_oiseau}
                  {"\n"}
                  Observation: {props.entretienData.observation}
                  {"\n"}
                </Text>
                <Text style={{ marginLeft: 90 }}>
                  <Text style={{ fontWeight: "bold" }}>Responsable:</Text>
                  {props.entretienData.created_user_form}
                  {"\n"}
                  <Text style={{ fontWeight: "bold" }}>Signature:</Text>
                  {"\n"} {props.entretienData.signature}
                </Text>
              </View>

              <TouchableOpacity
                style={styles.buttonClose}
                onPress={() => {
                  setModalVisible(false), props.statechange(false);
                }}
              >
                <AntDesign
                  name="close"
                  size={24}
                  color="black"
                  style={{ bottom: 0, right: 1 }}
                />
              </TouchableOpacity>
            </View>
          </ScrollView>
        </SafeAreaView>
      </Modal>
      {/* 
      <Pressable
        style={[styles.button, styles.buttonOpen]}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.textStyle}>{props.textbut}</Text>
      </Pressable> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },
  scrollView: {
    marginHorizontal: 20,
  },
  centeredView: {
    flex: 1,
    justifyContent: "right",
    alignItems: "right",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  button2: {
    borderRadius: 10,
    padding: 5,
    elevation: 1,
  },
  buttonOpen: {
    backgroundColor: "#E78616",
    width: 40,
  },
  buttonClose: {
    padding: 10,
    position: "absolute",

    right: "1%",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  mainCardView: {
    height: 250,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.white,
    borderRadius: 15,
    shadowColor: "#E78616",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,

    elevation: 2,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: 30,
    paddingRight: 30,
    marginTop: 6,
    marginBottom: 6,
    marginLeft: 4,
    marginRight: 4,
  },
  globalCardView: {
    alignItems: "center",
    justifyContent: "center",
  },
});
