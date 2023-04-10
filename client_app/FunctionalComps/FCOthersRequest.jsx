import { View, Text, TouchableOpacity, StyleSheet, Modal } from 'react-native'
import { Card } from '@rneui/base';
import React, { useContext, useEffect, useRef, useState } from 'react';
import FCDateTime from './FCDateTime';
import { useNavigation } from '@react-navigation/native';

import { GlobalContext } from '../GlobalData/GlobalData';

export default function FCOthersRequest(props) {
    const navigation = useNavigation();

    const isStockQtyLower = props.stcQty < props.reqQty;

    const { apiUrlMedRequest, getUserData } = useContext(GlobalContext);
   
    const [modalVisible, setModalVisible] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    
    const handleModalClose = () => {
        setModalVisible(false);
        navigation.navigate('בקשות');
    };

    const handleApproveRequest = async () => {//handle approve request
        const user = await getUserData();

        //-------------------------------PUT ApproveRequest------------------------------------
        fetch(apiUrlMedRequest + "ApprovedReq/" + `${props.id}` + "/aUser/" + `${user.userId}` + "/aDep/" + `${user.depId}`, {
            method: 'PUT',
            headers: new Headers({
                'Content-type': 'application/json; charset=UTF-8',
                'Accept': 'application/json; charset=UTF-8',
            })
        })
            .then(result => {
                return result.json();//the server returns an iActionResult therefore there is no need in parsing the response to Json
            })
            .then(
                (result) => {
                    if (result) {
                        setSuccessMessage("בוצעה בהצלחה");
                        setModalVisible(true);
                    }
                    else { 
                        setSuccessMessage("אין מספיק במלאי");
                        setModalVisible(true);
                    };
                },
                (error) => {
                    console.log("err put=", error);
                });
    };



    return (
        <View>
            <Card style={styles.cardContainer} borderColor="#E1EAF9">
                <View style={[styles.row, { justifyContent: 'flex-end' }]}>
                    <FCDateTime time={props.time} date={props.date} />
                </View>
                <Text style={styles.cardTitle}>{props.medName}</Text>
                <Text style={styles.cardBody}><Text>כמות מבוקשת: </Text>{props.reqQty}</Text>
                <Text style={styles.cardBody}><Text>כמות במלאי: </Text><Text style={{ color: isStockQtyLower ? 'red' : '#003D9A' }}>{props.stcQty}</Text></Text>
                <Text style={styles.cardBody}><Text>מחלקה מבקשת: </Text>{props.cdepName}</Text>
                <Text style={styles.cardBody}><Text>אחות מבקשת: </Text>{props.cNurseName}</Text>
                {props.reqStatus !== 'A' && (
                    <>
                        <View style={styles.row}>
                            <TouchableOpacity style={[styles.button, { backgroundColor: '#129C62' }]} onPress={() => handleApproveRequest()}>
                                <Text style={styles.buttonText}>אישור העברה</Text>
                            </TouchableOpacity>
                        </View>
                    </>
                )}
            </Card>
            <View style={styles.centeredView}>
                <Modal animationType="slide" transparent={true} visible={modalVisible} onRequestClose={() => { this.setState({ modalVisible: !modalVisible }); }}>
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <Text style={styles.modalText}>{successMessage}</Text>
                            <TouchableOpacity style={styles.buttonModal} onPress={handleModalClose}>
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
    cardContainer: {
        width: "60%",
        padding: 10,
        marginBottom: 10,
        borderRadius: 20,
    },
    cardTitle: {
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 10,
        color: "#003D9A",
    },
    cardBody: {
        marginVertical: 10,
        fontSize: 15,
        color: "#003D9A",
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    rowButton: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        justifyContent: 'center',
    },
    button: {
        flex: 1,
        padding: 10,
        borderRadius: 5,
        margin: 10,
        marginRight: 80,
        marginLeft: 80,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        textAlign: 'center',
    },
    buttonModal: {
        backgroundColor: '#00317D',
        padding: 10,
        borderRadius: 5,
        margin: 10,
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
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
});