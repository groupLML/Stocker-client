import { StyleSheet, Text } from 'react-native';
import React from 'react';

export default function FCNotification() {
  return (
    <Card style={styles.cardContainer} borderColor="#E1EAF9">
      <FCDateTime date={props.date} />
      <Text style={styles.cardBody}>{props.msg}</Text>
    </Card>
  )
}

const styles = StyleSheet.create({
  cardContainer: {
    width: "60%",
    padding: 10,
    marginBottom: 10,
    borderRadius: 20,
  },
  cardBody: {
    marginVertical: 10,
    fontSize: 15,
    color: "#003D9A",
  },
});
