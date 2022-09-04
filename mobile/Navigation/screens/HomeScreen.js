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
// formik

import { Octicons, Fontisto, Ionicons } from "@expo/vector-icons";
import { FloatingAction } from "react-native-floating-action";
//colors
const { darkLight, brand, primary } = Colors;

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
import AsyncStorage from "@react-native-async-storage/async-storage";

/*const Item = ({ id_planning, date_planning, titre, type, date_tache, district, depart, ligne, poste, id_visite }) => (
    <View style={styles.item}>
      <Text style={styles.title}>{id_planning} {'\n'} {date_planning} {'\n'} {titre} {'\n'} {type} {'\n'} {date_tache} {'\n'} {district} {'\n'} {depart} {'\n'} {ligne} {'\n'} {poste} {'\n'} {id_visite}</Text>
    </View>
  );*/

export default function HomeScreen({ route, navigation }) {
  const { equipeData } = route.params;

  const actions = (value) => {
    setModalVisible(value);
  };
  const [modalVisible, setModalVisible] = useState(false);
  const [modalType, setmodalType] = useState("");
  const [dataProgram, setDataProgram] = useState(equipeData);
  const [formID, setformID] = useState(1);
  const [storedUser, setstoredUser] = useState("");
  const [code_ouvrage, setcode_ouvrage] = useState([]);
  const [depart, setdepart] = useState("");

  const getUserData = async (getter) => {
    try {
      let item = await AsyncStorage.getItem("User");
      if (item !== null) {
        setstoredUser(item);
      }
    } catch (e) {
      // error reading value
    }
  };

  useEffect(() => {
    setDataProgram(equipeData);
  }, [equipeData]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.globalCardView}>
          {dataProgram?.map((data) => (
            <View style={styles.mainCardView} key={data.id_programme}>
              <Text
                style={{
                  paddingTop: 5,
                  fontSize: 15,
                  fontFamily: "sans-serif",
                  alignItems: "flex-start",
                }}
              >
                <Text
                  style={{
                    fontWeight: "bold",
                  }}
                >
                  Titre
                </Text>
                : {data.plan.Titre_planning}
              </Text>
              <Line />
              <Text>
                Date du Planning: {data.plan.date_planning.split("T")[0]} {"\n"}
                Type: {data.plan.Type_planning} {"\n"}
                District: {data.district} {"\n"}
                Depart: {data.depart} {"\n"}
                Code ouvrage:{" ["}
                {data.code_ouvrage?.map((code, index) => (
                  <Text key={index} style={styles.textStyle}>
                    {" "}
                    {code}{" "}
                  </Text>
                ))}
                {"]\n"}
                Date debut: {data.date_debut_programme} {"\n"}
                Date fin: {data.date_fin_programme} {"\n"}
              </Text>
              <View style={styles.floatButtonView}>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => {
                    setModalVisible(true),
                      setmodalType(data.plan.Type_planning);
                    setformID(data.plan.id_planning);
                    getUserData();
                    setcode_ouvrage(data.code_ouvrage);
                    setdepart(data.depart);
                  }}
                >
                  <Ionicons
                    name={"add"}
                    size={30}
                    color={Colors.primary}
                    style={{ bottom: 3, right: 2 }}
                  />
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
        <ModalComponent
          etatForm={modalType}
          visibilite={modalVisible}
          statechange={actions}
          id={formID}
          username={storedUser}
          listOuvrage={code_ouvrage}
          depart={depart}
        />
      </ScrollView>
    </SafeAreaView>
  );
}
//  <FloatingAction
//                     color={Colors.brand}
//                     buttonSize={40}
//                     openOnMount={false}
//                     onPressMain={() => {
//                       setmodalType(type);
//                       setModalVisible(true);
//                     }}
//                     onClose={() => {
//                       setModalVisible(false);
//                     }}
//                   />
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    backgroundColor: Colors.container,
    borderTopColor: Colors.brand,
  },
  scrollView: {
    marginHorizontal: 20,
  },
  button: {
    padding: 10,
    elevation: 2,
    backgroundColor: Colors.brand,
    zIndex: 1,
    width: 45,
    height: 45,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
  },

  textStyle: {
    fontWeight: "bold",
    textAlign: "center",
  },
  mainCardView: {
    width: "95%",
    minHeight: 210,
    maxHeight: "auto",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    borderWidth: 1,
    borderColor: "#333",
    shadowOffset: { width: 1, height: 1 },
    shadowColor: "#333",
    shadowOpacity: 0.3,
    shadowRadius: 1,
    borderRadius: 7,
    borderColor: Colors.brand,
    // elevation: 1,
    flexDirection: "column",
    backgroundColor: Colors.primary,
    paddingLeft: 25,
    paddingRight: 25,
    marginTop: 6,
    marginBottom: 6,
    marginLeft: 4,
    marginRight: 4,
  },
  floatButtonView: {
    position: "absolute",
    bottom: 3,
    right: 3,
    alignItems: "center",
    justifyContent: "center",
  },
  globalCardView: {
    alignItems: "center",
    justifyContent: "center",
  },
});
