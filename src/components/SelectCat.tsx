import React from 'react'
import { Text, TouchableOpacity, View, StyleSheet } from 'react-native'
import RNPickerSelect  from 'react-native-picker-select';

export default function SelectCat(props:any) {
    const dummyData = [
        { label: 'Football', value: [1,2] },
        { label: 'Baseball', value: [1,3] },
        { label: 'Hockey', value: [6,3]},
        { label: 'Football2', value: [6,4] },
        { label: 'Football3', value: [7,1] },
    ]

    const { index, onDel, getValueSelect, selected } = props;
    return (
        <View>
            <RNPickerSelect
                value={selected}
                placeholder={{ label: "Danh mục . . .", value: [0,0] }}
                style={{ ...pickerSelectStyles, placeholder: { color: '#acabab' } }}
                onValueChange={(data: any) =>
                    getValueSelect(data,index)
                }
                items={dummyData}
            />
            {
                index !== 0 &&
                <TouchableOpacity onPress={onDel} style={{paddingVertical:8,backgroundColor:'#E5E5E5',justifyContent:'center',alignItems:'center',marginTop:10}}>
                    <Text style={{color:'red',fontSize:16}}>Xoá</Text>
                </TouchableOpacity>
            }   
        </View>
    )
}

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
