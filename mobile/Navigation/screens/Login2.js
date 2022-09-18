import React, { useState, useContext } from "react";
import { StatusBar } from "expo-status-bar";
import Config from "react-native-config";
// formik
import { Formik } from "formik";
import {
  StyledContainer,
  PageLogo,
  PageTitle,
  SubTitle,
  StyledInputLabel,
  StyledFormArea,
  StyledButton,
  StyledTextInput,
  LeftIcon,
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
} from "./../../components/styles";
import {
  View,
  ActivityIndicator,
  Linking,
  KeyboardAvoidingView,
} from "react-native";
import KeyboardAvoidingWrapper from "../../components/KeyboardAvoidingWrapper";

//colors
const { darkLight, brand, primary } = Colors;

// icon
import { Octicons, Fontisto, Ionicons } from "@expo/vector-icons";

// api client
import axios from "axios";

// credentials context
import { CredentialsContext } from "../../components/CredentialsContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Environments from "../../constants/Env";

const Login2 = ({ navigation }) => {
  const [hidePassword, setHidePassword] = useState(true);
  const [message, setMessage] = useState();
  const [messageType, setMessageType] = useState();
  console.log();
  const storeData = async (user, equipe) => {
    try {
      await AsyncStorage.setItem("User", user);
      await AsyncStorage.setItem("Equipe", equipe);
    } catch (e) {
      // saving error
    }
  };
  // credentials context
  const { storedCredentials, setStoredCredentials } =
    useContext(CredentialsContext);

  const handleLogin = async (credentials, setSubmitting) => {
    handleMessage(null);
    const url = "http://" + Environments.MOBILE_URL + ":7000/api/posts/login";
    axios
      .post(url, credentials)
      .then(async (response) => {
        const result = response.data.equipe;
        const user = response.data.user;
        const data = response.data;
        console.log(response.status);
        if (result == "") {
          handleMessage("compte non autoriser", response.status);
        } else {
          storeData(user, result);
          const urlEquipe = `http://${Environments.MOBILE_URL}:7000/api/posts/equipe_planning/${result}`;
          axios
            .get(urlEquipe)
            .then(async (reponse) => {
              const equipeData = reponse.data;
              navigation.navigate("Sonelgaz-RME", {
                equipeData,
                user,
                result,
              });
            })
            .catch((error) => {
              console.log(error);
              handleMessage("Planning data failed");
              console.log(error.toJSON());
            });

          persistLogin({ ...data[0] }, message, response.status);
        }
        setSubmitting(false);
      })
      .catch((error) => {
        console.log(error);
        setSubmitting(false);
        handleMessage("An error occurred. Check your network and try again");
        console.log(error.toJSON());
      });
  };

  const handleMessage = (message, type = "") => {
    setMessage(message);
    setMessageType(type);
  };

  // Persisting login
  const persistLogin = (credentials, message, status) => {
    AsyncStorage.setItem("Sonelgaz-RMECredentials", JSON.stringify(credentials))
      .then(() => {
        handleMessage(message, status);
        setStoredCredentials(credentials);
      })
      .catch((error) => {
        handleMessage("Persisting login failed");
        console.log(error);
      });
  };

  return (
    <KeyboardAvoidingWrapper>
      <StyledContainer>
        <StatusBar style="dark" />
        <InnerContainer>
          <View>
            <PageLogo
              resizeMode="cover"
              source={require("./../../assets/img/avatar.png")}
            />
          </View>
          <PageTitle>Sonelgaz-RME</PageTitle>
          <SubTitle>Se connecter</SubTitle>

          <Formik
            initialValues={{ username: "", password: "" }}
            onSubmit={(values, { setSubmitting }) => {
              if (values.username == "" || values.password == "") {
                handleMessage("Veuillez remplir les champs");
                setSubmitting(false);
              } else {
                handleLogin(values, setSubmitting);
              }
            }}
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              isSubmitting,
            }) => (
              <StyledFormArea>
                <MyTextInput
                  label="Nom d'utilisateur"
                  placeholder="Nom d'utilisateur"
                  placeholderTextColor={darkLight}
                  onChangeText={handleChange("username")}
                  onBlur={handleBlur("username")}
                  value={values.username}
                  keyboardType="username"
                  icon="mail"
                />
                <MyTextInput
                  label="Mot de passe"
                  placeholder="* * * * * * * *"
                  placeholderTextColor={darkLight}
                  onChangeText={handleChange("password")}
                  onBlur={handleBlur("password")}
                  value={values.password}
                  secureTextEntry={hidePassword}
                  icon="lock"
                  isPassword={true}
                  hidePassword={hidePassword}
                  setHidePassword={setHidePassword}
                />
                <Line />

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
                <MsgBox type={messageType}>{message}</MsgBox>
              </StyledFormArea>
            )}
          </Formik>
        </InnerContainer>
      </StyledContainer>
    </KeyboardAvoidingWrapper>
  );
};

const MyTextInput = ({
  label,
  icon,
  isPassword,
  hidePassword,
  setHidePassword,
  ...props
}) => {
  return (
    <View>
      <LeftIcon>
        <Octicons name={icon} size={30} color={brand} />
      </LeftIcon>
      <KeyboardAvoidingView behavior="padding">
        <StyledInputLabel>{label}</StyledInputLabel>
        <StyledTextInput {...props} />
      </KeyboardAvoidingView>
      {isPassword && (
        <RightIcon
          onPress={() => {
            setHidePassword(!hidePassword);
          }}
        >
          <Ionicons
            name={hidePassword ? "md-eye-off" : "md-eye"}
            size={30}
            color={darkLight}
          />
        </RightIcon>
      )}
    </View>
  );
};

export default Login2;
