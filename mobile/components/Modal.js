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

import { StyledInputLabel, StyledTextInput, Colors } from "./styles";
import FormC from "./FormC";
import FormE from "./FormE";
import FormV from "./FormV";

export default function ModalComponent(props) {
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
      <FormC
        statechange={actions}
        id={props.id}
        username={props.username}
        listOuvrage={props.listOuvrage}
      />
    ) : props.etatForm === "Entretien" ? (
      <FormE
        statechange={actions}
        id={props.id}
        username={props.username}
        listOuvrage={props.listOuvrage}
        depart={props.depart}
      />
    ) : (
      <FormV
        statechange={actions}
        id={props.id}
        username={props.username}
        listOuvrage={props.listOuvrage}
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
              <Text style={styles.modalText}>
                Formulaire de {props.etatForm.toLowerCase()}
              </Text>
              {affiche}
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
