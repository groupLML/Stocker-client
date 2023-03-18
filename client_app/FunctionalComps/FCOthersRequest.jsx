import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { Card } from '@rneui/base';
import React from 'react'
import FCDateTime from './FCDateTime';

export default function FCOthersRequest(props) {

    const isStockQtyLower = props.stcQty < props.reqQty;

    const handleApproveRequest = () => {
        //handle approve request
    };

    return (
        <View>
            <Card style={styles.cardContainer} borderColor="#00317D">
                <View style={[styles.row, {justifyContent:'flex-end'}]}>
                    <FCDateTime time={props.time} date={props.date} />
                </View>
                <Text style={styles.cardTitle}>{props.medName}</Text>
                <Text style={styles.cardBody}><Text style={{ fontWeight: "bold" }} >כמות מבוקשת: </Text>{props.reqQty}</Text>
                <Text style={styles.cardBody}><Text style={{ fontWeight: "bold" }} >כמות במלאי: </Text><Text style={{ color: isStockQtyLower ? 'red' : '#003D9A' }}>{props.stcQty}</Text></Text>
                <Text style={styles.cardBody}><Text style={{ fontWeight: "bold" }} >מחלקה מבקשת: </Text>{props.depName}</Text>
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