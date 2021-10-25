import React from 'react'
import { View, StyleSheet, Dimensions, Image, Text, TouchableOpacity, Animated } from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import AntDesign from 'react-native-vector-icons/AntDesign';
const WIDTH = Dimensions.get('window').width;
const boxRenderLeft = ()=>{
    return (
        <>
            <TouchableOpacity style={{width:70,height:100,backgroundColor:'#f53a4c',justifyContent:'center',alignItems:'center'}}>
                <AntDesign name="delete" style={{fontSize:22,color:'#fff'}}/>
            </TouchableOpacity>
            <TouchableOpacity style={{width:75,height:100,backgroundColor:'#007bff',justifyContent:'center',alignItems:'center'}}>
                <Animated.Text style={{color:'#fff',fontSize:18}}>Edit</Animated.Text>
            </TouchableOpacity> 
        </>
    )

}
export default function Product() {
    return (
        <Swipeable friction={2} overshootRight={false} renderRightActions={boxRenderLeft}>    
            <View style={styles.container}>     
                <View style={{justifyContent:'center',alignItems:'center'}}>
                    <Image style={{height:90,width:90}} source={{uri:'https://product.hstatic.net/1000300544/product/iphone-13-pink-select-2021_d3ad549275cd49f4aef49722410002e5.png'}}></Image>
                </View>
                <View>
                    <Text>iPhone 13 128GB Chính Hãng (VN/A)</Text>
                </View>
            </View>
        </Swipeable>
    )
}
const styles = StyleSheet.create({
    container: {
        height: 100,
        backgroundColor: 'white',
        width: WIDTH,
        padding: 15,
        flexDirection:'row',
        alignItems:'center',
        marginBottom:5
    },
   
});