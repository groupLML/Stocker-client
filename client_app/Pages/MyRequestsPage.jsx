import { View, Text, StyleSheet, ScrollView } from 'react-native';
import React, { useContext, useState, useEffect } from 'react';

import FCRequests from '../FunctionalComps/FCRequests';
import { GlobalContext } from '../GlobalData/GlobalData';


export default function MyRequestsPage(props) {

  const { apiUrlMedRequest, myMedReqs, setMyMedReqs, depId,isRequestUpdated, setIsRequestUpdated} = useContext(GlobalContext);

  const [requests, setRequests] = useState([]);

  //----------------------GET Requests details ---------------------

  useEffect(() => {//depId פונ' רצה כל פעם שמתעדכן 
    fetch(apiUrlMedRequest + 'RequestsMine/' + `${depId}`, { //של השרת URL
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
          setRequests(result); //set the requests of choosen dep to display
        },
        (error) => {
          console.log("err post=", error);
        });
  }, [myMedReqs,depId])

  //להחליט לאן להעביר את זה
  //----------------------GET MedRequests ---------------------
  
  useEffect(() => {
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
          setMyMedReqs(result); // set the requests list 
          if(isRequestUpdated){
            setIsRequestUpdated(false);
          }
        },
        (error) => {
          console.log("err post=", error);
        });
  }, [isRequestUpdated]) // did update

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
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#003D9A',
    marginTop: 30,
  },
});
