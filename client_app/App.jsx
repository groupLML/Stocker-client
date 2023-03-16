import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import GlobalData from './GlobalData/GlobalData';
import LoginPage from './Pages/LoginPage';
import HomePage from './Pages/HomePage';
import AddRequestPage from './Pages/AddRequestPage';
import MyRequestsPage from './Pages/MyRequestsPage';
import RequestPage from './Pages/MyRequestPage';
import AddPullOrderPage from './Pages/AddPullOrderPage';
import PullOrdersPage from './Pages/PullOrdersPage';
import PullOrderPage from './Pages/PullOrderPage';
import OthersRequestsPage from './Pages/OthersRequestsPage';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();


function MainTabNavigator() {
  return (
    <SafeAreaView style={styles.container}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ color, size }) => {
            let iconName;

            if (route.name === 'בית') {
              iconName = 'home';
            }
            else if (route.name === 'הזמנות') {
              iconName = 'reader-outline';
            }
            else if (route.name === 'בקשות') {
              iconName = 'mail-outline';
            }

            // Return the icon component
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
      >
        <Tab.Screen name="בית" component={HomePage} />
        <Tab.Screen name="הזמנות" component={PullOrdersPage} />
        <Tab.Screen name="בקשות" component={MyRequestsPage} />
      </Tab.Navigator>
      </SafeAreaView>
  );
}

export default function App() {
  return (
    <GlobalData>
      <SafeAreaProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="התחברות" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="התחברות" component={LoginPage} />
            <Stack.Screen name="ראשי" component={MainTabNavigator} options={{ headerShown: false }} />
            <Stack.Screen name="יצירת בקשה" component={AddRequestPage} />
            <Stack.Screen name="צפייה בפרטי בקשה" component={RequestPage} />
            <Stack.Screen name="צפייה בבקשות אחרים" component={OthersRequestsPage} />
            <Stack.Screen name="יצירת הזמנת משיכה" component={AddPullOrderPage} />
            <Stack.Screen name="צפייה בפרטי הזמנת משיכה" component={PullOrderPage} />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </GlobalData>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop:5,
  },
});