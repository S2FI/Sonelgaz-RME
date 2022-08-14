import React, { useState, useContext } from 'react';

// formik
import { Formik } from 'formik';

import {
  StyledInputLabel, StyledFormArea, StyledButton, StyledTextInput, LeftIcon, RightIcon, ButtonText, MsgBox, Line, Colors,
} from './styles';
import { View, ActivityIndicator } from 'react-native';

//colors
const { darkLight, brand, primary } = Colors;

// icon
import { Octicons, Ionicons } from '@expo/vector-icons';

// api client
import axios from 'axios';


export default function FormE ({ navigation }) {
    const [hidePassword, setHidePassword] = useState(true);
    const [message, setMessage] = useState();
    const [messageType, setMessageType] = useState();
  
    // formInfos context
  
    const handleLogin = (formInfos, setSubmitting) => {
      handleMessage(null);
      const url = 'http://localhost:7000/api/posts/login';
      axios
        .post(url, formInfos)
        .then((response) => {
          const result = response.data.success;
          const data = response.data
          console.log(response)
          if (result !== true) {
            
            handleMessage("Nom d'utilisateur ou mot de passe incorrect", status);
          } else {
            
              navigation.navigate('MainContainer')
              //Enregistrer dans la BDD les infos
            
            console.log("okay")
          }
          setSubmitting(false);
        })
        .catch((error) => {
          console.log(error)
          setSubmitting(false);
          handleMessage('An error occurred. Check your network and try again');
          console.log(error.toJSON());
        });
    };
  
    const handleMessage = (message, type = '') => {
      setMessage(message);
      setMessageType(type);
    };
  


    return (
        <View>

          <Formik
            initialValues={{ email: '', password: '' }}
            onSubmit={(values, { setSubmitting }) => {
              if (values.email == '' || values.password == '') {
                handleMessage('Veuillez remplir les champs');
                setSubmitting(false);
              } else {
                handleLogin(values, setSubmitting);
              }
            }}
          >
            {({ handleChange, handleBlur, handleSubmit, values, isSubmitting }) => (
              <StyledFormArea>
                <MyTextInput
                  label="Nom d'utilisateur"
                  placeholder="andyj@gmail.com"
                  placeholderTextColor={darkLight}
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  value={values.email}
                  keyboardType="email-address"
                />
                <MyTextInput
                  label="Mot de passe"
                  placeholder="* * * * * * * *"
                  placeholderTextColor={darkLight}
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  value={values.password}
                />
               
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
        <StyledInputLabel>{label}</StyledInputLabel>
        <StyledTextInput {...props} />
      </View>
    );
  };