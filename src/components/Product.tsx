import React from 'react'
import { View, StyleSheet, Dimensions, Image, Text, TouchableOpacity } from 'react-native';
import { SlugStr, vnd } from '../consts/Selector';
import COLORS from './../consts/Colors';
import { Rating } from 'react-native-elements';
import { ProductModel } from '../redux';
const WIDTH = Dimensions.get('window').width / 2 - 30;

export default function Product(props: any) {
    const { type, onTap } = props;
    const product: ProductModel = props.product;
    let Top;
    switch (type) {
        case 'NEW':
            Top = (
                <View style={[styles.topTitle, { backgroundColor: '#00DD00' }]}>
                    <Text style={{ color: 'white' }}>NEW</Text>
                </View>
            )
            break;
        case 'HOT':
            Top = (
                <View style={[styles.topTitle, { backgroundColor: '#EB2A3E' }]}>
                    <Text style={{ color: 'white' }}>HOT</Text>
                </View>
            )
            break;
        default:
            Top = (
                <View style={{ display: 'none' }}>
                    <Text style={{ color: 'white' }}>NEW</Text>
                </View>
            )
            break;
    }


    return (
        <TouchableOpacity onPress={() => onTap(product.product_id)} style={styles.container}>
            {Top}
            <View style={styles.imgContainer}>
                <Image style={styles.img} source={{ uri: product.product_avatar }} />
            </View>
            <Text style={styles.txtTitle}>{SlugStr(product.product_title!, 30)}</Text>
            <View style={{ alignItems: 'center', flexDirection: 'row', }}>

                <Rating ratingColor="gold" readonly imageSize={18} fractions="{1}" startingValue={product.product_rating} />
                <Text style={{ marginLeft: 18, color: '#444', fontSize: 18 }}>{product.product_rating?.toFixed(1)}</Text>

            </View>
            <View style={{ flex: 1, flexDirection: 'column', alignItems: 'flex-start', marginTop: 6 }}>
                {product && product.product_sale! != 0 && <Text style={{ textDecorationLine: 'line-through', color: 'gray', fontSize: 18 }}>{vnd(product.product_price!)}đ</Text>}
                <Text style={{ marginBottom: 10, color: '#bd3e3e', fontSize: 21 }}>{vnd(product.product_price! * (100 - product.product_sale!) / 100)}đ</Text>
            </View>
        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    container: {
        height: 255,
        backgroundColor: 'white',
        width: WIDTH,
        borderRadius: 10,
        marginBottom: 20,
        padding: 15
    },
    topTitle: {
        position: 'absolute',
        top: 0,
        right: 0,
        zIndex: 2,
        paddingLeft: 8,
        paddingRight: 8,
        paddingTop: 5,
        paddingBottom: 5,
        borderTopRightRadius: 15
    },
    imgContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    img: {
        height: 100,
        width: 150,
        borderRadius: 5
    },
    txtTitle: {
        fontWeight: 'bold',
        fontSize: 16,
        marginTop: 10,
        color: COLORS.primary
    },
    priceContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 5,
        marginBottom: 5
    },
    txtPrice: {
        fontSize: 19,
        fontWeight: 'bold'
    },
    btnAddContainer: {
        position: 'absolute',
        height: 35,
        bottom: 10,
        left: 10,
        right: 10,
        backgroundColor: COLORS.primary,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    btnAddTitle: {
        fontSize: 14,
        color: 'white',
        fontWeight: 'bold'
    }
});