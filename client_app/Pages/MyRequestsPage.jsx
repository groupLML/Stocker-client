import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Animated } from 'react-native';
import React, { useContext, useRef, useEffect } from 'react';
import { Icon } from '@rneui/themed';
import { useNavigation } from '@react-navigation/native';

import { GlobalContext } from '../GlobalData/GlobalData';
import FCMyRequests from '../FunctionalComps/FCMyRequests';

export default function MyRequestsPage() {
  const navigation = useNavigation();

  const { apiUrlMedRequest, depId, myMedReqs, setMyMedReqs } = useContext(GlobalContext);

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
        },
        (error) => {
          console.log("err post=", error);
        });
  }, []) // did update

  //animation for add BTN to stick to screen while scroll
  const scrollY = useRef(new Animated.Value(0)).current;//set the current state of y axe value

  return (
    <View style={styles.container}>
      <View style={styles.scrollViewContainer}>
        <ScrollView scrollEventThrottle={16}>
          <FCMyRequests RequestsList={myMedReqs} isDetailedRequest={false} />
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