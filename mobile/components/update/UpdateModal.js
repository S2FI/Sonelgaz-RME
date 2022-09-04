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

import { StyledInputLabel, StyledTextInput, Colors } from "../styles";
import UpdateFormM from "./UpdateFormM";
import UpdateFormE from "./UpdateFormE";
import UpdateFormV from "./UpdateFormV";

export default function UpdateModal(props) {
  const [modalVisible, setModalVisible] = useState(false);

  const actions = (value) => {
    setModalVisible(value);
    props.statechange(false);
  };
  useEffect(() => {
    if (props.visibilite == true) {
      setModalVisible(true);
    }
  }, [props.visibilite]);

  const affiche =
    props.etatForm === "Maintenance" ? (
      <UpdateFormM
        statechange={actions}
        listOuvrage={props.listOuvrageMaintenance}
        updateData={props.updateDataMaintenance}
        reload={props.reload}
      />
    ) : props.etatForm === "Entretien" ? (
      <UpdateFormE
        statechange={actions}
        listOuvrage={props.listOuvrageEntretien}
        updateData={props.updateDataEntretien}
        reload={props.reload}
      />
    ) : (
      <UpdateFormV
        statechange={actions}
        listOuvrage={props.listOuvrageVisite}
        updateData={props.updateData}
        reload={props.reload}
      />
    );

  return (
    <View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false), props.statechange(false);
        }}
      >
        <SafeAreaView style={styles.container}>
          <ScrollView style={styles.scrollView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>
                Modification de formulaire {props.etatForm}
              </Text>
              {affiche}

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
