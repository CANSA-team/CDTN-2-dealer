import React,{useState} from 'react';
import { View, StyleSheet, TouchableOpacity, Text, TextInput, KeyboardAvoidingView, Platform, ScrollView } from 'react-native'
import HeaderTitle from '../../components/HeaderTitle';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import * as ImagePicker from 'expo-image-picker';
import { Avatar } from 'react-native-elements';
import SelectCat from '../../components/SelectCat';

export default function AddProduct(props: any) {
    const { navigation } = props;
    const [avatar, setAvatar] = useState('http://103.207.38.200:3002/api/image/photo/7251633320683170/e4611a028c71342a5b083d2cbf59c494');
    const [images,setImages] = useState<any>([])
    const [selectCat,setSelectCat] = useState<any>([SelectCat]); 
    const [catId,setcatId] = useState<number[][]>([[0,0]]);

    const addSelectCat = () =>{
        let data:any = [...catId,[0,0]]
        setcatId(data)
        let data2 = [...selectCat,SelectCat];
        setSelectCat(data2);
    } 

    const delSelectCat = (index:number) =>{
        let data = [...selectCat];
        data.splice(index,1);
        setSelectCat(data);
    }
     
    const getValueSelect = (value:number[],index:number)=>{
       
        if (catId.length>index) {
            let data:any = [...catId];
            data[index] = value
            setcatId(data)
            console.log(data)
        }
       
        // if (!data.includes(value[0])) {
        //     data = [...data,...value]
        // }
        // else if(!data.includes(value[1])){
        //     data = [...data,value[1]]
        // }
        
    }

    let getImg = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [3, 3],
            quality: 1,
        });

        if (!result.cancelled) {
            setAvatar(result.uri);
        }
    };

    const getGallerys = async ()=>{
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [3, 3],
            quality: 1,
        });
        if (!result.cancelled) {
            let img = <Avatar
                size="xlarge"
                title="CR"               
                activeOpacity={0.7}
                source={{uri: result.uri}}          
            />
            let data = [...images,img]
            setImages(data);
        }
    }
   
    return (
        <View style={styles.container}>
            <HeaderTitle title="Thêm sản phẩm" />
            <View style={styles.header}>
                <TouchableOpacity>
                    <MaterialIcons name="arrow-back" size={35} color="white" onPress={() => navigation.goBack()} />
                </TouchableOpacity>
            </View>
            
            <KeyboardAvoidingView style={{flex:1}}  behavior={Platform.OS === "ios" ? "padding" : "height"} keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}>
                <ScrollView showsVerticalScrollIndicator={false} style={{ marginBottom: 20}}>
                    <View style={styles.viewTotal}>
                        <Text style={styles.txtTitle}>Tên :</Text>
                        <View style={styles.textAreaContainer} >
                            <TextInput
                                style={styles.textArea}
                                underlineColorAndroid="transparent"
                                placeholder="Tên sản phẩm . . ."
                                placeholderTextColor="#888"
                                numberOfLines={10}
                                maxLength={255}
                                multiline={true}
                                onChangeText={(text) => {
                                    console.log(text)
                                }}
                            />
                        </View>
                    </View>

                    <View style={styles.viewTotal}>
                        <Text style={styles.txtTitle}>Giá :</Text>
                        <View style={styles.viewPrice} >
                            <TextInput
                                style={styles.textPrice}
                                placeholder="Nhập giá tiền"
                                keyboardType="numeric"
                            />
                        </View>
                    </View>

                    <View style={styles.viewTotal}>
                        <Text style={styles.txtTitle}>Hình ảnh chính :</Text>
                        <View style={styles.textAreaContainer} >
                            <Avatar
                            size="xlarge"
                            title="CR"
                            onPress={getImg}
                            activeOpacity={0.7}
                            source={{uri:avatar}}    
                            containerStyle={{flex: 5, marginRight: 60}}   
                            />
                        </View>
                    </View>

                    <View style={styles.viewTotal}>
                        <TouchableOpacity onPress={getGallerys} style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                            <Text style={styles.txtTitle}>Thêm hình ảnh phụ </Text>
                            <MaterialIcons name="add-chart" style={{fontSize:20,fontWeight:'bold'}}/>
                        </TouchableOpacity>
                        {
                            images.map((item:any,index:number)=>item)
                        }
                    </View>

                    <View style={styles.viewTotal}>
                        <Text style={styles.txtTitle}>Danh mục :</Text>
                        <View style={styles.viewPicker}>
                            {
                                selectCat.map((Select:any,index:number)=> <Select selected={[0,0]} getValueSelect={getValueSelect} key={index} onDel={delSelectCat} index={index}/>)
                            }
                        </View>
                        <TouchableOpacity onPress={addSelectCat} style={{marginTop:20,flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                            <Text style={styles.txtTitle}>Thêm danh mục </Text>
                            <MaterialIcons name="add-chart" style={{fontSize:20,fontWeight:'bold'}}/>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.viewTotal}>
                        <Text style={styles.txtTitle}>Mô tả :</Text>
                        <View style={styles.textAreaContainer} >
                            <TextInput
                                style={styles.textAreaDesc}
                                underlineColorAndroid="transparent"
                                placeholder="Mô tả sản phẩm . . ."
                                placeholderTextColor="#888"
                                numberOfLines={10}
                                maxLength={255}
                                multiline={true}
                                onChangeText={(text) => {
                                    console.log(text)
                                }}
                            />
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </View>
)
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 5,
        position: 'absolute',
        top: 34,
        left: 5,
        right: 0,
        zIndex: 2
    },
    viewPrice:{
        borderBottomWidth:1,
        borderBottomColor:'gray'
    },
    viewPicker: {
        backgroundColor: '#fff',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: 'gray'
    },
    viewTotal: {
        marginHorizontal: 15,
        margin: 10,
    },
    textPrice:{
        fontSize:18,
        marginBottom:5
    },
    txtTitle: {
        fontSize: 18,
        color: '#666464',
        marginBottom: 5,
        fontWeight:'bold'
    },
    textAreaContainer: {
        borderColor: 'gray',
        borderWidth: 1,
        padding: 5,
        borderRadius: 6,
        backgroundColor:'#fff',
    },
    textArea: {
        height: 60,
        justifyContent: "flex-start",
        alignItems: 'flex-start',
        lineHeight: 30,
        textAlignVertical: "top",
        padding: 8,
        fontSize: 18,
    },
    textAreaDesc:{
        height: 90,
        justifyContent: "flex-start",
        alignItems: 'flex-start',
        lineHeight: 30,
        textAlignVertical: "top",
        paddingHorizontal:8,
        paddingVertical:12,
        fontSize: 18,
    }
});
