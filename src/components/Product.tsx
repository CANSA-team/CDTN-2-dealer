import React,{useRef} from 'react'
import { View, StyleSheet, Dimensions, Image, Text, TouchableOpacity } from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { SlugStrTitle } from '../consts/Selector';
import { ProductModel } from '../redux';
const WIDTH = Dimensions.get('window').width;

interface ProductProps{
    productInfo:ProductModel;
    onDetail:Function,
    onTapEidt:Function,
    onDelete:Function
}
export default function Product(props:ProductProps) {
    const { productInfo, onDetail, onTapEidt, onDelete }:ProductProps = props;
    const swipeableRef = useRef<any>(null);

    const closeSwipeable = () => {
        swipeableRef.current.close();
    }
    
    const swDetail = () =>{
        closeSwipeable();
        onDetail()
    }

    const swEdit = () =>{
        closeSwipeable();
        onTapEidt()
    }
    
    const boxRenderRight = ()=>{
        return (
            <>
                <TouchableOpacity onPress={()=>onDelete()} style={{width:75,height:110,backgroundColor:'#f53a4c',justifyContent:'center',alignItems:'center'}}>
                    <AntDesign name="delete" style={{fontSize:22,color:'#fff'}}/>
                </TouchableOpacity>
                <TouchableOpacity onPress={swEdit} style={{width:80,height:110,backgroundColor:'#007bff',justifyContent:'center',alignItems:'center'}}>
                    <Text style={{color:'#fff',fontSize:18}}>Sửa</Text>
                </TouchableOpacity> 
            </>
        )
    }


    const boxRenderLeft = ()=>{
        return (
            <>
                <TouchableOpacity onPress={swDetail} style={{width:80,height:110,backgroundColor:'#ffc106',justifyContent:'center',alignItems:'center',padding:5}}>
                    <Text style={{color:'#fff',fontSize:18,textAlign:'center'}}>Thông tin</Text>   
                </TouchableOpacity>
            </>
        )
    }

    return (
        <Swipeable ref={swipeableRef} friction={2} overshootLeft={false} overshootRight={false} renderLeftActions={boxRenderLeft} renderRightActions={boxRenderRight}>    
            <View style={styles.container}>     
                <View style={{height:110,justifyContent:'center',alignItems:'center'}}>
                    <Image style={{height:110,width:110,resizeMode:'center'}} source={{ uri:productInfo.product_avatar}}></Image>
                </View>
                <View style={{flex:1,justifyContent:'flex-start',marginLeft:5}}>
                    <Text style={{fontSize:16 }}>{SlugStrTitle(productInfo.product_title,115)} </Text>
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
        paddingVertical:10,
        paddingRight: 10,
        paddingLeft:1,
        flexDirection:'row',
        marginBottom:8,
        alignItems:'center'
    }, 
});