import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Animated } from 'react-native';
import React, { useContext, useState, useEffect, useRef } from 'react';
import { Icon } from '@rneui/themed';

import { GlobalContext } from '../GlobalData/GlobalData';
import FCPullOrders from '../FunctionalComps/FCPullOrders';

export default function PullOrdersPage(props) {

  const { apiUrlPullOrder, depId } = useContext(GlobalContext);

  const [pullOrders, setPullOrders] = useState([]);

  //----------------------GET PullOrder details ---------------------

  useEffect(() => {//depId פונ' רצה כל פעם שמתעדכן 

    fetch(apiUrlPullOrder + `${depId}`, { //של השרת URL
      method: 'GET',//מה המתודה
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
        },
        (error) => {
          console.log("err get=", error);
        });
  }, [depId])

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
          <TouchableOpacity onPress={() => props.navigation.navigate('יצירת הזמנת משיכה')}>
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
