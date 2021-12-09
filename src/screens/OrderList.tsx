import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { View, StyleSheet, ScrollView, Text, Image, TouchableOpacity, ActivityIndicator } from 'react-native'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useDispatch, useSelector } from 'react-redux';
import HeaderTitle from '../components/HeaderTitle'
import { SlugStrTitle, vnd } from '../consts/Selector'
import { getShopOder, ShopModel, ShopOrder, ShopState, State } from '../redux';
import RNPickerSelect from 'react-native-picker-select';
import COLORS from '../consts/Colors';


export default function OrderList(props: any) {
    const { navigation } = props;
    const shopSate: ShopState = useSelector((state: State) => state.shopReducer);
    const { order }: { order: ShopOrder[] } = shopSate;
    const { info }: { info: ShopModel } = shopSate;
    const [isLoadMore, setisLoadMore] = useState(false)
    const [page, setPage] = useState<number>(1);
    const [orderRender, setOrderRender] = useState<ShopOrder[]>([])


    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getShopOder(info.shop_id))
    }, [])


    useEffect(() => {
        if (order?.length) {
            setOrderRender(order)
        }
    }, [order])

    const __status = [
        <View style={styles.statusDes}>
            <Text style={styles.txtStatus}>Đã hủy</Text>
        </View>,
        <View style={styles.statusPending}>
            <Text style={styles.txtStatus}>Đã đặt</Text>
        </View>,
        <View style={styles.statusPending}>
            <Text style={styles.txtStatus}>Đang sử lý</Text>
        </View>,
        <View style={styles.statusPending}>
            <Text style={styles.txtStatus}>Đang sử lý</Text>
        </View>,
        <View style={styles.statusAccept}>
            <Text style={styles.txtStatus}>Đã nhận</Text>
        </View >
    ]

    useEffect(() => {
        setisLoadMore(false);
    }, [order])

    useEffect(() => {
        dispatch(getShopOder(info.shop_id, page));
    }, [page])

    const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }: any) => {
        const paddingToBottom = 20;
        return layoutMeasurement.height + contentOffset.y >=
            contentSize.height - paddingToBottom;
    };

    const filterStatus = (data: number) => {
        if (order) {
            let result = [];
            switch (data) {
                case 0:
                    result = order.filter((order: ShopOrder) => order.status === 0);
                    setOrderRender(result)
                    break;
                case 1:
                    result = order.filter((order: ShopOrder) => order.status === 1);
                    setOrderRender(result)
                    break;
                case 2:
                    result = order.filter((order: ShopOrder) => order.status === 2 || order.status === 3);
                    setOrderRender(result)
                    break;
                case 3:
                    result = order.filter((order: ShopOrder) => order.status === 4);
                    setOrderRender(result)
                    break;

                default:
                    setOrderRender(order)
                    break;
            }
        }
    }

    return (
        <View style={{ flex: 1 }}>
            <HeaderTitle title="Danh sách đơn hàng"></HeaderTitle>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <MaterialIcons name="arrow-back" size={35} color="white" />
                </TouchableOpacity>
            </View>
            <View style={{ padding: 10, backgroundColor: 'white' }}>
                <RNPickerSelect
                    placeholder={{ label: "Tất cả", value: -1 }}
                    style={{ ...pickerSelectStyles, placeholder: { color: '#555' } }}
                    onValueChange={(data) => filterStatus(data)}
                    items={[
                        { label: 'Đang sử lý', value: 2 },
                        { label: 'Đã đặt hàng', value: 1 },
                        { label: 'Đã hủy', value: 0 },
                        { label: 'Đã giao', value: 3 },
                    ]}
                />
            </View>
            <ScrollView
                onScroll={({ nativeEvent }) => {
                    if (isCloseToBottom(nativeEvent)) {
                        setPage(page + 1);
                        setisLoadMore(true);
                    }
                }}
                scrollEventThrottle={400}
                showsVerticalScrollIndicator={false}
            >
                <>
                    {
                        orderRender &&
                        orderRender.map((item: any, index: number) => {
                            let sub_price: number = 0;
                            for (const i of item.product_oder) {
                                if (i.status) {
                                    sub_price += (i.product_price * (100 - i.product_sale) / 100) * i.product_quantity;
                                }
                            }
                            return (
                                <View key={index} style={{ backgroundColor: '#fff', marginBottom: 10 }}>
                                    <View style={[styles.container, { marginTop: 10 }]}>
                                        <Text style={{ fontWeight: 'bold', fontSize: 18 }}>{item.oder_id}</Text>
                                        <Text style={{ marginLeft: 'auto', fontSize: 10 }}>{moment.utc(item.oder_date).format('DD/MM/YYYY')}</Text>
                                    </View>
                                    <Text style={{ marginHorizontal: 10, fontSize: 11, color: '#ABA9A9' }}>Số điện thoại: {item.oder_phone}</Text>
                                    <Text style={{ marginHorizontal: 10, fontSize: 11, color: '#ABA9A9' }}>Địa chỉ: {item.oder_address}</Text>
                                    <Text style={{ marginHorizontal: 10, fontSize: 11, color: '#ABA9A9' }}>Tổng giá trị đơn hàng: {vnd(sub_price)}đ</Text>
                                    {item.product_oder.length && item.product_oder.map((i: any, index: number) =>

                                        <View key={index} style={[styles.container, { marginTop: 20, marginBottom: 5 }]}>
                                            <Image source={{ uri: i.product_avatar }} style={{ width: 80, height: 80 }}></Image>
                                            <View style={styles.textView}>
                                                <View style={{ marginRight: 20 }}>
                                                    <Text style={{ fontWeight: 'bold' }} >{SlugStrTitle(i.product_title, 65)}</Text>
                                                </View>
                                                <View style={{ marginRight: 20 }}>
                                                    <Text>Số lượng: {i.product_quantity}</Text>
                                                </View>
                                                <Text style={{ marginTop: 5 }}>Giá tiền: {vnd((i.product_price * (100 - i.product_sale) / 100) * i.product_quantity)}đ</Text>
                                                {
                                                    __status[i.status]
                                                }
                                            </View>
                                        </View>
                                    )}
                                </View>
                            )
                        })

                    }
                    {
                        isLoadMore &&
                        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                            <ActivityIndicator size="large" color="#00ff00" />
                        </View>

                    }

                </>
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
    containerStatus: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    statusPending: {
        marginTop: 8,
        backgroundColor: '#007bff',
        padding: 8,
        borderRadius: 10,
    },
    statusDes: {
        marginTop: 8,
        backgroundColor: '#dc3545',
        padding: 8,
        borderRadius: 10
    },
    statusAccept: {
        marginTop: 8,
        backgroundColor: '#28a745',
        padding: 8,
        borderRadius: 10
    },
    txtStatus: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center'
    }

})

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 20,
        borderRadius: 30,
        color: 'black',
        padding: 20,

    },
    inputAndroid: {
        fontSize: 20,
        borderRadius: 30,
        color: 'black',
        padding: 20
    }
});