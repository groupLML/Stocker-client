import { View, Text, StyleSheet, ScrollView } from 'react-native';
import React, { useContext, useState, useEffect } from 'react';
import { Icon } from '@rneui/themed';

import { GlobalContext } from '../GlobalData/GlobalData';
import FCMyRequests from '../FunctionalComps/FCMyRequests';

export default function MyRequestsPage(props) {

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

  return (
    <View style={styles.container}>
      <Text style={styles.title}>בקשות המחלקה</Text>
      <ScrollView>
        <Icon
          reverse
          name='add'
          type='ionicon'
          color='#00317D'
          onPress={() => props.navigation.navigate('יצירת בקשה')}
          style={styles.icon}
        />
        <FCMyRequests RequestsList={myMedReqs} isDetailedRequest={false} />
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    position: 'relative', // make it the relative parent of the icon
  },
  title: {
    fontSize: 25,
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#003D9A',
    marginTop: 20,
  },
  icon: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    //borderRadius: 10,
    zIndex: 1,
  },
});






