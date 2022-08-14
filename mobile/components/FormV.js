import React, { useState, useContext } from 'react';

// formik
import { Formik } from 'formik';

import {
 StyledInputLabel2, StyledTextInput2, StyledFormArea, StyledButton, ButtonText, MsgBox, Line, Colors,
} from './styles';
import { View, ActivityIndicator, StyleSheet } from 'react-native';

//colors
const { darkLight, brand, primary } = Colors;

// icon
import { Octicons, Ionicons } from '@expo/vector-icons';

// api client
import axios from 'axios';
import DateTP from './DateTP';
import ImagePickerExample from './ImageTP';


export default function FormV ({ navigation }) {
    const [message, setMessage] = useState();
    const [messageType, setMessageType] = useState();
  
    // formInfos context
  
  
    const handleMessage = (message, type = '') => {
      setMessage(message);
      setMessageType(type);
    };
  


    return (
        <View>

          <Formik
            initialValues={{ code_ouvrage: '', description: '' }}
            onSubmit={(values, { setSubmitting }) => {
              if (values.code_ouvrage == '' || values.description == '') {
                handleMessage('Veuillez remplir les champs');
                setSubmitting(false);
              } else {
                setSubmitting(true);
                console.log(code_ouvrage, description);
              }
            }}
          >
            {({ handleChange, handleBlur, handleSubmit, values, isSubmitting }) => (
              <StyledFormArea>
                <DateTP/>
                
                <MyTextInput
                  label="Code de l'ouvrage"
                  placeholder="Ecrir ici..."
                  placeholderTextColor={darkLight}
                  onChangeText={handleChange('code_ouvrage')}
                  onBlur={handleBlur('code_ouvrage')}
                  value={values.code_ouvrage}
                  keyboardType="code_ouvrage-address"
                />
                <MyTextInput
                  label="Description"
                  placeholder="Ecrir ici..."
                  placeholderTextColor={darkLight}
                  onChangeText={handleChange('description')}
                  onBlur={handleBlur('description')}
                  value={values.description}
                />
                
                <ImagePickerExample/>

                <Line />

                <MsgBox type={messageType}>{message}</MsgBox>

                {!isSubmitting && (
                  <StyledButton onPress={handleSubmit}>
                    <ButtonText>Connexion</ButtonText>
                  </StyledButton>
                )}
                {isSubmitting && (
                  <StyledButton disabled={true}>
                    <ActivityIndicator size="large" color={primary} />
                  </StyledButton>
                )}
              </StyledFormArea>
            )}
          </Formik>
       </View>
    );
}

const MyTextInput = ({ label, ...props }) => {
    return (
      <View>
        <StyledInputLabel2>{label}</StyledInputLabel2>
        <StyledTextInput2 {...props} />
        </View>
      
    );
  };


