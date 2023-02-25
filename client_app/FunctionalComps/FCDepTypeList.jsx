import { View, Text, StyleSheet, FlatList } from 'react-native';
import Checkbox from 'expo-checkbox';

import React, { useState } from 'react';


export default function FCDepTypeList() {
    const data = [
        { name: 'אורתופדיה', isChecked: false },
        { name: 'כירורגיה', isChecked: false },
        { name: 'פנימית', isChecked: false },
    ];

    const [DepTypes, setDepTypes] = useState(data);

    const handleChange = (name) => {
        let temp = DepTypes.map((DepType) => {
            if (name === DepType.name) {
                return { ...DepType, isChecked: !DepType.isChecked };
            }
            return DepType;
        });
        setDepTypes(temp);
    };

    /*let selected = DepTypes.filter((DepType) => DepType.isChecked); */

    const renderDepTypeList = (DepTypeList) => {
        return (
            <FlatList
                data={DepTypeList}
                renderItem={({ item }) => (
                    <View style={styles.row}>
                        <Checkbox style={styles.CB} color={item.isChecked ? '#003D9A' : undefined} value={item.isChecked} onValueChange={() => handleChange(item.name)} />
                        <Text style={styles.CB_txt}>{item.name}</Text>
                    </View>
                )}
            />
        );
    }

    return (
        <View>
            {renderDepTypeList(DepTypes)}
        </View>
    )
}

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        margin: 5,
    },
    CB: {
        marginRight: 10,
      },
      CB_txt: {
        fontSize: 16,
      },
});