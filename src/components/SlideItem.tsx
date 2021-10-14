import React from 'react'
import { Dimensions, Image, Text, View, StyleSheet } from 'react-native'

const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;

export default function SlideItem(props:any) {
    const {item} = props;
    return (
        <View style={styles.cardView} >
            <Image style={styles.image} source={{uri:item}} />
        </View>
    )
}
const styles = StyleSheet.create({
    cardView:{
        flex: 1,
        width: WIDTH,
        height: HEIGHT / 3.8,
        backgroundColor:'transparent',
        shadowColor:'#000',
        shadowOffset: {width:0.5,height:0.5},
        shadowOpacity:0.5,
        elevation:5
    },
    textView:{
        position: 'absolute',
        bottom: 60,
        left: 0,
        display: 'flex',
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center'
    },
    image:{
        width: WIDTH,
        height: HEIGHT / 2.8,
    },
    itemTitle:{
        color: 'white',
        fontSize:18,
        shadowColor:'#000',
        shadowOffset: {width:0.8,height:0.8},
        shadowOpacity:1,
        marginBottom:5,
        fontWeight:'bold',
        elevation:5,
        textAlign:'center',
        backgroundColor:'#015f19',
        padding: 10,
        width: 260,
        borderTopRightRadius:50,
        alignSelf:'center',
        borderBottomRightRadius:50
    },
});
  