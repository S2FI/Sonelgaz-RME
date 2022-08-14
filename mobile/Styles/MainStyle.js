import * as React from 'react';
import { Alert, Modal, StyleSheet, Text, Pressable, View, SafeAreaView, ScrollView, StatusBar } from "react-native";
import { Colors } from '../components/styles';
export default function MainStyle () {
  
    return (
      StyleSheet.create({
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
        })
    );
}


