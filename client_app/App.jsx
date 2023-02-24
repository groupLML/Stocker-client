import { StyleSheet, Text, View } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import GlobalData from './GlobalData/GlobalData';
import LoginPage from './Pages/LoginPage';
import HomePage from './Pages/HomePage';
import AddRequestPage from './Pages/AddRequestPage';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <GlobalData>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={LoginPage} />
          <Stack.Screen name="Home" component={HomePage} />
          <Stack.Screen name="AddReques" component={AddRequestPage} />
        </Stack.Navigator>
      </NavigationContainer>
    </GlobalData>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

