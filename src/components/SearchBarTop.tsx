import React, { useState } from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { SearchBar } from 'react-native-elements';
import AntDesign from 'react-native-vector-icons/AntDesign';
import COLORS from './../consts/Colors';

export default function SearchBarTop(props: any) {
    const { onSearch } = props;
    const [data, setData] = useState("");
    const updateSearch = (search: string): void => {
        setData(search);
    };

    return (
        <View style={styles.container}>
            <View style={styles.searchContainer}>
                <TouchableOpacity style={styles.searchIcon} onPress={() => {
                    onSearch(data)
                    setData("");
                }}>
                    <AntDesign name="search1" color="white" size={20} />
                </TouchableOpacity>
                <SearchBar
                    placeholder="Bạn đang tìm kiếm gì ?"
                    onChangeText={(search: string) => updateSearch(search)}
                    value={data}
                    color="gray"
                    lightTheme={true}
                    inputContainerStyle={styles.searchInput}
                    leftIconContainerStyle={{ display: 'none' }}
                    containerStyle={styles.searchBar}
                    maxLength={255}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: 10,
        paddingRight: 10,
        marginTop: 10,
    },
    searchContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 10,
        paddingLeft: 5
    },
    searchBar: {
        flex: 1,
        height: 47,
        borderRadius: 10,
        marginTop: 1,
        marginBottom: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "space-between",
        backgroundColor: 'white',
        borderTopColor: 'white',
        borderBottomColor: 'white'
    },
    searchInput: {
        flex: 1,
        fontWeight: '500',
        backgroundColor: 'white',

    },
    searchIcon: {
        backgroundColor: COLORS.primary,
        width: 40,
        height: 40,
        borderRadius: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }
});