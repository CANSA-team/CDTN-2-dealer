import React from 'react'
import { View, StyleSheet,Text } from 'react-native'
import Ionicons  from 'react-native-vector-icons/Ionicons';

import COLORS from './../consts/Colors';

export default function HeaderBar() {
 
    return (
        <>
        <View style={styles.logoContainer}>
            <View>
                <Text style={{fontSize:25,fontWeight:'bold',color:'black'}}>Welcome to</Text>
                <Text style={styles.textLogo}>CANSA DEALER</Text>
            </View>
            <View>
                <Ionicons name="notifications-sharp" size={28} color={COLORS.colorFontInit}/> 
            </View>
        </View>
        </>
    )
}
const styles = StyleSheet.create({
    textLogo:{
        fontSize:30,
        fontWeight:'bold',
        color:COLORS.primary
    },
    logoContainer:{
        marginTop:10,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        paddingHorizontal:20
    },
    logoIcon:{
        width: 100,
        height: 50,
    }
});
  
    