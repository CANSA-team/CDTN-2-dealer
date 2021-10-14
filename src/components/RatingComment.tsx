import React,{useState} from 'react'
import { View, TouchableOpacity,StyleSheet,Text,TextInput } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default function RatingComment(props:any) {
    const [defautRating,setDefautRating] = useState(5);
    const [comment,setComment] = useState('');
    const maxRating=[1,2,3,4,5];

    return (
        <View >
            <View style={{flexDirection:'row',justifyContent:'space-between',marginBottom:5,marginTop:5}}>      
                <View style={{display:'flex',flexDirection:'row'}}>
                    {
                        maxRating.map((item,index)=>
                            <TouchableOpacity 
                            activeOpacity={0.1}
                            key={item}
                            onPress={()=>setDefautRating(item)}
                            >  
                                <FontAwesome name={item<=defautRating ? "star" : "star-o"} size={28} color="#f1c40f"/>
                                
                            </TouchableOpacity>
                        )
                       
                    }
                </View>
                
                <TouchableOpacity style={{justifyContent:'flex-end',marginRight:5}} onPress={()=>{
                    props.onTap(comment,defautRating)
                    setDefautRating(5);
                    setComment("");
                }}>
                    <Text style={styles.btnSend}>Send</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.textAreaContainer} >
                    <TextInput
                    style={styles.textArea}
                    underlineColorAndroid="transparent"
                    placeholder="Comment của bạn tại đây . . ."
                    placeholderTextColor="grey"
                    numberOfLines={10}
                    maxLength={255}
                    value={comment}
                    multiline={true}
                    onChangeText = {(text) =>{
                        setComment(text);
                    }}
                    />
            </View>       
        </View>
    )
}
const styles = StyleSheet.create({
    textAreaContainer: {
      borderColor: 'gray',
      borderWidth: 1,
      padding: 5,
      borderRadius:20
    },
    textArea: {
      height: 90,
      justifyContent: "flex-start",
      alignItems:'flex-start',
      lineHeight:30,
      textAlignVertical: "top",
      padding: 10,
      fontSize:16
    },
    btnSend:{
        textAlign:'center',
        padding:9,
        borderRadius:15,
        backgroundColor:'#eeeb3e',
        width:100,
        fontSize:14
    }
})
