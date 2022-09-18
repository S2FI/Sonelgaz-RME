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
                  {props.visiteData.titre_formulaire}
                </Text>
              </Text>
              <View>
                <Line />
                <Text>
                  Code de l'ouvrage:{props.visiteData.code_ouvrage}
                  {"\n"}
                  Date de creation:{" "}
                  {props.visiteData.date_procedure
                    ? props.visiteData.date_procedure.split("T")[0]
                    : " "}
                  {"\n"}
                  Action: {props.visiteData.action}
                  {"\n"}
                  Description: {props.visiteData.description}
                  {"\n"}
                </Text>
                <Text style={{ marginLeft: 90 }}>
                  <Text style={{ fontWeight: "bold" }}>Responsable:</Text>
                  {props.visiteData.created_user_form}
                  {"\n"}
                  <Text style={{ fontWeight: "bold" }}>Signature:</Text>
                  {"\n"} {props.visiteData.signature}
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
