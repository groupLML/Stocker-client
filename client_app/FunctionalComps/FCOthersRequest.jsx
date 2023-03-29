import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { Card } from '@rneui/base';
import React, { useContext } from 'react';
import FCDateTime from './FCDateTime';

import { GlobalContext } from '../GlobalData/GlobalData';

export default function FCOthersRequest(props) {

    const isStockQtyLower = props.stcQty < props.reqQty;
    const { apiUrlMedRequest, getUserData } = useContext(GlobalContext);

    const handleApproveRequest = async () => {//handle approve request
        const user = await getUserData();
        //'/api/MedRequest/ApprovedReq/4/aUser/3/aDep/3'

        ///api/MedRequest/ApprovedReq/4/aUser/3/aDep/3
        //-------------------------------PUT ApproveRequest------------------------------------
        fetch(apiUrlMedRequest + "ApprovedReq/" + `${props.id}` + "/aUser/" + `${user.userId}` + "/aDep/" + `${user.depId}`, {
            method: 'PUT',
            body: JSON.stringify(),
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
                        alert("Success");
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
});