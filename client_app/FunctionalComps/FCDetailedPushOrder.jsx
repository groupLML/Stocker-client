import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React, { useState, useContext } from 'react';

import FCDateTime from './FCDateTime';
import FCMedsInOrder from './FCMedsInOrder';
import { Card } from '@rneui/base';

export default function FCDetailedPushOrder(props) {



    return (
        <Card style={styles.container} borderColor="#E1EAF9">
            <Text style={styles.title}>{props.medName}</Text>
            <Text style={styles.body}>כמות ששוריינה: {props.poQty}</Text>
            <Text style={styles.body}>כמות שהונפקה: {props.supQty}</Text>
        </Card>
    )
}

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
        flexDirection: 'row',
    },
    body: {
        marginVertical: 10,
        color: "#003D9A",
    },
    row: {
        flexDirection: 'row',
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