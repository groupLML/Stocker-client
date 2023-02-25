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

    /* let selected = products.filter((product) => product.isChecked); */

    const renderDepTypeList = (DepTypeList) => {
        return (
            <FlatList
                data={DepTypeList}
                renderItem={({ item }) => (
                    <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'space-between', margin: 5 }}>
                        <Checkbox color={item.isChecked ? '#003D9A' : undefined} value={item.isChecked} onValueChange={() => handleChange(item.name)} />
                        <Text>{item.name}</Text>
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

});