import { View, Text, StyleSheet, TextInput } from 'react-native';
import React from 'react';
import FCRequests from '../FunctionalComps/FCRequests';

export default function RequestPage(props) {

  const { requestId, requestsList } = props.route.params;

  let request = requestsList.filter((item) => item.reqId === requestId);//get the request item to read 

  return (
    <View style={styles.container}>
      <Text style={styles.title}>בקשה ממחלקה</Text>
      <FCRequests RequestsList={request} isDetailedRequest={true}/>      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    color: '#003D9A',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
});