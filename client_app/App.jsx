import { StyleSheet } from 'react-native';
import { useState } from 'react';
import { getFocusedRouteNameFromRoute, NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

import GlobalData from './GlobalData/GlobalData';
import LoginPage from './Pages/LoginPage';
import HomePage from './Pages/HomePage';
import AddRequestPage from './Pages/AddRequestPage';
import MyRequestsPage from './Pages/MyRequestsPage';
import MyRequestPage from './Pages/MyRequestPage';
import AddPullOrderPage from './Pages/AddPullOrderPage';
import PullOrdersPage from './Pages/PullOrdersPage';
import PullOrderPage from './Pages/PullOrderPage';
import OthersRequestsPage from './Pages/OthersRequestsPage';
import NotificationPage from './Pages/NotificationPage';
import RequestsPage from './Pages/RequestsPage';
import OrdersPage from './Pages/OrdersPage';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();


function MainTabNavigator() {

  return (
    <SafeAreaView style={styles.container}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === 'בית') {
              iconName = focused ? 'home' : 'home-outline';
            }
            else if (route.name === 'הזמנות') {
              iconName = focused ? 'reader' : 'reader-outline';
            }
            else if (route.name === 'בקשות') {
              iconName = focused ? 'mail' : 'mail-outline';
            }
            else if (route.name === 'הודעות') {
              iconName = focused ? 'notifications' : 'notifications-outline';
            }

            // Return the icon component
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: '#00317D',
          inactiveTintColor: '#00317D',
          activeBackgroundColor: '#E1EAF9',
          inactiveBackgroundColor: '#E1EAF9',

          //activeTintColor: '#004DC1',
          //activeTintColor: '#0064FF',
          //activeTintColor: '#2E6CCB',

          /* activeTintColor: '#54A9FF',
          inactiveTintColor: 'white',
          activeBackgroundColor: '#00317D',
          inactiveBackgroundColor: '#00317D', */

          /*    activeTintColor: '#54A9FF',
             inactiveTintColor: '#00317D',
             activeBackgroundColor: 'white',
             inactiveBackgroundColor: 'white', */
          labelStyle: {
            fontSize: 12,
            //fontWeight: 'bold'
          },
        }}
      >
        <Tab.Screen name="בית" component={HomePage} />
        <Tab.Screen name="הזמנות" component={OrdersPage} />
        <Tab.Screen name="בקשות" component={RequestsPage} />
        <Tab.Screen name="הודעות" component={NotificationPage} />
      </Tab.Navigator>
    </SafeAreaView>
  );
}

export default function App() {
  return (
    <GlobalData>
      <SafeAreaView style={styles.container}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="התחברות" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="התחברות" component={LoginPage} />
            <Stack.Screen name="ראשי" component={MainTabNavigator} options={{ headerShown: false }} />
            <Stack.Screen name="יצירת בקשה" component={AddRequestPage} />
            <Stack.Screen name="צפייה בפרטי בקשה" component={MyRequestPage} />
            <Stack.Screen name="צפייה בבקשות שלי" component={MyRequestsPage} />
            <Stack.Screen name="צפייה בבקשות אחרים" component={OthersRequestsPage} />
            <Stack.Screen name="צפייה בבקשות" component={RequestsPage} />
            <Stack.Screen name="יצירת הזמנת משיכה" component={AddPullOrderPage} />
            <Stack.Screen name="צפייה בהזמנת משיכה" component={PullOrdersPage} />
            <Stack.Screen name="צפייה בפרטי הזמנת משיכה" component={PullOrderPage} />
            <Stack.Screen name="צפייה הזמנות" component={OrdersPage} />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    </GlobalData>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});