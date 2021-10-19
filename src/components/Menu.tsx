import React from 'react'
import { Text, View, StyleSheet } from 'react-native'
import MaterialIcons  from 'react-native-vector-icons/MaterialIcons';
import COLORS from '../consts/Colors';


export default function Menu() {
    return (
        <View style={styles.container}>
            <View style={{flex:10}}>
                <Text style={{fontSize:22,fontWeight:'bold',color:'#222'}}>Sản phẩm của bạn</Text>
                <Text style={{fontSize:18,color:'#444',marginTop:5}}>Quản lí sản phẩm của bạn tại đây</Text>
            </View>
            <View style={{justifyContent:'center',flex:1,alignItems:'center'}}>
                <MaterialIcons name="arrow-forward-ios" size={30} color={COLORS.primary} /> 
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container:{
    marginVertical:15,
       borderRadius:10,
       paddingHorizontal: 10,
       paddingVertical:20,
       backgroundColor:'#E5E5E5',
       flexDirection:'row',
       justifyContent:'space-between'
    },
});