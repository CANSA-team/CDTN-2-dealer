import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import HeaderTitle from '../../components/HeaderTitle';
import  MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Product from '../../components/Product';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '../../utils/useNavigation';
 
export default function ManagerProduct(props:any) {
    const { navigation} = props;
    const { navigate } = useNavigation();

    return (
        <View>
            <HeaderTitle title="Quản lí sản phẩm"/>
            <View style={styles.header}>
                <TouchableOpacity>
                    <MaterialIcons name="arrow-back" size={35} color="white" onPress={() => navigation.goBack()} />
                </TouchableOpacity>
                <TouchableOpacity>
                    <Ionicons name="ios-add" onPress={() => navigate('AddProduct')} size={35} color="white" />
                </TouchableOpacity>
            </View>
            <View style={{marginTop:5}}>
                <Product />
                <Product />
                <Product />
            </View>
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
        top: 34,
        left: 5,
        right: 0,
        zIndex: 2
    },
});