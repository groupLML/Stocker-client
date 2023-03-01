import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { Card } from '@rneui/base';
import { Icon } from '@rneui/themed';
import { useNavigation } from '@react-navigation/native';
import NumericInput from 'react-native-numeric-input';
import FCDateTime from './FCDateTime';

export default function FCRequest(props) {
  
  const navigation = useNavigation();

  const [reqQtyTep, setReqQtyTep] = useState(props.reqQty);

  const handleCardPress = () => {
    navigation.navigate('צפייה בפרטי בקשה', { requestId: props.id, requestsList: props.requestsList });
  };

  const handleUpdateRequest = () => {};
  const handleApproveRequest = () => {};
  const handleCancelRequest = () => {};
  const handleDeleteRequest = (item) => {};

  return (
    <Card style={styles.cardContainer} borderColor="#00317D">
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
      
      {/* ------------------------------------------------------------- */}

      {(!props.isDetailedRequest || props.reqStatus === 'A') && (<Text style={styles.cardTitle}>{props.genName}</Text>)}


      {(!props.isDetailedRequest || props.reqStatus === 'A') && (
        <>
          <Text style={styles.cardBody}><Text style={{ fontWeight: "bold" }} >כמות: </Text>{props.reqQty}</Text>
          <Text style={styles.cardBody}><Text style={{ fontWeight: "bold" }} >שם יוצר ההזמנה: </Text>{props.nurseName}</Text>
        </>
      )}
      {props.depName && <Text style={styles.cardBody}><Text style={{ fontWeight: "bold" }} >שם המחלקה שאישרה: </Text>{props.depName}</Text>}


      {props.isDetailedRequest &&
        <View>
          {props.reqStatus === 'W' && (
            <>
              <View style={styles.row}>
                <View style={styles.row}><Text style={[styles.cardBody, { fontWeight: "bold" }]} >שם תרופה: </Text><TextInput placeholder={props.genName} style={styles.input}></TextInput></View>
              </View>

              <View style={styles.row}>
                <Text style={[styles.cardBody, { fontWeight: "bold" }]}>כמות: </Text>
                <NumericInput
                  type='plus-minus'
                  onChange={value => setReqQtyTep({ value })}
                  rounded
                  minValue={1}
                  textColor='#003D9A'
                  iconStyle={{ color: '#003D9A' }}
                  containerStyle={{ flexDirection: 'row-reverse' }}
                  rightButtonBackgroundColor='#E1EAF9'
                  leftButtonBackgroundColor='#E1EAF9'
                  value={reqQtyTep.value}
                />
              </View>

              <Text style={styles.cardBody}><Text style={{ fontWeight: "bold" }} >שם יוצר ההזמנה: </Text>{props.nurseName}</Text>

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

          {props.reqStatus === 'A' && (
            <>
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
        </View>
      }

      {!props.isDetailedRequest &&
        <TouchableOpacity onPress={() => handleCardPress()}>
          <Text style={styles.readMore}>קרא עוד...</Text>
        </TouchableOpacity>}
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
  cardTitle: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  cardBody: {
    marginVertical: 10,
    fontSize: 15,
    color: "#003D9A",
  },
  readMore: {
    color: "#007bff",
    textAlign: "right",
    marginTop: 10,
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
  input: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#ccc',
    paddingVertical: 5, // reduce padding on top and bottom
    paddingHorizontal: 10,
    borderColor: "#00317D",
  },
});
