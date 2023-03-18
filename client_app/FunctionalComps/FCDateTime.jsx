import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { format } from 'date-fns';

export default function FCDateTime(props) {

    const date = props.date.split(' ')[0];//סידור פורמט התאריך
    const formattedDate = format(new Date(date), 'dd/MM/yyyy');
    const time = props.date.substring(11, 16);//שליפת השעה

    return (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={styles.DateTime}>{time}</Text>
            <Text style={styles.DateTime}> {formattedDate}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    DateTime: {
        fontSize: 14,
        color: "#003D9A",
        marginRight: 10,
        alignItems: 'center',
    },
});
