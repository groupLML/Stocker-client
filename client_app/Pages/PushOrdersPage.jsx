import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Animated } from 'react-native';
import React, { useContext, useState, useEffect, useRef } from 'react';
import { Icon } from '@rneui/themed';
import { useNavigation } from '@react-navigation/native';

import { GlobalContext } from '../GlobalData/GlobalData';
import FCPushOrders from '../FunctionalComps/FCPushOrders';

export default function PushOrdersPage() {

  const navigation = useNavigation();

  const { apiUrlPushOrder, depId } = useContext(GlobalContext);
  const [pushOrders, setPushOrders] = useState([]);

  //----------------------GET PushOrder---------------------
  useEffect(() => {
    fetch(apiUrlPushOrder + 'GetPushOrders/' + `${depId}`, {
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
          setPushOrders(result);
          console.log(result);
        },
        (error) => {
          console.log("err get=", error);
        });
  }, [])

  //animation for add BTN to stick to screen while scroll
  const scrollY = useRef(new Animated.Value(0)).current;//set the current state of y axe value

  return (
    <View style={styles.container}>
      <View style={styles.scrollViewContainer}>
        <ScrollView scrollEventThrottle={16}>
          <FCPushOrders PushOrdersList={pushOrders} isDetailedPushOrder={false} />
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
          <TouchableOpacity onPress={() => navigation.navigate('יצירת הזמנת דחיפה')}>
            <Icon name='add' color='white' />
          </TouchableOpacity>
        </Animated.View>
      </View>
    </View>
  )
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
    marginTop: 20,
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


