import React, { useContext } from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


import {
  Avatar,
  WelcomeImage,
  PageTitle,
  SubTitle,
  StyledFormArea,
  StyledButton,
  InnerContainer,
  WelcomeContainer,
  ButtonText,
  Line,
} from '../../components/styles';

const Welcome = ({navigation}) => {
  return (
    <>
      <StatusBar style="light" />
      <InnerContainer>
        <WelcomeImage resizeMode="cover" source={require('./../../assets/img/image.jpg')} />

        <WelcomeContainer>
        <PageTitle>Sonelgaz-RME</PageTitle><PageTitle>Bienvenue</PageTitle>
          <StyledFormArea>
            <Line />
            <StyledButton>
              <ButtonText
               onPress={() =>
                navigation.navigate('Login2')
              }
              >Se connecter</ButtonText>
            </StyledButton>
          </StyledFormArea>
        </WelcomeContainer>
      </InnerContainer>
    </>
  );
};

export default Welcome;
