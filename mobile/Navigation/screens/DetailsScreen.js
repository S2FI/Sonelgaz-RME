import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
// Screens
import MaintenanceFormScreen from "./MaintenanceFormScreen";
import VisiteFormScreen from "./VisiteFormScreen";
import EntretienFormScreen from "./EntretienFormScreen";
import { Text } from "react-native";
import { Colors } from "../../components/styles";

const MaintenanceFormName = "Maintenance";
const VisiteFormName = "Visite";
const EntretienForName = "Entretien";

const Tab = createMaterialTopTabNavigator();

export default function DetailsScreen({ route, navigation }) {
  const { username } = route.params;

  return (
    <NavigationContainer independent={true}>
      <Tab.Navigator
        initialRouteName={MaintenanceFormName}
        screenOptions={{
          tabBaractiveTintColor: "tomato",
          tabBarinactiveTintColor: "grey",

          tabBarIndicatorStyle: { backgroundColor: Colors.brand },
          tabBarlabelStyle: { padding: 10, fontSize: 20 },
          tabBarStyle: {
            paddingTop: 25,
            backgroundColor: Colors.primary,
            height: 80,
          },
        }}
      >
        <Tab.Screen
          name={MaintenanceFormName}
          component={MaintenanceFormScreen}
          initialParams={{ user: username }}
          options={{
            tabBarLabel: ({ focused, color }) => (
              <Text
                style={{
                  color: focused ? Colors.brand : Colors.grey,
                }}
              >
                {MaintenanceFormName}
              </Text>
            ),
          }}
        />
        <Tab.Screen
          name={VisiteFormName}
          component={VisiteFormScreen}
          initialParams={{ user: username }}
          options={{
            tabBarLabel: ({ focused, color }) => (
              <Text
                style={{
                  color: focused ? Colors.brand : Colors.grey,
                  fontFamily: "sans-serif",
                }}
              >
                {VisiteFormName}
              </Text>
            ),
          }}
        />
        <Tab.Screen
          name={EntretienForName}
          component={EntretienFormScreen}
          initialParams={{ user: username }}
          options={{
            tabBarLabel: ({ focused, color }) => (
              <Text
                style={{
                  color: focused ? Colors.brand : Colors.grey,
                  fontFamily: "sans-serif",
                }}
              >
                {EntretienForName}
              </Text>
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
