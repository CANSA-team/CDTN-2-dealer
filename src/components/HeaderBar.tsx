import React from 'react'
import { View, StyleSheet,Text } from 'react-native'
import Ionicons  from 'react-native-vector-icons/Ionicons';
import COLORS from './../consts/Colors';
import SearchBarTop from './SearchBarTop';

export default function HeaderBar(props:any) {
    const {onSearch} = props
    return (
        <>
        <View style={styles.logoContainer}>
            <View>
                <Text style={styles.textLogo}>CANSA</Text>
            </View>
            <View>
                <Ionicons name="notifications-sharp" size={28} color={COLORS.colorFontInit}/> 
            </View>
        </View>
         <SearchBarTop onSearch={onSearch}/>
        </>
    )
}

const styles = StyleSheet.create({
    textLogo:{
        fontSize:36,
        fontWeight:'bold',
        color:COLORS.primary
    },
    logoContainer:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        paddingLeft: 10,
        paddingRight:10
    },
    logoIcon:{
        width: 100,
        height: 50,
    }
});
  
    