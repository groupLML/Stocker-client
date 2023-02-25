import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import { Card } from '@rneui/base';

export default function FCRequest(props) {

  return (
    <Card style={styles.cardContainer} borderColor= "#00317D" >
      <View>

        <Text style={styles.cardDate}>{props.date}</Text>
        <Text style={styles.cardBody}>{props.reqStatus === 'A' ? 'מאושר' : props.reqStatus === 'W' ? 'בהמתנה' : props.reqStatus === 'D' ? 'נדחה' : null}</Text>
        <Text style={styles.cardTitle}>{props.title}</Text>
        <Text style={styles.cardBody}>{props.reqQty}</Text>
        
      
        <TouchableOpacity onPress={() => handleCardPress(props.id)}>
            <Text style={styles.readMore}>קרא עוד...</Text>
        </TouchableOpacity>

      </View>
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
  cardDate: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#003D9A",
    marginBottom: 10,
  }, 
  cardTitle: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  cardBody: {
    marginVertical: 10,
    fontSize: 20,
  },
  deleteButton: {
    marginTop: 10,
  },
  readMore: {
    color: "#007bff",
    textAlign: "right",
    marginTop: 10,
  },
});