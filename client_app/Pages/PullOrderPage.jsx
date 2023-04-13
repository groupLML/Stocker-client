import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Modal } from 'react-native';
import React, { useState, useEffect, useContext } from 'react';
import { GlobalContext } from '../GlobalData/GlobalData';
import { useNavigation } from '@react-navigation/native';

import FCDetailedPullOrders from '../FunctionalComps/FCDetailedPullOrders';
import FCDateTime from '../FunctionalComps/FCDateTime';
import FCMedInput from '../FunctionalComps/FCMedInput';
import FCQuantityInput from '../FunctionalComps/FCQuantityInput';

export default function PullOrderPage(props) {

  const navigation = useNavigation();

  const { pullOrderId, PullOrdersList } = props.route.params;
  const { apiUrlPullOrder, depId, getUserData } = useContext(GlobalContext);

  const [pullOrder, setPullOrder] = useState(null);
  const [medsInOrderList, setMedsInOrderList] = useState([]);
  const [isWaitingOrder, setIsWaitingOrder] = useState(false);
  const [isModalAddVisible, setIsModalAddVisible] = useState(false);
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


  const handleSelectMed = (medId) => {
    setSelectedMedId(medId);
  };

  const GetQtyFromInput = (Qty) => {
    setQty(Qty);
  }

  //ביטול הזמנה
  const handleDeletePullOrder = () => {

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
          if (result) {
            alert(true)
            navigation.navigate('הזמנות', { requiredPage: 'pull' });
          }
        },
        (error) => {
          console.log("err delete=", error);
        });
  };


  const AddMedToOrder = async () => {

    if (selectedMedId === null) {
      alert('יש לבחור תרופה');
    }
    else if (medsInOrderList.find((med) => med.medId === selectedMedId)) {
      alert('תרופה זו כבר קיימת בהזמנה');
    }
    else {//do update
      const user = await getUserData();

      const medToAdd = {
        medId: selectedMedId,
        poQty: Qty,
        supQty: 0,
        mazNum: '',
      };

      const temp = medsInOrderList.map(item => {
        const { medName, ...rest } = item; // Remove "medName" property using object destructuring
        return { ...rest, mazNum: "" }; // Add new "mazNum" property with an empty string as its initial value
      });

      let updatedMedsList = [...temp, medToAdd];

      fetch(apiUrlPullOrder + 'UpdateNurse/pullId/' + `${pullOrderId}` + '/nUser/' + `${user.userId}`, {
        method: 'PUT',
        body: JSON.stringify(updatedMedsList),
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
            console.log(result);
            alert("התרופה התווספה בהצלחה");
          },
          (error) => {
            console.log("err get=", error);
          });
      setIsModalVisible(false);
    }
  };

  const RemoveMedFromList = async (Id2Remove) => {

    const user = await getUserData();

    const temp = medsInOrderList.filter((med) => med.medId !== Id2Remove);// Remove selected med from order meds list

    let updatedMedsList = temp.map(item => {
      const { medName, ...rest } = item; // Remove "medName" property using object destructuring
      return { ...rest, mazNum: "" }; // Add new "mazNum" property with an empty string as its initial value
    });

    fetch(apiUrlPullOrder + 'UpdateNurse/pullId/' + `${pullOrderId}` + '/nUser/' + `${user.userId}`, {
      method: 'PUT',
      body: JSON.stringify(updatedMedsList),
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
          console.log(result);
          alert("התרופה נמחקה בהצלחה");
        },
        (error) => {
          console.log("err get=", error);
        });

    setIsModalAddVisible(false);
  };

  const handleOpenModalAdd = () => {
    setIsModalAddVisible(true);
  };

  const handleCloseModalAdd = () => {
    setIsModalAddVisible(false);
  };

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
          {/* ----------------------------------------פירוט תרופות בהזמנה---------------------------------------- */}
          <Text style={styles.txt}>פירוט הזמנה:</Text>
          <ScrollView>
            <FCDetailedPullOrders isWaitingOrder={isWaitingOrder} medsInOrderList={medsInOrderList} SendId2Remove={RemoveMedFromList} />
          </ScrollView>
          {/* ---------------------------------------------כפתור מחיקת הזמנה וכפתור הוספת תרופה בסטטוס ממתין------------------------------------------- */}
          {pullOrder.orderStatus === 'W' && (
            <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
              <TouchableOpacity style={[styles.button, { backgroundColor: '#5D9C59' }]} onPress={handleOpenModalAdd}>
                <Text style={styles.buttonText}>הוספת תרופה</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.button, { backgroundColor: '#CF2933' }]} onPress={() => handleDeletePullOrder()}>
                <Text style={styles.buttonText} >ביטול הזמנה</Text>
              </TouchableOpacity>
            </View>
          )}

          <Modal visible={isModalAddVisible} animationType="slide" transparent={true} onRequestClose={handleCloseModalAdd}>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <FCMedInput sendMedSelect={handleSelectMed} />
                <FCQuantityInput reqQty={1} sendQty={GetQtyFromInput} />
                <View style={styles.row}>
                  <TouchableOpacity style={[styles.button, { backgroundColor: '#5D9C59' }]} onPress={AddMedToOrder}>
                    <Text style={styles.buttonText}>הוספה</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={[styles.button, { backgroundColor: '#CF2933' }]} onPress={handleCloseModalAdd}>
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
    textShadowColor: '#CCCCCC',
    textShadowOffset: { width: 0, height: 1 },
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