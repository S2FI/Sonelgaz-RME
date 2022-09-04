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
import AsyncStorage from "@react-native-async-storage/async-storage";
// icon
import {
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
  zz,
} from "../../components/styles";
import ModalComponent from "../../components/Modal";
import MainStyle from "../../Styles/MainStyle";
import Environments from "../../constants/Env";
import axios from "axios";
import Loading from "../../components/loading";
import ModalMaintenance from "../../components/affichage/ModalMaintenance";
import { showMessage, hideMessage } from "react-native-flash-message";
import UpdateModal from "../../components/update/UpdateModal";
export default function MaintenanceFormScreen({ route }) {
  const { user } = route.params;
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setloading] = useState(false);
  const [maintenance, setmaintenance] = useState([]);
  const [Vdata, setVdata] = useState([]);
  const [affichage, setaffichage] = useState(false);
  const [updateData, setUpdateData] = useState([]);
  const [storedList, setstoredList] = useState([]);
  const getUserData = async (id) => {
    try {
      let item = await AsyncStorage.getItem(id + "Maintenance");

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
      "Delete form?",
      "Are you sure you want to remove this form?",
      [
        {
          text: "Yes",
          onPress: () => {
            deleteMaintenance(id);
          },
        },
        {
          text: "No",
        },
      ]
    );
  };

  const getMaintenanceData = () => {
    setloading(true);
    axios
      .get(
        `http://${Environments.MOBILE_URL}:7000/api/posts/maintenance_form/${user}`
      )
      .then((response) => response.data)
      .then((data) => {
        setmaintenance(data);
        setloading(false);
      })
      .catch((error) => {
        console.log(error.toJSON());
      });
  };
  const deleteMaintenance = (id) => {
    setloading(true);
    axios
      .delete(
        `http://${Environments.MOBILE_URL}:7000/api/posts/delete_maintenance/${id}`
      )
      .then((response) => response.data)
      .then((data) => {
        getMaintenanceData();
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
    getMaintenanceData();
  }, []);

  return (
    <React.Fragment>
      {loading ? (
        <Loading />
      ) : (
        <SafeAreaView style={styles.container}>
          <ScrollView style={styles.scrollView}>
            <View style={styles.globalCardView}>
              {maintenance?.map((data, index) => (
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
                      Code de l'ouvrage: {data.code_ouvrage}
                      {"\n"}
                      Date de creation: {data.date_procedure.split("T")[0]}
                      {"\n"}
                    </Text>
                    <View style={styles.floatButtonView}>
                      <TouchableOpacity
                        style={styles.buttonUpdate}
                        onPress={() => {
                          setModalVisible(true);
                          setUpdateData(data);
                          getUserData(data.id_form_maintenance);
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

              <ModalMaintenance
                visibilite={affichage}
                maintenanceData={Vdata}
                statechange={afficher}
              />
              <UpdateModal
                visibilite={modalVisible}
                etatForm="Maintenance"
                listOuvrageMaintenance={storedList}
                updateDataMaintenance={updateData}
                statechange={actions}
                reload={getMaintenanceData}
              />
            </View>
          </ScrollView>
          <View style={styles.refreshView}>
            <TouchableOpacity
              style={styles.buttonRefresh}
              onPress={() => {
                getMaintenanceData();
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
