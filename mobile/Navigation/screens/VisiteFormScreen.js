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
import MainStyle from "../../Styles/MainStyle";

export default function VisiteFormScreen({ navigation }) {
    
  const [modalVisible, setModalVisible] = useState(false);

  var data_visite=[
    {
    id_formulaire_visite: 1,
    date_creation_visite: '16/07/2022',
    titre_visite : 'prog annual de gue de constantine'
  },
  {
    id_formulaire_visite: 2,
    date_creation_visite: '16/07/2022',
    titre_visite : 'prog annual de gue de constantine'
  },
  {
    id_formulaire_visite: 3,
    date_creation_visite: '16/07/2022',
    titre_visite : 'prog annual de gue de constantine'
  },
  {
    id_formulaire_visite: 4,
    date_creation_visite: '16/07/2022',
    titre_visite : 'prog annual de gue de constantine'
  },
  {
    id_formulaire_visite: 5,
    date_creation_visite: '16/07/2022',
    titre_visite : 'prog annual de gue de constantine'
  },
  {
    id_formulaire_visite: 6,
    date_creation_visite: '16/07/2022',
    titre_visite : 'prog annual de gue de constantine'
  },

]


    return (
      <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        
      <ModalComponent etatForm ={"Visite"}textbut={"Ajouter un formulaire de visite"} />
              
        <View style={styles.globalCardView}>
          
        {data_visite.map(({  id_formulaire_visite, date_creation_visite, titre_visite
}) => (
        <View style={styles.mainCardView}>
        <Text key={id_formulaire_visite}>
          Numero du formulaire: {id_formulaire_visite} {'\n'}
          Date de creation: {date_creation_visite} {'\n'}
          Titre: {titre_visite} {'\n'}
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