import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
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
import PushOrdersPage from './Pages/PushOrdersPage';
import PushOrderPage from './Pages/PushOrderPage';
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
            } else if (route.name === 'הזמנות') {
              iconName = focused ? 'reader' : 'reader-outline';
            } else if (route.name === 'בקשות') {
              iconName = focused ? 'mail' : 'mail-outline';
            } else if (route.name === 'הודעות') {
              iconName = focused ? 'notifications' : 'notifications-outline';
            }
            // Return the icon component
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#00317D',
          tabBarInactiveTintColor: '#00317D',
          tabBarActiveBackgroundColor: '#E1EAF9',
          tabBarInactiveBackgroundColor: '#E1EAF9',
          tabBarLabelStyle: {
            fontSize: 12,
          },
        })}
      >

        {/* ************************************************ menu tabs ****************************************************** */}
        <Tab.Screen name="בית" component={HomePage} />
        <Tab.Screen name="הזמנות" component={OrdersPage} />
        <Tab.Screen name="בקשות" component={RequestsPage} />
        <Tab.Screen name="הודעות" component={NotificationPage} />

        {/* ************************************************ hidden tabs ****************************************************** */}
        <Tab.Screen name="יצירת בקשה" component={AddRequestPage} options={{tabBarButton: () => null, goBack:'history'}}/>
        <Tab.Screen name="צפייה בפרטי בקשה" component={MyRequestPage} options={{tabBarButton: () => null}}/>
        <Tab.Screen name="צפייה בבקשות שלי" component={MyRequestsPage} options={{tabBarButton: () => null}}/>
        <Tab.Screen name="צפייה בבקשות אחרים" component={OthersRequestsPage} options={{tabBarButton: () => null}}/>
        <Tab.Screen name="יצירת הזמנת משיכה" component={AddPullOrderPage} options={{tabBarButton: () => null}}/>
        <Tab.Screen name="צפייה בהזמנת משיכה" component={PullOrdersPage} options={{tabBarButton: () => null}}/>
        <Tab.Screen name="צפייה בפרטי הזמנת משיכה" component={PullOrderPage} options={{tabBarButton: () => null}}/>
        <Tab.Screen name="צפייה בהזמנת דחיפה" component={PushOrdersPage} options={{tabBarButton: () => null}}/>
        <Tab.Screen name="צפייה בפרטי הזמנת דחיפה" component={PushOrderPage} options={{tabBarButton: () => null}}/>
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
            {/* <Stack.Screen name="צפייה בפרטי בקשה" component={MyRequestPage} options={{ tabBarVisible: true }}/>
            <Stack.Screen name="צפייה בבקשות שלי" component={MyRequestsPage} />
            <Stack.Screen name="צפייה בבקשות אחרים" component={OthersRequestsPage} />
            <Stack.Screen name="צפייה בבקשות" component={RequestsPage} />
            <Stack.Screen name="יצירת הזמנת משיכה" component={AddPullOrderPage} />
            <Stack.Screen name="צפייה בהזמנת משיכה" component={PullOrdersPage} />
            <Stack.Screen name="צפייה בפרטי הזמנת משיכה" component={PullOrderPage} />
            <Stack.Screen name="צפייה בהזמנת דחיפה" component={PushOrdersPage} />
            <Stack.Screen name="צפייה בפרטי הזמנת דחיפה" component={PushOrderPage} />
            <Stack.Screen name="צפייה הזמנות" component={OrdersPage} /> */}
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