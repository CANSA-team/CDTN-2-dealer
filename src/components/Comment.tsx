import React from 'react'
import { Image, Text, View, StyleSheet } from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import COLORS from '../consts/Colors';
export default function Comment(props:any) {
    const maxRating = [1,2,3,4,5];
    const {starNumber,user,comment_content} = props;

    return (
        <View style={styles.container}>
            
            <View style={styles.commentContainer}>
                <View style={{flexDirection:'row',alignItems:'center'}}>
                    <Image style={styles.imgUser} source={{uri: user.user_avatar}} />
                    <Text style={styles.nameUser}>{user.user_name}</Text>
                </View>
            </View>
            <View style={{display:'flex',flexDirection:'row'}}>    
                {
                    maxRating.map((item,index)=>
                        <View key={index}>
                            <FontAwesome name={ item<=starNumber ? "star" : "star-o"} size={24} color="#f1c40f"/>      
                        </View>
                    )
                }
            </View>
            <Text style={{fontSize:17}}>{comment_content}</Text>
        </View>
    )
}
const styles = StyleSheet.create({
    container:{
        padding:10,
        backgroundColor:'#f0e8e8',
        marginTop:20,
        marginBottom:5,
        borderRadius:10
    },
    commentContainer: {
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        marginTop:10,
        marginBottom:5
    },
    imgUser:{
        height:50,
        width:50,
        borderRadius:50,
        borderWidth:2,
        borderColor:COLORS.primary,
        resizeMode:'cover'
    },
    nameUser:{
        marginLeft:10,
        fontSize:20,
        fontWeight:'bold'
    }
});