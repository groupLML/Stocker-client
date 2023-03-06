import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';
import { Icon } from '@rneui/themed';
//import { Card } from '@rneui/base';

import FCQuantityInput from './FCQuantityInput';
import FCMedInput from '../FunctionalComps/FCMedInput';
import FCDateTime from './FCDateTime';
import { GlobalContext } from '../GlobalData/GlobalData';

export default function FCDetailedRequest(props) {

  const handleUpdateRequest = () => {

    const { meds,medReqs, setMedReqs, apiUrlMedRequest } = useContext(GlobalContext);

    let MedId = meds.filter((item) => item.medId === X);//לפי מה שהאחות תגיד
    let Req = medReqs.filter((item) => item.reqId === props.requestsList.id);//צריך להיות שווה לבקשה שנכנסנו אליה

    e.preventDefault();

    const MedRequest = { //יצירת אובייקט לפי השדות במחלקה
      cUser: Req.cUser,
      aUser: Req.aUser,
      cDep: Req.cDep,
      aDep: Req.aDep,
      medId: MedId,//לטפל בזה
      reqQty:/* FCQuantityInput כדי לתת את הכמות יש להעביר כפרופס את הכמות מקופפננטה */1,
      reqStatus: Req.reqStatus,
      reqDate: Req.reqDate,
    };

    //-------------------------------PUT medReqs------------------------------------
    fetch(apiUrlMedRequest + `${Req.reqId}`, {
      method: 'PUT',
      body: JSON.stringify(MedRequest), //bodyשליחת אובייקט ב 
      headers: new Headers({
        'Content-type': 'application/json; charset=UTF-8',//חשוב - JSON לשלוח
        'Accept': 'application/json; charset=UTF-8',
      })
    })
      .then(response => {
        return response.json()
      })
      .then(
        (result) => {//body
          if (result) {
            alert("Success, The Ingredient added");
          }
          else { alert("error, The Ingredient already exists") };
        },
        (error) => {
          console.log("err post=", error);
        });
  };

  const handleApproveRequest = () => { };
  const handleCancelRequest = () => { };
  const handleDeleteRequest = (item) => { };

  return (
    <View style={styles.Container}>
      {/* ----------------------------------שורת סטטוס ותאריך-------------------------- */}
      <View style={{...styles.row,marginBottom:40}}>
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
          <Text style={styles.Body}><Text style={{ fontWeight: "bold"}} >שם יוצר ההזמנה: </Text>{props.nurseName}</Text>
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
          <View style={styles.Body}><FCMedInput genName={props.genName}/></View>
          <View style={styles.Body}><FCQuantityInput reqQty={props.reqQty} /></View>
          <Text style={{...styles.Body,fontSize:17}}><Text style={{ fontWeight: "bold",fontSize:17}} >שם יוצר ההזמנה: </Text>{props.nurseName}</Text>
          <View style={{  flexDirection: 'row', alignItems: 'center'}}>
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
    flex:1,
    backgroundColor: '#00317D',
    padding: 10,
    borderRadius: 5,
    margin: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    textAlign:'center',
  },
});
