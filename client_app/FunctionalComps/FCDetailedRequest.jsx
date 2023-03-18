import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React, { useState, useContext, useEffect } from 'react';
import { Icon } from '@rneui/themed';
//import { Card } from '@rneui/base';

import { GlobalContext } from '../GlobalData/GlobalData';

import FCQuantityInput from './FCQuantityInput';
import FCMedInput from './FCMedInput';
import FCDateTime from './FCDateTime';
import FCDepTypeList from './FCDepTypeList';

export default function FCDetailedRequest(props) {

  const { depId, apiUrlMedRequest, DepTypes} = useContext(GlobalContext);

  const [Qty, setQty] = useState(props.reqQty);
  const [selectedMedId, setSelectedMedId] = useState(null);

  const GetQtyFromInput = (Qty) => {
    setQty(Qty);
  }

  const handleSelectMed = (medId) => {
    setSelectedMedId(medId);
  };

  const handleUpdateRequest = () => {

    const SelectedDepTypes = DepTypes.filter(depType => depType.isChecked).map(depType => depType.name);

    const MedRequest = { //יצירת אובייקט לפי השדות במחלקה
      "reqId": props.id,
      "cUser": props.cNurseId,
      "aUser": props.aNurseId,
      "cDep": depId,
      "aDep": props.aDepId,
      "medId": selectedMedId ? selectedMedId : props.medId,
      "reqQty": Qty,
      "reqStatus": props.reqStatus,
      "reqDate": props.date
    };

    const dataToSend = {
      medRequest: MedRequest,
      depTypes: SelectedDepTypes
    };
    
    //-------------------------------PUT medReqs------------------------------------
    fetch(apiUrlMedRequest + "WaittingReq/" + `${props.id}`, {
      method: 'PUT',
      body: JSON.stringify(dataToSend), 
      headers: new Headers({
        'Content-type': 'application/json; charset=UTF-8',
        'Accept': 'application/json; charset=UTF-8',
      })
    })
      .then(response => {
        return response.json()
      })
      .then(
        (result) => {
          if (result) {
            alert("Success");
            props.handleUpdateRequest(true);
          }
          else { alert("error") };

        },
        (error) => {
          console.log("err put=", error);
        });
  };

  const handleCancelRequest = () => { };

  const handleApproveRequest = () => { };

  const handleDeleteRequest = (item) => { };

  return (
    <View style={styles.Container}>
      {/* ----------------------------------שורת סטטוס ותאריך-------------------------- */}
      <View style={{ ...styles.row, marginBottom: 40 }}>
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
        <View >
          <FCDateTime time={props.time} date={props.date} />
        </View>
      </View>
      {/* --------------------------------------תוכן וכפתורים------------------------------ */}
      {props.reqStatus === 'A' && (
        <>
          <Text style={styles.Title}>{props.genName}</Text>
          <Text style={styles.Body}><Text style={{ fontWeight: "bold" }} >כמות: </Text>{props.reqQty}</Text>
          <Text style={styles.Body}><Text style={{ fontWeight: "bold" }} >שם יוצר ההזמנה: </Text>{props.cNurseName}</Text>
          <Text style={styles.Body}><Text style={{ fontWeight: "bold" }} >שם המחלקה שאישרה: </Text>{props.aDepName}</Text>
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
          <Text style={{ ...styles.Body, fontSize: 17 }}><Text style={{ fontWeight: "bold", fontSize: 17 }} >שם יוצר ההזמנה: </Text>{props.cNurseName}</Text>
          <View style={styles.Body}><FCMedInput medName={props.medName} sendMedSelect={handleSelectMed} /></View>
          <View style={styles.Body}><FCQuantityInput reqQty={props.reqQty} sendQty={GetQtyFromInput} /></View>
          <View style={styles.Body}><FCDepTypeList /></View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <TouchableOpacity style={[styles.button, { backgroundColor: '#129C62' }]} onPress={() => handleUpdateRequest()}>
              <Text style={styles.buttonText}>עדכון</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, { backgroundColor: '#E51C1C' }]} onPress={() => handleDeleteRequest()}>
              <Text style={styles.buttonText} >מחיקת העברה</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  Container: {
    padding: 10,
    marginBottom: 10,
  },
  Title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  Body: {
    marginVertical: 10,
    color: "#003D9A",
    flexDirection: 'row',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
  },
  rowButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    justifyContent: 'center',
  },
  button: {
    flex: 1,
    backgroundColor: '#00317D',
    padding: 10,
    borderRadius: 5,
    margin: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
});
