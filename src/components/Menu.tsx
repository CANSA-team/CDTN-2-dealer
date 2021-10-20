import React from 'react'
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import MaterialIcons  from 'react-native-vector-icons/MaterialIcons';
import COLORS from '../consts/Colors';
import AntDesign from 'react-native-vector-icons/AntDesign';


export default function Menu(props:any) {
    const {title, description, onTab, icon} : {title:string,description:string, onTab:any, icon:string} = props
    return (
        <TouchableOpacity onPress={onTab} style={styles.container}>
            <View style={{flex:10}}>
                <View style={{flexDirection:'row',alignItems:'center'}}>
                    <AntDesign name={icon} size={24}/>
                    <Text style={styles.txtTitle}>{title}</Text>
                </View>
                <Text style={styles.txtDesc}>{description}</Text>
            </View>
            <View style={{justifyContent:'center',flex:1,alignItems:'center'}}>
                <MaterialIcons name="arrow-forward-ios" size={30} color={COLORS.primary} /> 
            </View>
        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    container:{
       marginVertical:15,
       borderRadius:10,
       padding:20,
       backgroundColor:'#f5f5f5',
       flexDirection:'row',
       justifyContent:'space-between',
    },
    txtTitle:{
        marginLeft:8,
        fontSize:22,
        fontWeight:'bold',
        color:'#222'
    },
    txtDesc:{
        fontSize:19,
        color:'#555',
        marginTop:5
    }
});