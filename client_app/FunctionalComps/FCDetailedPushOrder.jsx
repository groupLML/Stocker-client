import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React, { useState, useContext } from 'react';
import { useNavigation } from '@react-navigation/native';

import FCDateTime from './FCDateTime';
import FCQuantityInput from './FCQuantityInput';
import FCMedInput from './FCMedInput';

export default function FCDetailedPushOrder(props) {

    const navigation = useNavigation();

    const [modalVisible, setModalVisible] = useState(false);
    const [clearForm, setClearForm] = useState(false);

    const GetQtyFromInput = (Qty) => {
        setQty(Qty);
    }

    const handleSelectMed = (medId) => {
        setSelectedMedId(medId);
    };

    const handleModalClose = () => {
        setModalVisible(false);
        setClearForm(true);
        navigation.navigate('צפייה בבקשות');
    };

    const handleSetClearForm = (state) => {
        setClearForm(state);
    };

    return (
        <View style={styles.container}>
            {/* ----------------------------------שורת סטטוס ותאריך-------------------------- */}
            <View style={{ ...styles.row, marginBottom: 40 }}>
                <View ><FCDateTime date={props.date} /></View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    {props.orderStatus === 'I' && (
                        <>
                            <Text style={{ color: '#5D9C59' }}>הונפק</Text>
                        </>
                    )}
                    {props.orderStatus === 'W' && (
                        <>
                            <Text style={{ color: '#DF2E38' }}>בהמתנה</Text>
                        </>
                    )}
                    {props.orderStatus === 'T' && (
                        <>
                            <Text style={{ color: '#FFC300' }}>מועבר</Text>
                        </>
                    )}
                </View>
            </View>

            {/* --------------------------------------תוכן וכפתורים------------------------------ */}
            {props.orderStatus === 'I' && (
                <>
                    <Text style={styles.body}>שם יוצר ההזמנה: {props.nurseName}</Text>
                    <Text style={styles.body}>רוקח אחראי: {props.pharmacistName}</Text>
                </>
            )}
            {props.orderStatus === 'W' && (
                <>
                    <Text style={{ ...styles.body, fontSize: 17 }}><Text style={{ fontSize: 17 }} >שם יוצר ההזמנה: </Text>{props.nurseName}</Text>
                    <View style={styles.body}><FCMedInput medName={props.medName} sendMedSelect={handleSelectMed} clearForm={clearForm} handleSetClearForm={handleSetClearForm} /></View>
                    <View style={styles.body}><FCQuantityInput reqQty={props.reqQty} sendQty={GetQtyFromInput} /></View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <TouchableOpacity style={[styles.button, { backgroundColor: '#5D9C59' }]} onPress={() => handleUpdateRequest()}>
                            <Text style={styles.buttonText}>עדכון</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.button, { backgroundColor: '#CF2933' }]} onPress={() => handleDeleteRequest(props.id)}>
                            <Text style={styles.buttonText} >מחיקת הזמנה</Text>
                        </TouchableOpacity>
                    </View>
                </>
            )}
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
                            <Text style={styles.modalText}>בקשה השתנה בהצלחה</Text>
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
    )
};

const styles = StyleSheet.create({
    container: {
        padding: 10,
        marginBottom: 10,
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 10,
        color: "#003D9A",
    },
    body: {
        marginVertical: 10,
        color: "#003D9A",
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 30,
    },
    button: {
        flex: 1,
        padding: 10,
        borderRadius: 5,
        margin: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        textAlign: 'center',
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