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
import { Octicons, Fontisto, Ionicons } from "@expo/vector-icons";

import { StyledInputLabel, StyledTextInput, Colors, Line } from "../styles";

export default function ModalMaintenance(props) {
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
                  {props.maintenanceData.titre_formulaire}
                </Text>
              </Text>
              <View>
                <Line />
                <Text>
                  Code de l'ouvrage:{props.maintenanceData.code_ouvrage}
                  {"\n"}
                  Date de creation:{" "}
                  {props.maintenanceData.date_procedure
                    ? props.maintenanceData.date_procedure.split("T")[0]
                    : " "}
                  {"\n"}
                  Raison de la panne: {props.maintenanceData.raison_de_panne}
                  {"\n"}
                  Description: {props.maintenanceData.description}
                  {"\n"}
                  Responsable: {props.maintenanceData.created_user_form}
                  {"\n"}
                  Signature:{"\n"} {props.maintenanceData.signature}
                </Text>
              </View>

              <TouchableOpacity
                style={[styles.button, styles.buttonClose]}
                onPress={() => {
                  setModalVisible(false), props.statechange(false);
                }}
              >
                <Text style={styles.textStyle}>Cancel</Text>
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
