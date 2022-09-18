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
import { Formik } from "formik";

//colors
const { darkLight, brand, primary } = Colors;

// icon
import {
  Octicons,
  Foundation,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";

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
import ModalComponent from "../../components/Modal";
import MainStyle from "../../Styles/MainStyle";
import Loading from "../../components/loading";
import axios from "axios";
import Environments from "../../constants/Env";
import ModalEntretien from "../../components/affichage/ModalEntretien";
import { showMessage, hideMessage } from "react-native-flash-message";
import AsyncStorage from "@react-native-async-storage/async-storage";
import UpdateModal from "../../components/update/UpdateModal";

export default function EntretienFormScreen({ route, navigation }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [entretien, setentretien] = useState([]);
  const [loading, setloading] = useState(false);
  const [Vdata, setVdata] = useState([]);
  const [affichage, setaffichage] = useState(false);
  const { user } = route.params;
  const [updateData, setUpdateData] = useState([]);
  const [storedList, setstoredList] = useState([]);
  const getUserData = async (id) => {
    try {
      let item = await AsyncStorage.getItem(id + "Entretien");
      if (item !== null) {
        setstoredList(JSON.parse(item));
      }
    } catch (e) {
      // error reading value
    }
  };

  const actions = (value) => {
    setModalVisible(value);
  };
  const afficher = (value) => {
    setaffichage(value);
  };
  const showConfirmDialog = (id) => {
    return Alert.alert(
      "Suppression du formulaire?",
      "Êtes-vous sûr de vouloir supprimer ce formulaire?",
      [
        {
          text: "Yes",
          onPress: () => {
            deleteEntretien(id);
          },
        },
        {
          text: "No",
        },
      ]
    );
  };

  const getEntretienData = () => {
    setloading(true);
    axios
      .get(
        `http://${Environments.MOBILE_URL}:7000/api/posts/entretien_form/${user}`
      )
      .then((response) => response.data)
      .then((data) => {
        setentretien(data);
        setloading(false);
      })
      .catch((error) => {
        console.log(error.toJSON());
      });
  };
  const deleteEntretien = (id) => {
    setloading(true);
    axios
      .delete(
        `http://${Environments.MOBILE_URL}:7000/api/posts/delete_entretien/${id}`
      )
      .then((response) => response.data)
      .then((data) => {
        getEntretienData();
        showMessage({
          message: "Delete",
          description: data.message,
          type: "success",
        });
      })
      .catch((error) => {
        console.log(error.toJSON());
      });
  };

  useEffect(() => {
    getEntretienData();
  }, []);

  return (
    <React.Fragment>
      {loading ? (
        <Loading />
      ) : (
        <SafeAreaView style={styles.container}>
          <ScrollView style={styles.scrollView}>
            <View style={styles.globalCardView}>
              {entretien.map((data, index) => (
                <TouchableOpacity
                  style={styles.formOpacity}
                  key={index}
                  onPress={() => {
                    setaffichage(true);
                    setVdata(data);
                  }}
                >
                  <View style={styles.mainCardView} key={data.id_form}>
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
                      : {data.titre_formulaire}
                    </Text>
                    <Line />
                    <Text>
                      Code de l'ouvrage: {data.code_ouvrage} {"\n"}
                      Date de creation: {data.date_procedure.split("T")[0]}
                      {"\n"}
                    </Text>
                    <View style={styles.floatButtonView}>
                      <TouchableOpacity
                        style={styles.buttonUpdate}
                        onPress={() => {
                          setModalVisible(true);
                          setUpdateData(data);
                          getUserData(data.id_form_entretien);
                        }}
                      >
                        <MaterialCommunityIcons
                          name="file-edit-outline"
                          size={20}
                          color="white"
                          style={{ bottom: 2, right: 1 }}
                        />
                      </TouchableOpacity>
                    </View>
                    <View style={styles.floatButtonView2}>
                      <TouchableOpacity
                        style={styles.buttonDelete}
                        onPress={() => {
                          showConfirmDialog(data.id_form);
                        }}
                      >
                        <Foundation
                          name="page-delete"
                          size={20}
                          color="white"
                          style={{ bottom: 2, right: 1 }}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}

              <ModalEntretien
                visibilite={affichage}
                entretienData={Vdata}
                statechange={afficher}
              />
              <UpdateModal
                visibilite={modalVisible}
                etatForm="Entretien"
                listOuvrageEntretien={storedList}
                updateDataEntretien={updateData}
                statechange={actions}
                reload={getEntretienData}
              />
            </View>
          </ScrollView>
          <View style={styles.refreshView}>
            <TouchableOpacity
              style={styles.buttonRefresh}
              onPress={() => {
                getEntretienData();
              }}
            >
              <Ionicons
                name="refresh"
                size={28}
                color="white"
                style={{ bottom: 1, left: 1 }}
              />
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      )}
    </React.Fragment>
  );
}
const styles = MainStyle();
