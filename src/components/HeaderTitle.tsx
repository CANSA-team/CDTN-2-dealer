import React from 'react'
import { StyleSheet, Text, View } from 'react-native';
import COLORS from '../consts/Colors';

export default function HeaderTitle(props:any) {
    const {title} = props;
    return (
        <View style={styles.container}>             
            <Text style={styles.txtTitleTop}>{title}</Text>                    
        </View>
    )
}
const styles = StyleSheet.create({
    container:{
        paddingTop:40,
        paddingBottom:10,
        backgroundColor:COLORS.primary
    },
    txtTitleTop:{
        textAlign:'center',
        fontSize:25,
        fontWeight:'bold',
        color:'white',
        letterSpacing:2
    },

});