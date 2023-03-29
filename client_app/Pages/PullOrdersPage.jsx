import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Animated } from 'react-native';
import React, { useContext, useState, useEffect, useRef } from 'react';
import { Icon } from '@rneui/themed';
import { useNavigation } from '@react-navigation/native';

import { GlobalContext } from '../GlobalData/GlobalData';
import FCPullOrders from '../FunctionalComps/FCPullOrders';

export default function PullOrdersPage() {
  const navigation = useNavigation();

  const { apiUrlPullOrder, depId } = useContext(GlobalContext);
  const [pullOrders, setPullOrders] = useState([]);
  /*   const [medsPerPullOrder, setMedsPerPullOrder] = useState();
  
  useEffect(() => {
    pullOrders.map((pullOrder) => {
      console.log(pullOrder);
      const acc = {}; //init the acc object
      if (!acc[pullOrder.orderId]) { //check if the orderId of already exists in the accumulator object 
        //if it doesn't exist, we create a new array for that orderId key in the acc object
        acc[pullOrder.orderId] = [];
      }
      acc[pullOrder.orderId].push(pullOrder.medId);//push the current medication data into the meds for order array.
      setMedsPerPullOrder(acc);//save the new object
    }, {});
    console.log(medsPerPullOrder);
  }, [pullOrders]) */

  //----------------------GET PullOrder---------------------
  useEffect(() => {
    fetch(apiUrlPullOrder + 'GetPullOrders/' + `${depId}`, {
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
          setPullOrders(result);
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
          <FCPullOrders PullOrdersList={pullOrders} isDetailedPullOrder={false} />
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
          <TouchableOpacity onPress={() => navigation.navigate('יצירת הזמנת משיכה')}>
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


