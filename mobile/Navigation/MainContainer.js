import React, { useState, useContext, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
// Screens
import HomeScreen from "./screens/HomeScreen";
import DetailsScreen from "./screens/DetailsScreen";

import ProfileScreen from "./screens/ProfileScreen";
import { Colors } from "../components/styles";
import { Text } from "react-native";
//Screen names
const homeName = "Plannings";
const detailsName = "Formulaires";
const profileName = "Profile";

const Tab = createBottomTabNavigator();

function MainContainer({ route, navigation }) {
  function bottomBarStyle(focused, color, name) {
    return (
      <Text
        style={{
          color: focused ? Colors.brand : Colors.grey,
          fontFamily: "sans-serif",
          fontSize: 10,
        }}
      >
        {name}
      </Text>
    );
  }
  const { equipeData, user, result } = route.params;
  const [dataProgram, setDataProgram] = useState(equipeData);

  return (
    <NavigationContainer independent={true}>
      <Tab.Navigator
        initialRouteName={homeName}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            let rn = route.name;

            if (rn === homeName) {
              iconName = focused ? "home" : "home-outline";
            } else if (rn === detailsName) {
              iconName = focused ? "list" : "list-outline";
            } else if (rn === profileName) {
              iconName = focused ? "person" : "person-outline";
            }

            // You can return any component that you like here!
            return (
              <Ionicons
                name={iconName}
                size={size}
                color={focused ? Colors.brand : Colors.grey}
              />
            );
          },
          tabBarLabel: ({ focused, color }) =>
            bottomBarStyle(focused, color, route.name),
          tabBaractiveTintColor: "tomato",
          tabBarinactiveTintColor: "grey",
          tabBarlabelStyle: { paddingBottom: 10, fontSize: 20 },
          tabBarstyle: { padding: 10, height: 70 },
          tabBarIndicatorStyle: { backgroundColor: Colors.brand },
        })}
      >
        <Tab.Screen
          name={homeName}
          component={HomeScreen}
          initialParams={{ equipeData: dataProgram, equipe: result }}
          // children={() => <HomeScreen equipeData={equipeData} />}
          options={{
            headerStyle: {
              backgroundColor: Colors.primary,
            },
            headerTintColor: Colors.black,
            headerTitleStyle: {
              fontFamily: "sans-serif-medium",
            },
            headerTitleAlign: "center",
          }}
        />
        <Tab.Screen
          name={detailsName}
          component={DetailsScreen}
          initialParams={{ username: user }}
          options={{
            headerShown: false,
          }}
        />

        <Tab.Screen
          name={profileName}
          component={ProfileScreen}
          initialParams={{ username: user }}
          options={{
            headerStyle: {
              backgroundColor: Colors.primary,
            },
            headerTintColor: Colors.black,
            headerTitleStyle: {
              fontFamily: "sans-serif-medium",
            },
            headerTitleAlign: "center",
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default MainContainer;
