import React from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import HeaderTitle from '../../components/HeaderTitle'
import  MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Product from '../../components/Product';
 
export default function ManagerProduct(props:any) {
    const { navigation} = props;

    return (
        <View>
            <HeaderTitle title="Quản lí sản phẩm"/>
            <View style={styles.header}>
                <TouchableOpacity>
                    <MaterialIcons name="arrow-back" size={35} color="white" onPress={() => navigation.goBack()} />
                </TouchableOpacity>
            </View>
            <Product />
            <Product />
            <Product />
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 5,
        position: 'absolute',
        top: 33,
        left: 5,
        right: 0,
        zIndex: 2
    },
});