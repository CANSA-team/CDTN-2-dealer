import React from 'react'
import { View, StyleSheet, TouchableOpacity, TouchableHighlight, Text } from 'react-native'
import HeaderTitle from '../../components/HeaderTitle'
import  MaterialIcons from 'react-native-vector-icons/MaterialIcons';


const rightButtons = [
    <TouchableHighlight><Text>Button 1</Text></TouchableHighlight>,
    <TouchableHighlight><Text>Button 2</Text></TouchableHighlight>
  ];
  
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