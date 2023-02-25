import { StyleSheet, Text, View } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import GlobalData from './GlobalData/GlobalData';
import LoginPage from './Pages/LoginPage';
import HomePage from './Pages/HomePage';
import AddRequestPage from './Pages/AddRequestPage';
import RequestPage from './Pages/RequestPage';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <GlobalData>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="התחברות" screenOptions={{ headerTitleAlign: 'center' }}>
          <Stack.Screen  name="התחברות" component={LoginPage} />
          <Stack.Screen name="בית" component={HomePage} />
          <Stack.Screen name="יצירת בקשה" component={AddRequestPage} />
          <Stack.Screen name="צפייה בבקשות המחלקה" component={RequestPage} />
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

