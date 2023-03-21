import React, { useState, useContext, useEffect } from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import { GlobalContext } from '../GlobalData/GlobalData';
import FCDepTypeList from '../FunctionalComps/FCDepTypeList';
import FCMedInput from '../FunctionalComps/FCMedInput';
import FCQuantityInput from '../FunctionalComps/FCQuantityInput';

export default function AddRequestPage(props) {

  const { apiUrlMedRequest, getUserData, DepTypes } = useContext(GlobalContext);

  const [selectedMedId, setSelectedMedId] = useState(null);
  const [Qty, setQty] = useState(1);
  const [modalVisible, setModalVisible] = useState(false);
  const [clearInputs, setClearInputs] = useState(false);

/*   useEffect(() => {
    handleSelectMed(null);
    GetQtyFromInput(1);
  }, [clearInputs]);
 */
  const handleSelectMed = (medId) => {
    setSelectedMedId(medId);
  };

  const GetQtyFromInput = (Qty) => {
    setQty(Qty);
  }

  const clearForm = () => {
    handleSelectMed(null);
    GetQtyFromInput(1);
  };

  useEffect(() => {
    console.log(selectedMedId);
    console.log(Qty);
  }, [selectedMedId, Qty]);

  const handleModalClose = () => {
    setModalVisible(false);
    props.navigation.navigate('צפייה בבקשות שלי');
  };

  const handleAddRequest = async () => {
    const SelectedDepTypes = DepTypes.filter(depType => depType.isChecked).map(depType => depType.name);
    const user = await getUserData();

    const request = {
      cUser: user.userId,
      cDep: user.depId,
      medId: selectedMedId,
      reqQty: Qty,
      depTypes: SelectedDepTypes,
    };

    //-------------------------------Post request----------------------------------
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
          if (result) {
            setModalVisible(true);
            //setClearInputs(!clearInputs)
          }
          else {
            alert("קיימת בקשה ממתינה עבור תרופה זו")
          }
        },
        (error) => {
          console.log("err post=", error);
        });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>בקשה ממחלקה</Text>
      <FCMedInput sendMedSelect={handleSelectMed} clearForm={clearForm} />
      <FCQuantityInput reqQty={1} sendQty={GetQtyFromInput} clearForm={clearForm} />
      <FCDepTypeList />
      <TouchableOpacity style={styles.button} onPress={() => handleAddRequest()}>
        <Text style={styles.buttonText}>אישור</Text>
      </TouchableOpacity>
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
                onPress={handleModalClose}>
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
    fontSize: 25,
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#003D9A',
    marginTop: 60,
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
