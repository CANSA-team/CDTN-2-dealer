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
        paddingTop:35,
        paddingBottom:15,
        backgroundColor:COLORS.primary

    },
    txtTitleTop:{
        textAlign:'center',
        fontSize:30,
        fontWeight:'bold',
        color:'white',
        letterSpacing:5
    },

});