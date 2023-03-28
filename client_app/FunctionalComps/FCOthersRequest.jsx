import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { Card } from '@rneui/base';
import React, { useContext } from 'react';
import FCDateTime from './FCDateTime';

import { GlobalContext } from '../GlobalData/GlobalData';

export default function FCOthersRequest(props) {

    const isStockQtyLower = props.stcQty < props.reqQty;
    const {apiUrlMedRequest} = useContext(GlobalContext);

    const handleApproveRequest = () => {//handle approve request
        const MedRequest = { //יצירת אובייקט לפי השדות במחלקה
            "reqId": props.id,
            "cUser": props.cNurseId,//************************************************************************* */
            "aUser": props.aNurseId,//************************************************************************* */
            "cDep": depId, //************************************************************************* */
            "aDep": props.aDepId,//************************************************************************* */
            "medId": selectedMedId ? selectedMedId : props.medId,
            "reqQty": Qty,
            "reqStatus": props.reqStatus,
            "reqDate": props.date
          };

        //-------------------------------PUT ApproveRequest------------------------------------
        fetch(apiUrlMedRequest + "ApprovedReq/" + `${props.id}`, {
            method: 'PUT',
            body: JSON.stringify(MedRequest),
            headers: new Headers({
                'Content-type': 'application/json; charset=UTF-8',
                'Accept': 'application/json; charset=UTF-8',
            })
        })
            .then(response => {
                return response;//the server returns an iActionResult therefore there is no need in parsing the response to Json
            })
            .then(
                (result) => {
                    if (result) {
                        alert("Success");
                        navigation.navigate('צפייה בבקשות שלי');
                    }
                    else { alert("error") };
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
                <Text style={styles.cardBody}><Text>מחלקה מבקשת: </Text>{props.depName}</Text>
                <View style={styles.row}>
                    <TouchableOpacity style={[styles.button, { backgroundColor: '#129C62' }]} onPress={() => handleApproveRequest()}>
                        <Text style={styles.buttonText}>אישור העברה</Text>
                    </TouchableOpacity>
                </View>
            </Card>
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
});