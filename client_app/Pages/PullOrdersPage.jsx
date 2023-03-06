import { View, Text, StyleSheet, ScrollView } from 'react-native';
import React, { useContext, useState, useEffect } from 'react';

import { GlobalContext } from '../GlobalData/GlobalData';
import FCPullOrders from '../FunctionalComps/FCPullOrders';

export default function PullOrdersPage() {

  const { apiUrlPullOrder, depId } = useContext(GlobalContext);

  const [pullOrders, setPullOrders] = useState([]);

  //----------------------GET Requests details ---------------------

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
          console.log("err post=", error);
        });
  }, [depId])

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.title}>צפייה בהזמנות במשיכה</Text>
        <FCPullOrders PullOrdersList={pullOrders} isDetailedPullOrder={false} />
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 30,
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#003D9A',
    marginTop: 30,
  },
});
