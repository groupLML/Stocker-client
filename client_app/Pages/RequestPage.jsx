import { View, Text, StyleSheet } from 'react-native';
import React, { useContext, useState, useEffect } from 'react';

import FCRequests from '../FunctionalComps/FCRequests';
import {GlobalContext} from '../GlobalData/GlobalData';


export default function RequestPage(props) {

  const { apiUrlMedRequest } = useContext(GlobalContext);

  const [requests, setRequests] = useState([]);

  //--------------------------GET Requests----------------------------

  //פו רצה פעם אחת אחרי הרנדר הראשון
  useEffect(() => {
    console.log('component did mount');
    fetch(apiUrlMedRequest, { //של השרת URL
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
          console.log(result);
        },
        (error) => {
          console.log("err post=", error);
        });
  }, [])

  return (
    <View style={styles.container}>
      <Text style={styles.title}>צפייה בבקשות המחלקה</Text>
      <FCRequests RequestsList={requests} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //justifyContent: 'center',
    //alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 30,
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: 'bold',
    marginBottom: 30,
    //fontFamily: 'Imbue',
    color: '#003D9A',
    marginTop: 30,
  },
});
