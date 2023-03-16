import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useContext, useEffect } from 'react';
import { Card } from '@rneui/base';
import { Icon } from '@rneui/themed';

import { GlobalContext } from '../GlobalData/GlobalData';
import { useNavigation } from '@react-navigation/native';
import FCDateTime from './FCDateTime';

export default function FCRequest(props) {

  //const {uniqueMedNamesWithId} = useContext(GlobalContext);

  //get the unique name of the requiered med
  //const medName = uniqueMedNamesWithId.filter(med => med.id === props.medId).map(med => med.uniqueName)[0];
  
  const navigation = useNavigation();

  const handleCardPress = () => {
    navigation.navigate('צפייה בפרטי בקשה', { requestId: props.id, requestsList: props.requestsList });
  };

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

      <Text style={styles.cardTitle}>{props.medName}</Text>
      <Text style={styles.cardBody}><Text style={{ fontWeight: "bold" }} >כמות: </Text>{props.reqQty}</Text>
      <Text style={styles.cardBody}><Text style={{ fontWeight: "bold" }} >שם יוצר ההזמנה: </Text>{props.cNurseName}</Text>

      {props.aDepName !== '' && <Text style={styles.cardBody}><Text style={{ fontWeight: "bold" }} >שם המחלקה שאישרה: </Text>{props.aDepName}</Text>}

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
});
