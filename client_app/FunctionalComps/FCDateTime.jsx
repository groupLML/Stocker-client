import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { format } from 'date-fns';

export default function FCDateTime(props) {

    const date = props.date.split(' ')[0];//סידור פורמט התאריך
    const formattedDate = format(new Date(date), 'dd/MM/yyyy');

    return (
        <View>
            <Text style={styles.DateTime}>{props.time} {formattedDate}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    DateTime: {
        fontSize: 14,
        fontWeight: "bold",
        color: "#003D9A",
        marginRight: 10,
        alignItems: 'center',
    },
});
