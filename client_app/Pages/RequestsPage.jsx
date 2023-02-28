import { View, Text, StyleSheet, ScrollView } from 'react-native';
import React, { useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import FCRequests from '../FunctionalComps/FCRequests';
import { GlobalContext } from '../GlobalData/GlobalData';


export default function RequestsPage(props) {

  const { apiUrlMedRequest } = useContext(GlobalContext);

  const [requests, setRequests] = useState([]);
  const [depId, setDepId] = useState('');

  //----------------------GET Requests details ---------------------

  useEffect(() => {//depId פונ' רצה כל פעם שמתעדכן 

    const getData = () => {
      try {//Retrieving AsyncStorage data
        AsyncStorage.getItem('User', (err, result) => {
          if (result != null) {
            setDepId(JSON.parse(result).depId);}
        })
      } catch (e) {
        // error reading value
      }
    }
    
    getData();

    fetch(apiUrlMedRequest + `${depId}`, { //של השרת URL
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
          setRequests(result);
        },
        (error) => {
          console.log("err post=", error);
        });
  }, [depId])

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.title}>צפייה בבקשות המחלקה</Text>
        <FCRequests RequestsList={requests} isDetailedRequest={false} />
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
    //justifyContent: 'center',
    //alignItems: 'center',
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#003D9A',
    marginTop: 30,
  },
});
