import { StyleSheet, Text, View } from "react-native";
import Login2 from "./Navigation/screens/Login2";
import MainContainer from "./Navigation/MainContainer";
import { NavigationContainer } from "@react-navigation/native";
import Welcome from "./Navigation/screens/Welcome";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import FlashMessage from "react-native-flash-message";
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator options={{ headerShown: false }}>
        <Stack.Screen
          name="Welcome"
          component={Welcome}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Login"
          component={Login2}
          options={{
            headerStyle: {
              backgroundColor: "#E78616",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
            headerTitleAlign: "center",
          }}
        />
        <Stack.Screen
          name="Sonelgaz-RME"
          component={MainContainer}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
      <FlashMessage position="top" />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
