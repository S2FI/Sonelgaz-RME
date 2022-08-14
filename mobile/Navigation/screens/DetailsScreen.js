import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Screens
import MaintenanceFormScreen from './MaintenanceFormScreen';
import VisiteFormScreen from './VisiteFormScreen';
import EntretienFormScreen from './EntretienFormScreen';

const MaintenanceFormName = "Maintenance";
const VisiteFormName = "Visite";
const EntretienForName = "Entretien";

const Tab = createMaterialTopTabNavigator();

export default function DetailsScreen({ navigation }) {
    return (
      <NavigationContainer independent={true}>
      <Tab.Navigator
        initialRouteName={MaintenanceFormName}
        
        tabBarOptions={{
          activeTintColor: 'tomato',
          inactiveTintColor: 'grey',
          labelStyle: { paddingBottom: 10, fontSize: 10 },
          style: { padding: 10, height: 70}
        }}>

        <Tab.Screen name={MaintenanceFormName} component={MaintenanceFormScreen} />
        <Tab.Screen name={VisiteFormName} component={VisiteFormScreen} />
        <Tab.Screen name={EntretienForName} component={EntretienFormScreen} />
      </Tab.Navigator>
    </NavigationContainer>


    );
}