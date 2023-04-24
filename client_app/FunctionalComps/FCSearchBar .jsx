import { View } from 'react-native'
import React, { useState } from 'react'
import { SearchBar } from 'react-native-elements';

export default function FCSearchBar(props) {
    const [search, setSearch] = useState('');

    const updateSearch = (search) => {
        setSearch(search);
        props.handleSearch(search);
    };

    return (
        <View>
            <SearchBar
                placeholder="חיפוש"
                onChangeText={updateSearch}
                value={search}
                inputContainerStyle={{ backgroundColor: '#FFFFFF', borderRadius: 10, borderWidth: 1.5, borderColor: '#E1EAF9', borderBottomWidth: 1.5, height: 40 }}
                containerStyle={{ backgroundColor: '#ffffff', borderTopColor: 'transparent', borderBottomColor: 'transparent' }}
                //searchIcon={{ color: '#E1EAF9' }}
                //inputStyle={{ color: '#E1EAF9' }}
                //placeholderTextColor="#E1EAF9"
            />
        </View>
    );
}