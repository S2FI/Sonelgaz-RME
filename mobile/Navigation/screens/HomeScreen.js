import React, { useState } from "react";
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
} from "react-native";
// formik
import { Formik } from "formik";

//colors
const { darkLight, brand, primary } = Colors;

// icon
import { Octicons, Fontisto, Ionicons } from "@expo/vector-icons";

import {
  StyledContainer,
  PageLogo,
  PageTitle,
  SubTitle,
  StyledInputLabel,
  StyledFormArea,
  StyledButton,
  StyledTextInput,
  RightIcon,
  InnerContainer,
  ButtonText,
  MsgBox,
  Line,
  ExtraView,
  ExtraText,
  TextLink,
  TextLinkContent,
  Colors,
} from "../../components/styles";

import MainStyle from "../../Styles/MainStyle";
import ModalComponent from "../../components/Modal";

/*const Item = ({ id_planning, date_planning, titre, type, date_tache, district, depart, ligne, poste, id_visite }) => (
    <View style={styles.item}>
      <Text style={styles.title}>{id_planning} {'\n'} {date_planning} {'\n'} {titre} {'\n'} {type} {'\n'} {date_tache} {'\n'} {district} {'\n'} {depart} {'\n'} {ligne} {'\n'} {poste} {'\n'} {id_visite}</Text>
    </View>
  );*/

export default function PlanningScreen({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);
  var data = [
    {
      id_planning: 1,
      date_planning: "16/07/2022",
      titre: "prog annual de gue de constantine",
      type: "Maintenannce",
      date_tache: "30/07/2022",
      district: "District 1",
      depart: "Départ 1",
      ligne: "Ligne 1",
      poste: "Poste 1",
      id_visite: "Visite 20",
    },
    {
      id_planning: 10,
      date_planning: "16/07/2022",
      titre: "prog annual de gue de constantine",
      type: "Entretien",
      date_tache: "30/07/2022",
      district: "District 1",
      depart: "Départ 1",
      ligne: "Ligne 1",
      poste: "Poste 1",
      id_visite: "Visite 20",
    },
    {
      id_planning: 11,
      date_planning: "16/07/2022",
      titre: "prog annual de gue de constantine",
      type: "Visite",
      date_tache: "30/07/2022",
      district: "District 1",
      depart: "Départ 1",
      ligne: "Ligne 1",
      poste: "Poste 1",
      id_visite: "Visite 20",
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.globalCardView}>
          {data.map(
            ({
              id_planning,
              date_planning,
              titre,
              type,
              date_tache,
              district,
              depart,
              ligne,
              poste,
              id_visite,
            }) => (
              <View style={styles.mainCardView}>
                <Text key={id_planning}>
                  Numero du Planning: {id_planning} {"\n"}
                  Date du Planning: {date_planning} {"\n"}
                  Titre: {titre} {"\n"}
                  Type: {type} {"\n"}
                  Date planifiee pour la tache: {date_tache} {"\n"}
                  District: {district} {"\n"}
                  Depart: {depart} {"\n"}
                  Ligne: {ligne} {"\n"}
                  Poste: {poste} {"\n"}
                  Numero de la visite: {id_visite} {"\n"}
                  <ModalComponent etatForm={type} textbut={"+"} />
                </Text>
              </View>
            )
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
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
    width: 20,
  },
  buttonClose: {
    backgroundColor: "#2196F3",
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
