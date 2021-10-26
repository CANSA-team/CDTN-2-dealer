import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text, TextInput } from 'react-native'
import HeaderTitle from '../../components/HeaderTitle';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import RNPickerSelect from 'react-native-picker-select';

export default function AddProduct(props:any) {
    const { navigation} = props;
    return (
        <View style={styles.container}>
            <HeaderTitle title="Thêm sản phẩm"/>
            <View style={styles.header}>
                <TouchableOpacity>
                    <MaterialIcons name="arrow-back" size={35} color="white" onPress={() => navigation.goBack()} />
                </TouchableOpacity>
            </View>

            <View style={styles.viewTotal}>
                <Text style={styles.txtTitle}>Tên sản phẩm :</Text>
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
                    <Text style={styles.txtTitle}>Danh mục :</Text>
                    <View style={styles.viewPicker}>
                        <RNPickerSelect
                            placeholder={{ label: "Danh mục . . .", value: { code: 0, name: " " } }}
                            style={{ ...pickerSelectStyles, placeholder: { color: '#acabab' } }}
                            onValueChange={(data:any) =>
                                console.log(data)
                            }
                            items={[
                                { label: 'Football', value: 'football' },
                                { label: 'Baseball', value: 'baseball' },
                                { label: 'Hockey', value: 'hockey' },
                            ]}     
                        />
                    </View>
            </View>

            <View style={styles.viewTotal}>
                <Text style={styles.txtTitle}>Mô tả sản phẩm :</Text>
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
const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 18,
        borderRadius: 30,
        color: 'black',
        padding: 20
    },
    inputAndroid: {
        fontSize: 18, 
        borderRadius: 50,
        color: '#222',
        padding: 20,
    },
});
