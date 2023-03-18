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

    useEffect(() => {
        console.log(medsOrderList);
    }, [medsOrderList]);

    const handleSelectMed = (medId) => {
        setSelectedMedId(medId);
    };

    const GetQtyFromInput = (Qty) => {
        setQty(Qty);
    }

    const AddOrder = () => {
        if (selectedMedId != null) {
            const medInOrder = {
                medId: selectedMedId,
                Qty: Qty,
            }
            setMedsOrderList([...medsOrderList, medInOrder]);
        }
        else{
            alert('יש לבחור תרופה להוספה')
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>יצירת הזמנה:</Text>
            <Card>
                <FCMedInput sendMedSelect={handleSelectMed} />
                <FCQuantityInput reqQty={1} sendQty={GetQtyFromInput} />
                <TouchableOpacity style={styles.AddBTN} onPress={() => AddOrder()}>
                    <Icon name='add' color='white' />
                </TouchableOpacity>
            </Card>
            {medsOrderList.length > 0 && (
                <View>
                    <View>
                        <Text style={styles.subTitle}>פירוט הזמנה:</Text>
                        <ScrollView>
                            <FCMedsInOrder medsOrderList={medsOrderList} />
                        </ScrollView>
                    </View>
                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.buttonText}>שליחה</Text>
                    </TouchableOpacity>
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
        /* position: 'absolute', */
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
