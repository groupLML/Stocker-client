import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';
import { Icon } from '@rneui/themed';
import { Card } from '@rneui/base';

import FCQuantityInput from './FCQuantityInput';
import FCMedInput from '../FunctionalComps/FCMedInput';
import FCDateTime from './FCDateTime';

export default function FCDetailedRequest(props) {

  const handleUpdateRequest = () => { };
  const handleApproveRequest = () => { };
  const handleCancelRequest = () => { };
  const handleDeleteRequest = (item) => { };

  return (
    <Card style={styles.Container} borderColor="#00317D">
      <View style={styles.row}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          {props.reqStatus === 'A' && (
            <>
              <Icon type="ionicon" name="checkmark" color="#00914B" size={20} />
              <Text style={{ color: '#00914B' }}>מאושר</Text>
            </>
          )}
          {props.reqStatus === 'W' && (
            <>
              <Icon type="ionicon" name="hourglass" color="red" size={20} />
              <Text style={{ color: 'red' }}>בהמתנה</Text>
            </>
          )}
          {props.reqStatus === 'D' && <Text>נדחה</Text>}
        </View>
        <FCDateTime time={props.time} date={props.date} />
      </View>

      {props.reqStatus === 'A' && (
        <>
          <Text style={styles.Title}>{props.genName}</Text>
          <Text style={styles.Body}><Text style={{ fontWeight: "bold" }} >כמות: </Text>{props.reqQty}</Text>
          <Text style={styles.Body}><Text style={{ fontWeight: "bold" }} >שם יוצר ההזמנה: </Text>{props.nurseName}</Text>
          <Text style={styles.Body}><Text style={{ fontWeight: "bold" }} >שם המחלקה שאישרה: </Text>{props.depName}</Text>
          <View style={styles.row}>
            <TouchableOpacity style={[styles.button, { backgroundColor: '#129C62' }]} onPress={() => handleApproveRequest()}>
              <Text style={styles.buttonText}>אישור העברה</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, { backgroundColor: '#E51C1C' }]} onPress={() => handleCancelRequest()}>
              <Text style={styles.buttonText} >ביטול העברה</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
      {props.reqStatus === 'W' && (
        <>
          <View style={styles.row}><Text style={styles.fields}>שם תרופה:</Text><FCMedInput /></View>
          <FCQuantityInput Qty={props.reqQty} />
          <Text style={styles.Body}><Text style={{ fontWeight: "bold" }} >שם יוצר ההזמנה: </Text>{props.nurseName}</Text>
          <View style={styles.row}>
            <TouchableOpacity style={[styles.button, { backgroundColor: '#129C62' }]} onPress={() => handleUpdateRequest()}>
              <Text style={styles.buttonText}>עדכון</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, { backgroundColor: '#E51C1C' }]} onPress={() => handleDeleteRequest()}>
              <Text style={styles.buttonText} >מחיקת העברה</Text>
            </TouchableOpacity>
          </View>
        </>
      )}

    </Card>
  )
}

const styles = StyleSheet.create({
  Container: {
    width: "60%",
    padding: 10,
    marginBottom: 10,
    borderRadius: 20,
  },
  Title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  Body: {
    marginVertical: 10,
    fontSize: 15,
    color: "#003D9A",
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  rowButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    justifyContent: 'center',
  },
  button: {
    backgroundColor: '#00317D',
    padding: 10,
    borderRadius: 5,
    margin: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});
