import React, { useState, useContext } from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import { GlobalContext } from '../GlobalData/GlobalData';
import FCDepTypeList from '../FunctionalComps/FCDepTypeList';
import FCMedInput from '../FunctionalComps/FCMedInput';
import FCQuantityInput from '../FunctionalComps/FCQuantityInput';

//import { color } from '@rneui/base';

export default function AddRequestPage(props) {

  const { getUserData, DepTypes, apiUrlMedRequest } = useContext(GlobalContext);

  //const [SelectedDepTypes, setSelectedDepTypes] = useState([]);
  const [selectedMedId, setSelectedMedId] = useState(null);
  const [Qty, setQty] = useState(1);
  const [modalVisible, setModalVisible] = useState(false);

  const handleSelectMed = (medId) => {
    setSelectedMedId(medId);
  };

  const clearForm = () => {
    setSelectedMedId(null);
    setQty(1);
    //setSelectedDepTypes([]);
  };

  const GetQtyFromInput = (Qty) => {
    setQty(Qty);
  }

  const handleAddRequest = async () => {

    const SelectedDepTypes = DepTypes.filter(depType => depType.isChecked).map(depType => depType.name);

    //const depTypeNames = DepTypes.filter(depType => depType.isChecked).map(depType => depType.name);
    //setSelectedDepTypes(depTypeNames);//get the selected deptypes and put in SelectedDepTypes array
    //console.log(depTypeNames);

    const user = await getUserData();

    const request = {
      cUser: user.userId,
      cDep: user.depId,
      medId: selectedMedId,
      reqQty: Qty,
      depTypes: SelectedDepTypes,
    };

    console.log('Request:', request);

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
        return res.json();
      })
      .then(
        (result) => {
          console.log(result);//returns true
          setModalVisible(true);
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
      <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            this.setState({ modalVisible: !modalVisible });
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>בקשה התווספה בהצלחה</Text>
              <TouchableOpacity
                style={styles.button}
                onPress={() => setModalVisible(false)}>
                <Text style={styles.buttonText}>סגור</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
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
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2, },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});
