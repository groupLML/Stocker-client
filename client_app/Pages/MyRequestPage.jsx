import { View, Text, StyleSheet } from 'react-native';
import React, {useEffect} from 'react';

import FCMyRequests from '../FunctionalComps/FCMyRequests';

export default function MyRequestPage(props) {

  const { requestId, requestsList } = props.route.params;

  let request = requestsList.filter((item) => item.reqId === requestId);//get the request item to read 

  useEffect(() => {
    console.log(request);
  }, [])

  return (
    <View style={styles.container}>
      <Text style={styles.title}>בקשה ממחלקה</Text>
      <FCMyRequests RequestsList={request} isDetailedRequest={true} />
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
    fontSize: 25,
    textAlign: 'center',
    marginBottom: 15,
    color: '#003D9A',
  },
});