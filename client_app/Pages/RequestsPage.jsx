import { View, Text, StyleSheet, ScrollView } from 'react-native';
import React, { useContext, useState, useEffect } from 'react';


import FCRequests from '../FunctionalComps/FCRequests';
import { GlobalContext } from '../GlobalData/GlobalData';


export default function RequestsPage(props) {

  const { apiUrlMedRequest } = useContext(GlobalContext);

  const [requests, setRequests] = useState([]);

  const getData = () => {
    try {//Retrieving AsyncStorage data
      AsyncStorage.getItem('User', (err, result) => {
        return result != null ? JSON.parse(result.cDep) : null;
      })
    } catch (e) {
      // error reading value
    }
  }

  //--------------------------GET Requests details ----------------------------

  //פו רצה פעם אחת אחרי הרנדר הראשון
  useEffect(() => {
    console.log('component did mount');

    fetch(apiUrlMedRequest + '3', { //של השרת URL
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
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.title}>צפייה בבקשות המחלקה</Text>
        <FCRequests RequestsList={requests} />
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
