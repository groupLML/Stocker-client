import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import { Card } from '@rneui/base';
import { Icon } from '@rneui/themed';
import { useNavigation } from '@react-navigation/native';

export default function FCRequest(props) {

  const navigation = useNavigation();

  const handleCardPress = () => {
    navigation.navigate('צפייה בפרטי בקשה', { requestId: props.id, requestsList: props.requestsList });
  };

  const formattedDate = props.date.split(' ')[0];//סידור פורמט התאריך

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
        <Text style={styles.cardDate}>{props.time} {formattedDate}</Text>
      </View>

      <Text style={styles.cardTitle}>{props.medId}</Text>

      <Text style={styles.cardBody}><Text style={{ fontWeight: "bold" }} >כמות: </Text>{props.reqQty}</Text>
      <Text style={styles.cardBody}><Text style={{ fontWeight: "bold" }} >שם יוצר ההזמנה: </Text>{props.nurseName}</Text>
      {props.depName && <Text style={styles.cardBody}><Text style={{ fontWeight: "bold" }} >שם המחלקה שאישרה: </Text>{props.depName}</Text>}

      {props.isDetailedRequest &&
        <View style={styles.rowButton}>
          {props.reqStatus === 'W' && (
            <>
              <TouchableOpacity style={[styles.button, { backgroundColor: '#129C62' }]} onPress={() => handleAddRequest()}>
                <Text style={styles.buttonText}>עדכון</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.button, { backgroundColor: '#E51C1C' }]} onPress={() => handleAddRequest()}>
                <Text style={styles.buttonText} >מחיקת העברה</Text>
              </TouchableOpacity>
            </>
          )}
          {props.reqStatus === 'A' && (
            <>
              <TouchableOpacity style={[styles.button, { backgroundColor: '#129C62' }]} onPress={() => handleAddRequest()}>
                <Text style={styles.buttonText}>אישור העברה</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.button, { backgroundColor: '#E51C1C' }]} onPress={() => handleAddRequest()}>
                <Text style={styles.buttonText} >ביטול העברה</Text>
              </TouchableOpacity>
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
  cardDate: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#003D9A",
    marginRight: 10,
    alignItems: 'center',
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
});


/*     <Card style={styles.cardContainer} borderColor="#00317D" >
      <View style={styles.row}>
        <Text style={styles.cardStatus}>
          {props.reqStatus === 'A' ? <Text style={{ color: '#00914B' }}>מאושר</Text> :
            props.reqStatus === 'W' ? <Text style={{ color: 'red' }}>בהמתנה</Text> :
              props.reqStatus === 'D' ? 'נדחה' : null}
        </Text>
        <Text style={styles.cardDate}>{props.date}</Text>
      </View>

      <Text style={styles.cardTitle}>{props.title}</Text>
      <Text style={styles.cardBody}>{props.reqQty}</Text>

      <Icon  reverse name='checkmark' type='ionicon' color='#00914B' style={styles.icon} />

      <TouchableOpacity onPress={() => handleCardPress(props.id)}>
        <Text style={styles.readMore}>קרא עוד...</Text>
      </TouchableOpacity>
    </Card> */
