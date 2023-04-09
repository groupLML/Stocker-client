import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Modal } from 'react-native';
import React, { useState, useEffect, useContext } from 'react';
import { GlobalContext } from '../GlobalData/GlobalData';
import { Icon } from '@rneui/themed';
import { useNavigation } from '@react-navigation/native';

import FCDetailedPullOrders from '../FunctionalComps/FCDetailedPullOrders';
import FCDateTime from '../FunctionalComps/FCDateTime';
import FCMedInput from '../FunctionalComps/FCMedInput';
import FCQuantityInput from '../FunctionalComps/FCQuantityInput';

export default function PullOrderPage(props) {

  const navigation = useNavigation();

  const { pullOrderId, PullOrdersList } = props.route.params;
  const [pullOrder, setPullOrder] = useState(null);
  const [medsInOrderList, setMedsInOrderList] = useState([]);
  const { apiUrlPullOrder, depId } = useContext(GlobalContext);
  const [isWaitingOrder, setIsWaitingOrder] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedMedId, setSelectedMedId] = useState(null);
  const [Qty, setQty] = useState(1);

  //----------------------GET Meds in pull Order---------------------
  useEffect(() => {
    fetch(apiUrlPullOrder + 'GetOrderDetails/depId/' + `${depId}` + '/orderId/' + `${pullOrderId}` + '/type/' + `${2}`, {
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
          setMedsInOrderList(result);
          const order = PullOrdersList.find((order) => order.orderId === pullOrderId);
          setPullOrder(order);
        },
        (error) => {
          console.log("err get=", error);
        });
  }, []);

  useEffect(() => {
    if (pullOrder !== null) {
      if (pullOrder.orderStatus === "W") {
        setIsWaitingOrder(true);
      }
      else {
        setIsWaitingOrder(false);
      }
    }
  }, [pullOrder]);

  const handleDeletePullOrder = () => {

    console.log("handle Delete Pull Order is pressed!");

    fetch(apiUrlPullOrder + 'OrderId/' + `${pullOrderId}` + '/type/' + `${2}`, {
      method: 'DELETE',
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
          console.log("res=", result);
          navigation.navigate('הזמנות');
        },
        (error) => {
          console.log("err delete=", error);
        });
  };

  const handleOpenModal = () => {
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  const AddMedToOrder = () => {
    //do update
    if (selectedMedId === null) {
      alert('יש לבחור תרופה');
    }
    else {
      alert("med added");
      setIsModalVisible(false);
    }
  };

  const handleSelectMed = (medId) => {
    setSelectedMedId(medId);
  };

  const GetQtyFromInput = (Qty) => {
    setQty(Qty);
  }

  return (
    <View style={styles.container}>
      {pullOrder !== null && (
        <>
          {/* --------------------------------------------------שורת סטטוס ותאריך-------------------------------------------------- */}
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <FCDateTime date={pullOrder.orderDate}></FCDateTime>
            {pullOrder.orderStatus === 'I' && (
              <Text style={{ color: '#5D9C59' }}>הונפק</Text>
            )}
            {pullOrder.orderStatus === 'W' && (
              <Text style={{ color: '#DF2E38' }}>בהמתנה</Text>
            )}
            {pullOrder.orderStatus === 'T' && (
              <Text style={{ color: '#FFC300' }}>מועבר</Text>
            )}
          </View>
          {/* ----------------------------------------------------------שורת כותרת--------------------------------------------------- */}
          <Text style={styles.title}>הזמנה מספר <Text>{pullOrderId}</Text></Text>
          {/* -----------------------------------------------שורת יוצר הזמנה ורוקח מנפיק-------------------------------------------- */}
          <View>
            <Text style={styles.txt}>יוצר ההזמנה: <Text style={styles.txt}>{pullOrder.nurseName}</Text></Text>
            {(pullOrder.orderStatus === 'I' || pullOrder.orderStatus === 'T') && (
              <Text style={styles.txt}>רוקח אחראי: <Text style={styles.txt}>{pullOrder.pharmacistName}</Text></Text>
            )}
          </View>
          {/* ----------------------------------------פירוט תרופות בהזמנה וכפתור הוספת תרופה---------------------------------------- */}
          <Text style={styles.txt}>פירוט הזמנה:</Text>
          <ScrollView>
            <FCDetailedPullOrders isWaitingOrder={isWaitingOrder} medsInOrderList={medsInOrderList} />
          </ScrollView>
          <View style={styles.AddBTN}>
            <TouchableOpacity onPress={handleOpenModal}>
              <Icon name='add' color='white' />
            </TouchableOpacity>
          </View>

          {/* ---------------------------------------------כפתור מחיקת הזמנה בסטטוס ממתין------------------------------------------- */}
          {pullOrder.orderStatus === 'W' && (
            <View style={{ flexDirection: 'row', width: 150, alignSelf: 'center' }}>
              <TouchableOpacity style={[styles.button, { backgroundColor: '#CF2933' }]} onPress={() => handleDeletePullOrder()}>
                <Text style={styles.buttonText} >ביטול הזמנה</Text>
              </TouchableOpacity>
            </View>
          )}

          <Modal visible={isModalVisible} animationType="slide" transparent={true} onRequestClose={handleCloseModal}>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <FCMedInput sendMedSelect={handleSelectMed} />
                <FCQuantityInput reqQty={1} sendQty={GetQtyFromInput} />
                <View style={styles.row}>
                  <TouchableOpacity style={[styles.button, { backgroundColor: '#5D9C59' }]} onPress={AddMedToOrder}>
                    <Text style={styles.buttonText}>הוספה</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={[styles.button, { backgroundColor: '#CF2933' }]} onPress={handleCloseModal}>
                    <Text style={styles.buttonText}>ביטול</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
        </>
      )}

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  txt: {
    color: '#003D9A',
    marginTop: 5,
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 10,
    color: '#003D9A',
    marginTop: 20,
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
    marginBottom: 10,
  },
  AddBTN: {
    alignSelf: 'center',
    marginTop: 10,
    backgroundColor: '#003D9A',
    borderRadius: 100,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
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
});