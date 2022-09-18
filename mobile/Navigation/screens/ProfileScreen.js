import React from "react";
import {
  View,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import axios from "axios";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Entypo, SimpleLineIcons } from "react-native-vector-icons";
import { Avatar, PageLogo, Colors } from "../../components/styles";
import Environments from "../../constants/Env";
import { StackActions } from "@react-navigation/native";
import ImagePickerExample from "../../components/ImageTP";

const ProfileScreen = ({ route, navigation }) => {
  const { username } = route.params;

  const Logout = () => {
    axios
      .get(`http://${Environments.MOBILE_URL}:7000/api/posts/logout`)
      .then((response) => response.data)
      .then((data) => {
        if (navigation.canGoBack()) {
          navigation.dispatch(StackActions.pop(1));
        }
      })
      .catch((error) => {
        console.log(error.toJSON());
      });
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.userInfoSection}>
        <View style={{ flexDirection: "row", marginTop: 15 }}>
          <Avatar source={require("./../../assets/img/Chef_icon.jpg")} />
          <View style={{ marginLeft: 20 }}>
            <Text
              style={[
                styles.title,
                {
                  marginTop: 15,
                  marginBottom: 5,
                },
              ]}
            >
              {username === "amine"
                ? "TOUATI Amine"
                : username === "farid"
                ? "AMARI Farid"
                : username === "ahmed"
                ? "SALMANI Ahmed"
                : "SAFI"}
            </Text>
            <Text style={styles.caption}>Chef d'equipe</Text>
          </View>
        </View>
      </View>

      <View style={styles.userInfoSection}>
        <View style={styles.row}>
          <Icon name="map-marker-radius" color={Colors.brand} size={20} />
          <Text style={{ color: "#777777", marginLeft: 20 }}>
            Sonelgaz-Distribution, Gue de constantine
          </Text>
        </View>
        <View style={styles.row}>
          <Icon name="phone" color={Colors.brand} size={20} />
          <Text style={{ color: "#777777", marginLeft: 20 }}>
            +213707070707
          </Text>
        </View>
        <View style={styles.row}>
          <Icon name="email" color={Colors.brand} size={20} />
          <Text style={{ color: "#777777", marginLeft: 20 }}>
            sonelgaz.distribution@email.com
          </Text>
        </View>
      </View>

      <View style={styles.infoBoxWrapper}>
        <View
          style={[
            styles.infoBox,
            {
              borderRightColor: "#dddddd",
              borderRightWidth: 1,
            },
          ]}
        >
          <Text>
            {" "}
            Equipe{" "}
            {username === "amine"
              ? "A"
              : username === "farid"
              ? "C"
              : username === "ahmed"
              ? "B"
              : "SAFI"}
          </Text>
        </View>
        <View style={styles.infoBox}>
          <Text>6</Text>
          <Text>taches </Text>
        </View>
      </View>

      {/* <View style={styles.menuWrapper}>
        <View onPress={() => {}}>
          <View style={styles.menuItem}>
            <Entypo name="list" color={Colors.brand} size={25} />
            <Text style={styles.menuItemText}>List d'equipe</Text>
          </View>
        </View>
        <View onPress={() => {}}>
          <View style={styles.menuItem}>
            <Entypo name="progress-two" color={Colors.brand} size={25} />
            <Text style={styles.menuItemText}>Progres</Text>
          </View>
        </View>

        <View onPress={() => {}}>
          <View style={styles.menuItem}>
            <Icon name="account-check-outline" color={Colors.brand} size={25} />
            <Text style={styles.menuItemText}>Contacter support</Text>
          </View>
        </View>
        <View> */}
      {/* <TouchableOpacity
        onPress={Logout}
        style={{ position: "absolute", bottom: "5%" }}
      >
        <View style={styles.menuItem}>
          <SimpleLineIcons name="logout" color={Colors.brand} size={25} />
          <Text style={styles.menuItemText}>Logout</Text>
        </View>
      </TouchableOpacity> */}
    </SafeAreaView>
  );
};
export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  userInfoSection: {
    paddingHorizontal: 30,
    marginBottom: 25,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
    fontWeight: "500",
  },
  row: {
    flexDirection: "row",
    marginBottom: 10,
  },
  infoBoxWrapper: {
    borderBottomColor: "#dddddd",
    borderBottomWidth: 1,
    borderTopColor: "#dddddd",
    borderTopWidth: 1,
    flexDirection: "row",
    height: 100,
  },
  infoBox: {
    width: "50%",
    alignItems: "center",
    justifyContent: "center",
  },
  menuWrapper: {
    marginTop: 10,
  },
  menuItem: {
    flexDirection: "row",
    paddingVertical: 15,
    paddingHorizontal: 30,
  },
  menuItemText: {
    color: "#777777",
    marginLeft: 20,
    fontWeight: "600",
    fontSize: 16,
    lineHeight: 26,
  },
});
