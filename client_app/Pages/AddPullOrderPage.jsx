import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Icon } from 'react-native-elements';
import { Card } from 'react-native-elements';

import FCMedsInOrder from '../FunctionalComps/FCMedsInOrder';
import FCMedInput from '../FunctionalComps/FCMedInput';
import FCQuantityInput from '../FunctionalComps/FCQuantityInput';


export default function AddPullOrderPage() {

    const [selectedMedId, setSelectedMedId] = useState(null);
    const [Qty, setQty] = useState(1);
    const [medsOrderList, setMedsOrderList] = useState([]);
    const [clearForm, setClearForm] = useState(false);

    const handleSetClearForm = (state) => {
        setClearForm(state);
    };

    const handleSelectMed = (medId) => {
        setSelectedMedId(medId);
    };

    const GetQtyFromInput = (Qty) => {
        setQty(Qty);
    }

    const DeleteMedFromOrder = (medId2Delete) => {
        setMedsOrderList(medsOrderList.filter((med) => med.medId !== medId2Delete));
    }

    const AddMed2Order = () => {
        if (selectedMedId != null) {
            let existingMed = medsOrderList.find(med => med.medId === selectedMedId);
            if (!existingMed) {// If the selected medication wasn't added to order already, add med to order list     
                const medInOrder = {
                    medId: selectedMedId,
                    Qty: Qty,
                }
                setMedsOrderList([...medsOrderList, medInOrder]);
                setSelectedMedId(null);
            }
            else {
                alert('תרופה זו כבר קיימת בהזמנה')
            }
            setClearForm(true);
        }
        else {
            alert('יש לבחור תרופה להוספה')
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>יצירת הזמנה:</Text>
            <Card >
                <FCMedInput sendMedSelect={handleSelectMed} clearForm={clearForm} handleSetClearForm={handleSetClearForm} />
                <FCQuantityInput reqQty={1} sendQty={GetQtyFromInput} clearForm={clearForm} handleSetClearForm={handleSetClearForm} />
                <TouchableOpacity style={styles.AddBTN} onPress={() => AddMed2Order()}>
                    <Icon name='add' color='white' />
                </TouchableOpacity>
            </Card>
            {medsOrderList.length > 0 && (
                <View>
                    <View>
                        <Text style={styles.subTitle}>פירוט הזמנה:</Text>
                        <ScrollView style={styles.ScrollView}>
                            <FCMedsInOrder medsOrderList={medsOrderList} SendId2Delete={DeleteMedFromOrder} />
                        </ScrollView>
                    </View>
                    <View>
                        <TouchableOpacity style={styles.sendBTN}>
                            <Text style={styles.BTNtext}>שליחה</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )}
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 25,
        textAlign: 'center',
        fontWeight: 'bold',
        marginBottom: 5,
        color: '#003D9A',
        marginTop: 30,
    },
    ScrollView: {
        height: 350, 
    },
    subTitle: {
        fontSize: 18,
        textAlign: 'center',
        color: '#003D9A',
        fontWeight: 'bold',
        marginTop: 30,
    },
    AddBTN: {
        borderRadius: 100,
        backgroundColor: '#003D9A',
        height:30,
        width:30,
        bottom: 0,
        marginBottom: 5,
        marginTop: 5,
        alignSelf: 'center',
        justifyContent:'center',
    },
    sendBTN: {
        marginTop: 20,
        backgroundColor: '#00317D',
        padding: 10,
        borderRadius: 5,
        width:'30%',
        alignSelf:'center',
    },
    BTNtext: {
        color: '#fff',
        fontSize: 16,
        textAlign: 'center',
    },
});
