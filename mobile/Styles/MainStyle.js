import * as React from "react";
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
} from "react-native";
import { Colors } from "../components/styles";
export default function MainStyle() {
  return StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: StatusBar.currentHeight,
      backgroundColor: Colors.container,
      borderTopColor: Colors.brand,
    },
    scrollView: {
      marginHorizontal: 20,
    },
    formOpacity: {
      width: "95%",
      minHeight: 150,
      maxHeight: "auto",
      alignItems: "flex-start",
      justifyContent: "flex-start",
    },
    refreshView: {
      flexDirection: "row",
      justifyContent: "flex-end",
      bottom: 5,
      right: 5,
    },
    buttonRefresh: {
      padding: 10,
      elevation: 2,
      backgroundColor: Colors.brand,
      zIndex: 1,
      width: 50,
      height: 50,

      borderRadius: 100,
    },
    buttonUpdate: {
      padding: 10,
      elevation: 2,
      backgroundColor: Colors.brand,
      zIndex: 1,
      width: 45,
      height: 45,
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 100,
      position: "absolute",
    },
    buttonDelete: {
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
    floatButtonView: {
      position: "absolute",
      bottom: 26,
      right: 80,
      alignItems: "center",
      justifyContent: "center",
    },
    floatButtonView2: {
      position: "absolute",
      bottom: 3,
      right: 3,
      alignItems: "center",
      justifyContent: "center",
    },
    textStyle: {
      color: "white",
      fontWeight: "bold",
      textAlign: "center",
    },

    mainCardView: {
      width: "95%",
      minHeight: 150,
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

    globalCardView: {
      alignItems: "center",
      justifyContent: "center",
    },
  });
}
