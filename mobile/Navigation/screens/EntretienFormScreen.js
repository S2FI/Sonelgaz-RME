import React, { useState } from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View, SafeAreaView, ScrollView, StatusBar } from "react-native";
// formik
import { Formik } from 'formik';

//colors
const { darkLight, brand, primary } = Colors;

// icon
import { Octicons, Fontisto, Ionicons } from '@expo/vector-icons';

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
} from '../../components/styles';
import ModalComponent from "../../components/Modal";


export default function EntretienFormScreen ({ navigation }) {

    const [modalVisible, setModalVisible] = useState(false);

    var data_entretien=[
      {
      id_formulaire_entretien: 1,
      date_creation_entretien: '16/07/2022',
      titre_entretien : 'prog annual de gue de constantine'
    },
    {
      id_formulaire_entretien: 2,
      date_creation_entretien: '16/07/2022',
      titre_entretien : 'prog annual de gue de constantine'
    },
    {
      id_formulaire_entretien: 3,
      date_creation_entretien: '16/07/2022',
      titre_entretien : 'prog annual de gue de constantine'
    },
    {
      id_formulaire_entretien: 4,
      date_creation_entretien: '16/07/2022',
      titre_entretien : 'prog annual de gue de constantine'
    },
    {
      id_formulaire_entretien: 5,
      date_creation_entretien: '16/07/2022',
      titre_entretien : 'prog annual de gue de constantine'
    },
    {
      id_formulaire_entretien: 6,
      date_creation_entretien: '16/07/2022',
      titre_entretien : 'prog annual de gue de constantine'
    },
  
  ]
  

    return (
        <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollView}>
        <ModalComponent etatForm ={"Entretien"}textbut={"Ajouter un formulaire de entretien"} />
          
          <View style={styles.globalCardView}>
            
          {data_entretien.map(({  id_formulaire_entretien, date_creation_entretien, titre_entretien
 }) => (
  <View style={styles.mainCardView}>
          <Text key={id_formulaire_entretien}>
            Numero du formulaire: {id_formulaire_entretien} {'\n'}
            Date de creation: {date_creation_entretien} {'\n'}
            Titre: {titre_entretien} {'\n'}
          </Text>
          </View>))}
          
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
        marginTop: 22
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
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
      },
      button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
      },
      buttonOpen: {
        backgroundColor: "#E78616",
      },
      buttonClose: {
        backgroundColor: "#2196F3",
      },
      textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
      },
      modalText: {
        marginBottom: 15,
        textAlign: "center"
      },
      mainCardView: {
        height: 150,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.white,
        borderRadius: 15,
        shadowColor: '#E78616',
        shadowOffset: {width: 0, height: 0},
        shadowOpacity: 1,
        
        elevation: 2,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 30,
        paddingRight: 30,
        marginTop: 6,
        marginBottom: 6,
        marginLeft: 4,
        marginRight: 4,
      },
      globalCardView: {
        alignItems: 'center',
        justifyContent: 'center',
      },
    });
  
    const MyTextInput = ({ label, isPassword, hidePassword, setHidePassword, ...props }) => {
      return (
        <View>
          <StyledInputLabel>{label}</StyledInputLabel>
          <StyledTextInput {...props} />
        </View>
      );
    };
    