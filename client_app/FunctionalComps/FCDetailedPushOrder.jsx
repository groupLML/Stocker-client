import { Text, StyleSheet, View } from 'react-native';
import React from 'react';
//import { Card } from '@rneui/base';
import { useEffect } from 'react'

export default function FCDetailedPushOrder(props) {
    useEffect(() => {
        console.log(props.medName);
    }, [])
    
    return (
        <View>
            <Text>FCDetailedPushOrder</Text>
        </View>
    )
}

/*<Card style={styles.container} borderColor="#E1EAF9">
            <Text></Text>
            <Text style={styles.title}>{props.medName}</Text>
            <Text style={styles.body}>כמות ששוריינה: {props.poQty}</Text>
            <Text style={styles.body}>כמות שהונפקה: {props.supQty}</Text>
        </Card> */

/* const styles = StyleSheet.create({
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
}); */