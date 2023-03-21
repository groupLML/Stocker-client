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
            }
            else {
                alert('תרופה זו כבר קיימת בהזמנה')
            }
        }
        else {
            alert('יש לבחור תרופה להוספה')
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>יצירת הזמנה:</Text>
            <Card>
                <FCMedInput sendMedSelect={handleSelectMed} />
                <FCQuantityInput reqQty={1} sendQty={GetQtyFromInput} />
                <TouchableOpacity style={styles.AddBTN} onPress={() => AddMed2Order()}>
                    <Icon name='add' color='white' />
                </TouchableOpacity>
            </Card>
            {medsOrderList.length > 0 && (
                <View>
                    <View>
                        <Text style={styles.subTitle}>פירוט הזמנה:</Text>
                        <ScrollView>
                            <FCMedsInOrder medsOrderList={medsOrderList} SendId2Delete={DeleteMedFromOrder} />
                        </ScrollView>
                    </View>
                    <View>
                        <TouchableOpacity style={styles.button}>
                            <Text style={styles.buttonText}>שליחה</Text>
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
        marginBottom: 15,
        color: '#003D9A',
        marginTop: 30,
    },
    subTitle: {
        fontSize: 18,
        textAlign: 'center',
        marginBottom: 15,
        color: '#003D9A',
        marginTop: 20,
    },
    AddBTN: {
        borderRadius: 100,
        backgroundColor: '#003D9A',
        bottom: 0,
        marginBottom: 10,
        marginTop: 10,
        alignSelf: 'center'
    },
    button: {
        marginTop: 10,
        backgroundColor: '#00317D',
        padding: 10,
        borderRadius: 5,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        textAlign: 'center',
    },
});
