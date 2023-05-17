import { Text, View, StyleSheet, ScrollView, TouchableOpacity, Animated, Modal } from 'react-native';
import React, { useContext, useRef, useEffect, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';

import { GlobalContext } from '../GlobalData/GlobalData';
import FCDateTime from '../FunctionalComps/FCDateTime';
import FCMedsInNorm from '../FunctionalComps/FCMedsInNorm';
import FCSearchBar from '../FunctionalComps/FCSearchBar ';
import FCMedInput from '../FunctionalComps/FCMedInput';
import FCQuantityInput from '../FunctionalComps/FCQuantityInput';

export default function NormRequestsPage(props) {

  const { depId, apiUrlGetNorm, meds } = useContext(GlobalContext);
  const [medsInNorm, setMedsInNorm] = useState([]);
  const [medsInNormReq, setMedsInNormReq] = useState([]);//מערך שאותו נשנה לבקשה לשינוי התקן
  const [isChanged, setIsChanged] = useState(false);
  const [UpdateTime, setUpdateTime] = useState('');
  const [clearSearch, setClearSearch] = useState(false);
  const [medsNormSearch, setMedsNormSearch] = useState([]);

  const [isModalAddVisible, setIsModalAddVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [textMessage, setTextMessage] = useState('');
  const [isMovePage, setIsMovePage] = useState(false);
  const [clearForm, setClearForm] = useState(false);

  const [selectedMedId, setSelectedMedId] = useState(null);
  const [Qty, setQty] = useState(1);

  //----------------------GET Norm---------------------
  useEffect(() => {
    fetch(apiUrlGetNorm + 'depId/' + `${depId}`, {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json; charset=UTF-8',
        'Accept': 'application/json; charset=UTF-8',
      })
    })
      .then(result => {
        return result.json();
      })
      .then(
        (result) => {
          setMedsInNorm(result[0].medList);
          setMedsNormSearch(result[0].medList);
          setMedsInNormReq(result[0].medList);
          /*result.map((norm, key) => {
            updateTimes = norm.lastUpdate;}); */
          setUpdateTime(result[0].lastUpdate);
        },
        (error) => {
          console.log("err get=", error);
        });
    return () => {
      setIsChanged(false);
    }
  }, [isChanged]);

  useFocusEffect(
    React.useCallback(() => {
      setIsChanged(true);
      setClearSearch(true);
    }, []));

  const handleSearch = (search) => {
    if (medsInNorm.length !== 0) {
      const filtered = medsInNorm.filter(item =>
        item.medName.toLowerCase().includes(search.toLowerCase())
      );
      setMedsNormSearch(filtered);
    }
  };

  //הוספת תרופה לבקשה לשינוי תקן
  const AddMedToNormReq = () => {
    if (selectedMedId === null) {
      setIsMovePage(false);
      setTextMessage('יש לבחור תרופה');
      setModalVisible(true);
    }
    else if (medsInNormReq.find((med) => med.medId === selectedMedId)) {
      setIsMovePage(false);
      setTextMessage('תרופה זו כבר קיימת בהזמנה');
      setModalVisible(true);
      setClearForm(true);
    }
    else {//do update

      const med = meds.find((med) => med.medId === selectedMedId)

      const medToAdd = {
        medId: selectedMedId,
        normQty: Qty,
        mazNum: med.mazNum,
        medName: med.medName,
      };

      setMedsNormSearch(medsInNorm => [...medsInNorm, medToAdd]);//כדי לרנדר למסך
      setMedsInNormReq(medsInNorm => [...medsInNorm, medToAdd]);
      setIsModalAddVisible(false);
    }
  };

  const handleModalClose = () => {
    setModalVisible(false);
    if (isMovePage) {
      navigation.navigate('הזמנות', { requiredPage: 'pull' });
    }
  };

  //מחיקה תרופה לבקשה לשינוי תקן
  const RemoveMedFromList = (Id2Remove) => {

    const MedRemoveForRender = medsNormSearch.filter((med) => med.medId !== Id2Remove);
    setMedsNormSearch(MedRemoveForRender);

    const med = meds.find((med) => med.medId === Id2Remove)
    const index = medsInNormReq.findIndex(item => item.medId === Id2Remove);

    const medToChange = {
      medId: Id2Remove,
      normQty: 0,
      mazNum: med.mazNum,
      medName: med.medName,
    };

    medsInNormReq[index] = medToChange;
    setMedsInNormReq(medsInNormReq);
    console.log(medsInNormReq);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>תקן מחלקתי</Text>
      <View style={styles.row}>
        <View style={{ flex: 7 }}><FCSearchBar handleSearch={handleSearch} clearSearch={clearSearch} handleSetClearSearch={(state) => setClearSearch(state)} /></View>
      </View>
      <View style={styles.scrollViewContainer}>
        <ScrollView scrollEventThrottle={16}>
          <FCMedsInNorm ListMeds={medsNormSearch} isRequest={true} SendId2Remove={RemoveMedFromList} />
        </ScrollView>
      </View>
      <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
        <TouchableOpacity style={[styles.button, { backgroundColor: '#5D9C59' }]} onPress={() => setIsModalAddVisible(true)}>
          <Text style={styles.buttonText}>הוספת תרופה לתקן</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, { backgroundColor: '#003D9A' }]} onPress={() => handleDeletePullOrder()}>
          <Text style={styles.buttonText} >שליחת הבקשה</Text>
        </TouchableOpacity>
      </View>
      {/* <FCDateTime date={UpdateTime} /> */}

      {/*  ----------MODAL Add Med-------- */}
      <Modal visible={isModalAddVisible} animationType="slide" transparent={true} onRequestClose={() => setIsModalAddVisible(false)}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <FCMedInput sendMedSelect={(medId) => setSelectedMedId(medId)} clearForm={clearForm} handleSetClearForm={(state) => setClearForm(state)} />
            <FCQuantityInput reqQty={1} sendQty={(Qty) => setQty(Qty)} clearForm={clearForm} handleSetClearForm={(state) => setClearForm(state)} />
            <View style={styles.row}>
              <TouchableOpacity style={[styles.button, { backgroundColor: '#5D9C59' }]} onPress={AddMedToNormReq}>
                <Text style={styles.buttonText}>הוספה</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.button, { backgroundColor: '#CF2933' }]} onPress={() => setIsModalAddVisible(false)}>
                <Text style={styles.buttonText}>ביטול</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/*  ----------MODAL Note-------- */}
      <View style={styles.centeredView}>
        <Modal animationType="slide" transparent={true} visible={modalVisible} onRequestClose={() => { this.setState({ modalVisible: !modalVisible }); }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>{textMessage}</Text>
              <TouchableOpacity style={styles.modalButton} onPress={handleModalClose}>
                <Text style={styles.buttonText}>סגור</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: 'center',
    marginBottom: 10,
    color: '#003D9A',
    marginTop: 20,
    textShadowColor: '#CCCCCC',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 5,
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
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 5,
  },
  searchContainer: {
    paddingHorizontal: 5,
  },
  scrollViewContainer: {
    flex: 1,
    position: 'relative',
  },
  centeredView: {
    //flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    //marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  modalButton: {
    backgroundColor: '#00317D',
    padding: 10,
    borderRadius: 5,
    margin: 10,
  },
});
