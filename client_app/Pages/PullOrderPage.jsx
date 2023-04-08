import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Animated } from 'react-native';
import React, { useState, useEffect, useContext, useRef } from 'react';
import { GlobalContext } from '../GlobalData/GlobalData';
import { Icon } from '@rneui/themed';
import { useNavigation } from '@react-navigation/native';

import FCDetailedPullOrders from '../FunctionalComps/FCDetailedPullOrders';
import FCDateTime from '../FunctionalComps/FCDateTime';

export default function PullOrderPage(props) {

  const navigation = useNavigation();

  const { pullOrderId, PullOrdersList } = props.route.params;
  const [pullOrder, setPullOrder] = useState(null);
  const [medsInOrderList, setMedsInOrderList] = useState([]);
  const { apiUrlPullOrder, depId } = useContext(GlobalContext);
  const [isWaitingOrder, setIsWaitingOrder] = useState(false);

  //----------------------GET Meds in pull Order---------------------
  useEffect(() => {
    fetch(apiUrlPullOrder + 'GetOrderDetails/depId/' + `${depId}` + '/orderId/' + `${pullOrderId}` + '/type/' + `${2}`, {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json; charset=UTF-8',
        'Accept': 'application/json; charset=UTF-8',
      })
    })
      .then(result => {
        return result.json();
      })
      .then(
        (result) => {
          setMedsInOrderList(result);
          const order = PullOrdersList.find((order) => order.orderId === pullOrderId);
          setPullOrder(order);
        },
        (error) => {
          console.log("err get=", error);
        });
  }, []);

  useEffect(() => {
    if (pullOrder !== null) {
      if (pullOrder.orderStatus === "W") {
        setIsWaitingOrder(true);
      }
      else {
        setIsWaitingOrder(false);
      }
    }
  }, [pullOrder]);

  const handleDeletePullOrder = () => {

    console.log("handle Delete Pull Order is pressed!");

    fetch(apiUrlPullOrder + 'OrderId/' + `${pullOrderId}` + '/type/' + `${2}`, {
      method: 'DELETE',
      headers: new Headers({
        'Content-Type': 'application/json; charset=UTF-8',
        'Accept': 'application/json; charset=UTF-8',
      })
    })
      .then(result => {
        return result.json();

      })
      .then(
        (result) => {
          console.log("res=", result);
            navigation.navigate('צפייה בהזמנת משיכה');
        },
        (error) => {
          console.log("err delete=", error);
        });
  };

  //animation for add BTN to stick to screen while scroll
  const scrollY = useRef(new Animated.Value(0)).current;//set the current state of y axe value

  return (
    <View style={styles.container}>
      {pullOrder !== null && (
        <>
          {/* --------------------------------------------------שורת סטטוס ותאריך------------------------------------------------------- */}
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <FCDateTime date={pullOrder.orderDate}></FCDateTime>
            {pullOrder.orderStatus === 'I' && (
              <Text style={{ color: '#5D9C59' }}>הונפק</Text>
            )}
            {pullOrder.orderStatus === 'W' && (
              <Text style={{ color: '#DF2E38' }}>בהמתנה</Text>
            )}
            {pullOrder.orderStatus === 'T' && (
              <Text style={{ color: '#FFC300' }}>מועבר</Text>
            )}
          </View>
          {/* ----------------------------------------------------------שורת כותרת------------------------------------------------------- */}
          <Text style={styles.title}>הזמנה מספר <Text>{pullOrderId}</Text></Text>
          {/* -----------------------------------------------שורת יוצר הזמנה ורוקח מנפיק-------------------------------------------------- */}
          <View>
            <Text style={styles.txt}>יוצר ההזמנה: <Text style={styles.txt}>{pullOrder.nurseName}</Text></Text>
            {(pullOrder.orderStatus === 'I' || pullOrder.orderStatus === 'T') && (
              <Text style={styles.txt}>רוקח אחראי: <Text style={styles.txt}>{pullOrder.pharmacistName}</Text></Text>
            )}
          </View>
          {/* --------------------------------------------------פירוט תרופות בהזמנה------------------------------------------------------- */}
          <Text style={styles.txt}>פירוט הזמנה:</Text>
          <ScrollView>
            <FCDetailedPullOrders isWaitingOrder={isWaitingOrder} medsInOrderList={medsInOrderList} />
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
          {/* ---------------------------------------------כפתור מחיקת הזמנה בסטטוס ממתין------------------------------------------- */}
          {pullOrder.orderStatus === 'W' && (
            <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity style={[styles.button, { backgroundColor: '#5D9C59' }]} onPress={() => handleUpdateRequest()}>
                <Text style={styles.buttonText}>עדכון</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.button, { backgroundColor: '#CF2933' }]} onPress={() => handleDeletePullOrder()}>
                <Text style={styles.buttonText} >ביטול הזמנה</Text>
              </TouchableOpacity>
            </View>
          )}

        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  txt: {
    color: '#003D9A',
    marginTop: 5,
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 10,
    color: '#003D9A',
    marginTop: 20,
  },
  button: {
    flex: 1,
    backgroundColor: '#00317D',
    padding: 10,
    borderRadius: 5,
    margin: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  AddBTN: {
    /*     position: 'absolute',
        bottom: 100,
        right: 20, */
    backgroundColor: '#003D9A',
    borderRadius: 100,
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
});