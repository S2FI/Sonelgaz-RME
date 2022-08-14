import { StyleSheet, Text, View } from 'react-native';
import Login from './Navigation/screens/Login';
import Login2 from './Navigation/screens/Login2';
import MainContainer from './Navigation/MainContainer';
import { NavigationContainer } from '@react-navigation/native';
import Welcome from './Navigation/screens/Welcome';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DetailsScreen from './Navigation/screens/DetailsScreen';
import ImagePickerExample from './components/ImageTP';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
     <NavigationContainer>
     <Stack.Navigator
     options={{headerShown: false}}>
       <Stack.Screen
         name="Welcome"
         component={MainContainer}
         options={{headerShown: false}}
       />
       <Stack.Screen 
       name="Login2" 
       component={Login2} />
       <Stack.Screen 
       name="MainContainer" 
       component={MainContainer} />
     </Stack.Navigator>
   </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
