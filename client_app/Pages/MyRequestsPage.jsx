import { View, Text, StyleSheet, ScrollView } from 'react-native';
import React, { useContext, useState, useEffect } from 'react';

import { GlobalContext } from '../GlobalData/GlobalData';
import FCRequests from '../FunctionalComps/FCRequests';

export default function MyRequestsPage(props) {

  const { apiUrlMedRequest, depId, myMedReqs, setMyMedReqs, isRequestUpdated, setIsRequestUpdated} = useContext(GlobalContext);

  //const [requests, setRequests] = useState([]);

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
          if (isRequestUpdated) {
            setIsRequestUpdated(false);
          }
        },
        (error) => {
          console.log("err post=", error);
        });
  }, [myMedReqs], [depId], [isRequestUpdated])

  //להחליט לאן להעביר את זה
  //----------------------GET MedRequests ---------------------
  
/*   useEffect(() => {
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
  }, [isRequestUpdated]) // did update */

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.title}>בקשות המחלקה</Text>
        <FCRequests RequestsList={myMedReqs} isDetailedRequest={false} />
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
    fontSize: 25,
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#003D9A',
    marginTop: 60,
  },
});
