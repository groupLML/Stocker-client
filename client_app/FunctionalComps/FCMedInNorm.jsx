import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { Card } from 'react-native-elements';

export default function FCMedInNorm(props) {
    return (
        <View>
            <Card borderColor='#E1EAF9'>
                <Text style={styles.cardTitle}>{props.medName}</Text>
                <Text style={styles.cardBody}>כמות התקן: {props.normQty}</Text>
            </Card>
        </View>
    )
}

const styles = StyleSheet.create({
    cardTitle: {
        fontSize: 18,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 10,
        color: "#003D9A",
    },
    cardBody: {
        fontSize: 15,
        color: "#003D9A",
    },
    CloseBTN: {
        alignSelf: 'flex-start',
    },
});