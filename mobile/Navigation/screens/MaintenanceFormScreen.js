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
  Colors,zz
} from '../../components/styles';
import ModalComponent from "../../components/Modal";
import MainStyle from "../../Styles/MainStyle";

export default function MaintenanceFormScreen({ navigation }) {
    const [modalVisible, setModalVisible] = useState(false);

  var data_maintenance=[
    {
    id_formulaire_maintenance: 1,
    date_creation_maintenance: '16/07/2022',
    titre_maintenance : 'prog annual dem,.cv/v/m,.v/,m.'
  },
  {
    id_formulaire_maintenance: 2,
    date_creation_maintenance: '16/07/2022',
    titre_maintenance : 'prog annual de gue de constantine'
  },
  {
    id_formulaire_maintenance: 3,
    date_creation_maintenance: '16/07/2022',
    titre_maintenance : 'prog annuanm;;;kcvlk;vckjlvcljkvcxjklvcxjk'
  },
  {
    id_formulaire_maintenance: 4,
    date_creation_maintenance: '16/07/2022',
    titre_maintenance : 'prog annual de gue de constantine'
  },
  {
    id_formulaire_maintenance: 5,
    date_creation_maintenance: '16/07/2022',
    titre_maintenance : 'prog annual de gue de constantine'
  },
  {
    id_formulaire_maintenance: 6,
    date_creation_maintenance: '16/07/2022',
    titre_maintenance : 'prog annual de gue de cjkf;ldfjkl;e'
  },

]

    return (
        <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollView}>
        
          <ModalComponent etatForm ={"Maintenannce"} textbut={"Ajouter un formulaire de maintenance"}/>
          
          
          <View style={styles.globalCardView}>
            
          {data_maintenance.map(({  id_formulaire_maintenance, date_creation_maintenance, titre_maintenance
 }) => (
          <View style={styles.mainCardView}>
          <Text key={id_formulaire_maintenance}>
            Numero du formulaire: {id_formulaire_maintenance} {'\n'}
            Date de creation: {date_creation_maintenance} {'\n'}
            Titre: {titre_maintenance} {'\n'}
            <Pressable
            style={[styles.button, styles.buttonOpen]}
            onPress={() => setModalVisible(true)}
          >
          <Text style={styles.textStyle}>Modifier</Text>
          </Pressable>
          </Text>
          
          </View>))}
          
          </View>

        </ScrollView>
       </SafeAreaView>
    );
}


  const MyTextInput = ({ label, isPassword, hidePassword, setHidePassword, ...props }) => {
    return (
      <View>
        <StyledInputLabel>{label}</StyledInputLabel>
        <StyledTextInput {...props} />
      </View>
    );
  };
  

  const styles = MainStyle();