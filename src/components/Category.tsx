import React from 'react'
import { Text, TouchableOpacity,StyleSheet, Image } from 'react-native';
import COLORS from '../consts/Colors';
import { CategoryModel } from '../redux';

export default function Category(props:any) {
    
    const { index,catergoryIndex,onTap } = props;
    const item:CategoryModel = props.item;
    return (
        <TouchableOpacity
            style={[{flexDirection:'column',justifyContent:'center',alignItems:'center',marginBottom:10}, catergoryIndex === index && styles.catSelected,]}
            activeOpacity={0.8}
            onPress={onTap}>
            <Image style={{height:50,width:50,borderRadius:15}} source={{uri:item.category_image}} />
            <Text
            style={[
                styles.categoryText,
                catergoryIndex === index && styles.categoryTextSelected,
            ]}
            >
            {item.category_name}
            </Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    categoryText:{
        fontSize: 16,
        color: '#574a4a',
        fontWeight: 'bold',
        textAlign:'center'
    },
    categoryTextSelected: {
        color: COLORS.primary,
        paddingBottom: 5,
    },
    catSelected:{
        borderBottomWidth: 2,
        borderColor: COLORS.primary,
    }
});