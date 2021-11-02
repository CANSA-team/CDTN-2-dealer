import React,{useRef} from 'react'
import { View, StyleSheet, Dimensions, Image, Text, TouchableOpacity, Animated } from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { SlugStrTitle } from '../consts/Selector';
const WIDTH = Dimensions.get('window').width;

export default function Product() {
    const swipeableRef = useRef<any>(null);
    const closeSwipeable = () => {
        swipeableRef.current.close();
    }
    
    const boxRenderRight = ()=>{
        return (
            <>
                <TouchableOpacity style={{width:75,height:110,backgroundColor:'#f53a4c',justifyContent:'center',alignItems:'center'}}>
                    <AntDesign name="delete" style={{fontSize:22,color:'#fff'}}/>
                </TouchableOpacity>
                <TouchableOpacity onPress={closeSwipeable} style={{width:80,height:110,backgroundColor:'#007bff',justifyContent:'center',alignItems:'center'}}>
                    <Animated.Text style={{color:'#fff',fontSize:18}}>Sửa</Animated.Text>
                </TouchableOpacity> 
            </>
        )
    }
    const boxRenderLeft = ()=>{
        return (
            <>
                <TouchableOpacity onPress={closeSwipeable} style={{width:75,height:110,backgroundColor:'#ffc106',justifyContent:'center',alignItems:'center'}}>
                    <Text style={{color:'#fff',fontSize:18,textAlign:'center'}}>Thông tin</Text>   
                </TouchableOpacity>
            </>
        )
    }

    return (
        <Swipeable ref={swipeableRef} friction={2} overshootLeft={false} overshootRight={false} renderLeftActions={boxRenderLeft} renderRightActions={boxRenderRight}>    
            <View style={styles.container}>     
                <View style={{justifyContent:'center',alignItems:'center'}}>
                    <Image style={{height:100,width:100}} source={{uri:'https://product.hstatic.net/1000300544/product/iphone-13-pink-select-2021_d3ad549275cd49f4aef49722410002e5.png'}}></Image>
                </View>
                <View style={{flex:1,justifyContent:'flex-start'}}>
                    <Text style={{fontSize:16 }}>{SlugStrTitle('iPhone 13 128GB Chính Hãng (VN/A) s asas asas',115)} </Text>
                </View>
            </View>
        </Swipeable>
    )
}
const styles = StyleSheet.create({
    container: {
        height: 110,
        backgroundColor: 'white',
        width: WIDTH,
        padding: 10,
        flexDirection:'row',
        marginBottom:5,
        alignItems:'center'
    }, 
});