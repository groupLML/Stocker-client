import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Animated } from 'react-native';
import React, { useContext, useRef, useEffect, useState } from 'react';
import { Icon } from '@rneui/themed';
import { useNavigation } from '@react-navigation/native';
/* import * as Notifications from "expo-notifications"; */

import { GlobalContext } from '../GlobalData/GlobalData';
import FCMyRequests from '../FunctionalComps/FCMyRequests';
import FCSearchBar from '../FunctionalComps/FCSearchBar ';

/* Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
    }),
}); */

export default function MyRequestsPage(props) {
  const navigation = useNavigation();

  const { apiUrlMedRequest, depId, myMedReqs, setMyMedReqs } = useContext(GlobalContext);
  const [statusFilter, setStatusFilter] = useState('all');
  const [ReqsSearch, setReqsSearch] = useState([]);

  const handleSearch = (search) => {
    if (myMedReqs.length != 0) {
      const filtered = myMedReqs.filter(item => item.medName.toLowerCase().includes(search.toLowerCase()));
      setReqsSearch(filtered);
    }
  };

  //----------------------GET Requests details ---------------------
  useEffect(() => {
    fetch(apiUrlMedRequest + 'RequestsMine/' + `${depId}`, {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json; charset=UTF-8',
        'Accept': 'application/json; charset=UTF-8',
      })
    })
      .then(res => {
        return res.json()
      })
      .then(
        (result) => {
          setMyMedReqs(result); //set the requests of choosen dep to display
          setReqsSearch(result);
          if (props.isChanged) {
            props.handleIsChanged(false);
          }
        },
        (error) => {
          console.log("err post=", error);
        });
  }, [props.isChanged]) // did update

  //animation for add BTN to stick to screen while scroll
  const scrollY = useRef(new Animated.Value(0)).current;//set the current state of y axe value

  /* //----------------------GET Notification---------------------
   const [notification, setNotification] = useState(false);
   const notificationListener = useRef();
   const responseListener = useRef();
   useEffect(() => {
       notificationListener.current =
           Notifications.addNotificationReceivedListener((notification) => {
               setNotification(notification);
           });

       responseListener.current =
           Notifications.addNotificationResponseReceivedListener((response) => {
               const { notification } = response;
               console.log(notification);
           });

       return () => {
           Notifications.removeNotificationSubscription(notificationListener.current);
           Notifications.removeNotificationSubscription(responseListener.current);
       };
   }, []); */

  return (
    <View style={styles.container}>
      <FCSearchBar handleSearch={handleSearch} />
      <View style={styles.scrollViewContainer}>
        <ScrollView scrollEventThrottle={16}>
          <FCMyRequests RequestsList={ReqsSearch} isDetailedRequest={false} statusFilter={statusFilter} onStatusFilterChange={(status) => setStatusFilter(status)} />
        </ScrollView>
        <Animated.View
          style={[styles.AddBTN, {
            transform: [{
              translateY: scrollY.interpolate({
                inputRange: [0, 100],
                outputRange: [0, 100],
                extrapolate: 'clamp'
              })
            }]
          }]}>
          <TouchableOpacity onPress={() => navigation.navigate('יצירת בקשה')}>
            <Icon name='add' color='white' />
          </TouchableOpacity>
        </Animated.View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollViewContainer: {
    flex: 1,
    position: 'relative',
  },
  title: {
    fontSize: 25,
    textAlign: 'center',
    marginBottom: 15,
    color: '#003D9A',
    marginTop: 0,
  },
  AddBTN: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#003D9A',
    borderRadius: 100,
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
});