import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect } from 'react';
import { Card } from '@rneui/base';

import FCDateTime from './FCDateTime';

export default function FCNotification(props) {
  useEffect(() => {
    console.log(props.msg);
  }, []);

  return (
    <View>
      <Text>FCNotification</Text>
    </View>
    /*<Card style={styles.cardContainer} borderColor="#E1EAF9">
          <FCDateTime date={props.date} />
          <Text style={styles.cardTitle}>{props.pharmacistName}</Text>
          <Text style={styles.cardBody}>{props.msg}</Text>
        </Card> */
  )
}

const styles = StyleSheet.create({
  /*   cardContainer: {
      width: "60%",
      padding: 10,
      marginBottom: 10,
      borderRadius: 20,
    },
    cardTitle: {
      fontSize: 20,
      fontWeight: "bold",
      textAlign: "center",
      marginBottom: 10,
      color: "#003D9A",
    },
    cardBody: {
      marginVertical: 10,
      fontSize: 15,
      color: "#003D9A",
    }, */
});
