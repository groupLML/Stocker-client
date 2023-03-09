import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import moment from 'moment';

import { GlobalContext } from '../GlobalData/GlobalData';
import FCDepTypeList from '../FunctionalComps/FCDepTypeList';
import FCMedInput from '../FunctionalComps/FCMedInput';
import FCQuantityInput from '../FunctionalComps/FCQuantityInput';

export default function AddRequestPage(props) {

  const { getUserData, DepTypes } = useContext(GlobalContext);

  const [selectedMedId, setSelectedMedId] = useState(null);
  const [Qty, setQty] = useState(1);

  const handleSelectMed = (medId) => {
    setSelectedMedId(medId);
  };

  const GetQtyFromInput = (Qty) => {
    setQty(Qty);
  }

  const handleAddRequest = () => {
  
    const SelectedDepTypes = DepTypes.filter(depType => depType.isChecked).map(depType => depType.name);

    const user = getUserData();

    const request = { //create a request object 
      cUser: user.userId,
      cDep: user.depId,
      medId: selectedMedId,
      reqQty: Qty,
      reqDate: moment().format('YYYY-MM-DD HH:mm:ss'),
      DepTypes: SelectedDepTypes,
    };

    //---------------------------------------Post request----------------------------------------
    fetch(apiUrlMedRequest, {
      method: 'POST',
      body: JSON.stringify(request),
      headers: new Headers({
        'Content-type': 'application/json; charset=UTF-8',
        'Accept': 'application/json; charset=UTF-8',
      })
    })
      .then(res => {
        return res.json()
      })
      .then(
        (result) => {
          console.log(result);//result is the added request id
        },
        (error) => {
          console.log("err post=", error);
        });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>בקשה ממחלקה</Text>
      <View>
        <View style={styles.row}>
          <FCMedInput sendMedSelect={handleSelectMed} />
        </View>
        <FCQuantityInput reqQty={1} sendQty={GetQtyFromInput} />
        <FCDepTypeList />
        <TouchableOpacity style={styles.button} onPress={() => handleAddRequest()}>
          <Text style={styles.buttonText}>אישור</Text>
        </TouchableOpacity>
      </View>
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
    fontSize: 24,
    color: '#003D9A',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  fields: {
    fontSize: 17,
    color: "#003D9A",
    width: 100,
    marginRight: 10,
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#003D9A',
    borderRadius: 10,
    paddingVertical: 10,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 18,
  },
});
