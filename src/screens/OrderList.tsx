import moment from 'moment';
import React, { useEffect } from 'react'
import { View, StyleSheet, ScrollView, Text, Image, TouchableOpacity } from 'react-native'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useDispatch, useSelector } from 'react-redux';
import HeaderTitle from '../components/HeaderTitle'
import { SlugStrTitle } from '../consts/Selector'
import { getShopOder, ShopModel, ShopOrder, ShopState, State } from '../redux';

export default function OrderList(props: any) {
    const { navigation } = props;
    const shopSate: ShopState = useSelector((state: State) => state.shopReducer);
    const { order }: { order: ShopOrder[] } = shopSate;
    const { info }: { info: ShopModel } = shopSate;
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getShopOder(info.shop_id))
    }, [])

    const __status = [
        <View style={{ marginRight: 20 }}>
            <Text>Đã hủy</Text>
        </View>,
        <View style={{ marginRight: 20 }}>
            <Text>Đã đặt</Text>
        </View>,
        <View style={{ marginRight: 20 }}>
            <Text>Đang sử lý</Text>
        </View>,
        <View style={{ marginRight: 20 }}>
            <Text>Đang sử lý</Text>
        </View>,
        <View style={{ marginRight: 20 }}>
            <Text>Đã nhận</Text>
        </View >
    ]

    return (
        <View style={{ flex: 1 }}>
            <HeaderTitle title="Danh sách đơn hàng"></HeaderTitle>
            <View style={styles.header}>
                <TouchableOpacity>
                    <MaterialIcons name="arrow-back" size={35} color="white" onPress={() => navigation.goBack()} />
                </TouchableOpacity>
            </View>

            <ScrollView>
                {
                    order.length ?
                        order.map((item: any, index: number) =>
                            <View key={index} style={{ backgroundColor: '#fff', marginBottom: 10 }}>
                                <View style={[styles.container, { marginTop: 10 }]}>
                                    <Text style={{ fontWeight: 'bold', fontSize: 18 }}>{item.oder_id}</Text>
                                    <Text style={{ marginLeft: 'auto', fontSize: 10 }}>{moment.utc(item.oder_date).format('DD/MM/YYYY')}</Text>
                                </View>
                                <Text style={{ marginHorizontal: 10, fontSize: 11, color: '#ABA9A9' }}>{item.oder_phone}</Text>
                                {item.product_oder.length && item.product_oder.map((i: any, index: number) =>

                                    <View key={index} style={[styles.container, { marginTop: 20, marginBottom: 5 }]}>
                                        <Image source={{ uri: i.product.product_avatar }} style={{ width: 80, height: 80 }}></Image>
                                        <View style={styles.textView}>
                                            <View style={{ marginRight: 20 }}>
                                                <Text style={{ fontWeight: 'bold' }} >{SlugStrTitle(i.product.product_title, 65)}</Text>
                                            </View>
                                            <View style={{ marginRight: 20 }}>
                                                <Text>{i.product_quantity}</Text>
                                            </View>
                                            {
                                                __status[i.status]
                                            }
                                            <Text style={{ marginTop: 5 }}>{i.product.product_price}</Text>
                                        </View>
                                    </View>
                                )}


                            </View>)

                        :
                        <View></View>
                }
            </ScrollView >
        </View >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        marginLeft: 10,
        marginRight: 10,
    },

    textView: {
        marginHorizontal: 10,
        flex: 1
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
})