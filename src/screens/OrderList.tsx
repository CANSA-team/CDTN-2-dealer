import moment from 'moment';
import React, { useEffect } from 'react'
import { View, StyleSheet, ScrollView, Text, Image, TouchableOpacity } from 'react-native'
import { Item } from 'react-native-paper/lib/typescript/components/List/List';
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

    return (
        <View style={{ flex: 1 }}>
            <HeaderTitle title="Danh sách đơn hàng"></HeaderTitle>
            <View style={styles.header}>
                <TouchableOpacity>
                    <MaterialIcons name="arrow-back" size={35} color="white" onPress={() => navigation.goBack()} />
                </TouchableOpacity>
            </View>

            <ScrollView>
                {/* hiển thị các đơn hàng */}

                {
                    order.length ?
                        order.map((item: any,index:number) =>
                            // console.log(item);

                            <View key={index} style={{ backgroundColor: '#fff', marginBottom: 10 }}>
                                <View style={[styles.container, { marginTop: 10 }]}>
                                    <Text style={{ fontWeight: 'bold', fontSize: 18 }}>{item.oder_id}</Text>
                                    <Text style={{ marginLeft: 'auto', fontSize: 10 }}>{moment.utc(item.oder_date).format('DD/MM/YYYY')}</Text>
                                </View>
                                <Text style={{ marginHorizontal: 10, fontSize: 11, color: '#ABA9A9' }}>{item.oder_phone}</Text>
                                {item.product_oder.length && item.product_oder.map((i: any,index:number) =>

                                    <View key={index} style={[styles.container, { marginTop: 20, marginBottom: 5 }]}>
                                        <Image source={{ uri: i.product.product_avatar }} style={{ width: 80, height: 80 }}></Image>
                                        <View style={styles.textView}>
                                            <View style={{ marginRight: 20 }}>
                                                <Text style={{ fontWeight: 'bold' }} >{SlugStrTitle(i.product.product_title, 65)}</Text>
                                            </View>
                                            <View style={{ marginRight: 20 }}>
                                                <Text>{i.product_quantity}</Text>
                                            </View>
                                            <Text style={{ marginTop: 5 }}>{i.product.product_price}</Text>
                                        </View>
                                    </View>
                                )}


                            </View>)

                        :
                        <View></View>
                }

                {/* <View style={{ backgroundColor: '#fff', marginBottom: 10 }}>
                    <View style={[styles.container, { marginTop: 10 }]}>
                        <Text style={{ fontWeight: 'bold', fontSize: 18 }}>{order.order_id}</Text>
                        <Text style={{ marginLeft: 'auto', fontSize: 10 }}>{moment.utc(order.order_date).format('DD/MM/YYYY')}</Text>
                    </View>
                    <Text style={{ marginHorizontal: 10, fontSize: 11, color: '#ABA9A9' }}>{order.order_phone}</Text>
                    <View style={[styles.container, { marginTop: 20, marginBottom: 5 }]}>
                        <Image source={require(order.product_order.product.product_avatar)} style={{ width: 80, height: 80 }}></Image>
                        <View style={styles.textView}>
                            <View style={{ marginRight: 20 }}>
                                <Text style={{ fontWeight: 'bold' }} >{SlugStrTitle(order.product_order.product.product_title, 65)}</Text>
                            </View>
                            <View style={{ marginRight: 20 }}>
                                <Text>{order.product_order.product_quantity}</Text>
                            </View>
                            <Text style={{ marginTop: 5 }}>{order.product_order.product.product_price}</Text>
                        </View>
                    </View> */}

                {/* <View style={[styles.container, { marginTop: 20, marginBottom: 5 }]}>
                        <Image source={require("../images/noorders.png")} style={{ width: 80, height: 80 }}></Image>
                        <View style={styles.textView}>
                            <View style={{ marginRight: 20 }}>
                                <Text style={{ fontWeight: 'bold' }} >{SlugStrTitle("TRẢ GÓP 0% Điện thoại OPPO Reno 3 (8GB/128GB)- Hàng chính hãng bảo hành 12 tháng", 65)}</Text>
                            </View>
                            <View style={{ marginRight: 20 }}>
                                <Text>Qty: 5</Text>
                            </View>
                            <Text style={{ marginTop: 5 }}>24.500.000đ</Text>
                        </View>
                    </View>

                    <View style={[styles.container, { marginTop: 20, marginBottom: 5 }]}>
                        <Image source={require("../images/noorders.png")} style={{ width: 80, height: 80 }}></Image>
                        <View style={styles.textView}>
                            <View style={{ marginRight: 20 }}>
                                <Text style={{ fontWeight: 'bold' }} >{SlugStrTitle("Nước rửa cọ MAC Brush Cleanser 235ml Lorem ipsum, dolor sit amet consectetur adipisicing elit. Vitae earum voluptatum dicta distinctio, illo velit aspernatur voluptate autem quidem itaque necessitatibus doloribus ab quis quae nihil tempore ex culpa fugit.", 65)}</Text>
                            </View>
                            <View style={{ marginRight: 20 }}>
                                <Text>Qty: 10</Text>
                            </View>
                            <Text style={{ marginTop: 5 }}>14.500.000đ</Text>
                        </View>
                    </View> */}
                {/* </View> */}
                {/*  */}

                {/* <View style={{ backgroundColor: '#fff', marginBottom: 10 }}>
                    <View style={[styles.container, { marginTop: 10 }]}>
                        <Text style={{ fontWeight: 'bold', fontSize: 18 }}>921633950000288</Text>
                        <Text style={{ marginLeft: 'auto', fontSize: 10 }}>25/10/2021</Text>
                    </View>
                    <Text style={{ marginHorizontal: 10, fontSize: 11, color: '#ABA9A9' }}>hoanganh34k@gmail.com</Text>
                    <View style={[styles.container, { marginTop: 20, marginBottom: 5 }]}>
                        <Image source={require("../images/noorders.png")} style={{ width: 80, height: 80 }}></Image>
                        <View style={styles.textView}>
                            <View style={{ marginRight: 20 }}>
                                <Text style={{ fontWeight: 'bold' }} >{SlugStrTitle("Nước rửa cọ MAC Brush Cleanser 235ml Lorem ipsum, dolor sit amet consectetur adipisicing elit. Vitae earum voluptatum dicta distinctio, illo velit aspernatur voluptate autem quidem itaque necessitatibus doloribus ab quis quae nihil tempore ex culpa fugit.", 65)}</Text>
                            </View>
                            <View style={{ marginRight: 20 }}>
                                <Text>Qty: 2</Text>
                            </View>
                            <Text style={{ marginTop: 5 }}>4.500.000đ</Text>
                        </View>
                    </View>

                    <View style={[styles.container, { marginTop: 20, marginBottom: 5 }]}>
                        <Image source={require("../images/noorders.png")} style={{ width: 80, height: 80 }}></Image>
                        <View style={styles.textView}>
                            <View style={{ marginRight: 20 }}>
                                <Text style={{ fontWeight: 'bold' }} >{SlugStrTitle("TRẢ GÓP 0% Điện thoại OPPO Reno 3 (8GB/128GB)- Hàng chính hãng bảo hành 12 tháng", 65)}</Text>
                            </View>
                            <View style={{ marginRight: 20 }}>
                                <Text>Qty: 5</Text>
                            </View>
                            <Text style={{ marginTop: 5 }}>24.500.000đ</Text>
                        </View>
                    </View>
                </View>

                <View style={{ backgroundColor: '#fff', marginBottom: 10 }}>
                    <View style={[styles.container, { marginTop: 10 }]}>
                        <Text style={{ fontWeight: 'bold', fontSize: 18 }}>921633950000288</Text>
                        <Text style={{ marginLeft: 'auto', fontSize: 10 }}>25/10/2021</Text>
                    </View>
                    <Text style={{ marginHorizontal: 10, fontSize: 11, color: '#ABA9A9' }}>hoanganh34k@gmail.com</Text>
                    <View style={[styles.container, { marginTop: 20, marginBottom: 5 }]}>
                        <Image source={require("../images/noorders.png")} style={{ width: 80, height: 80 }}></Image>
                        <View style={styles.textView}>
                            <View style={{ marginRight: 20 }}>
                                <Text style={{ fontWeight: 'bold' }} >{SlugStrTitle("Nước rửa cọ MAC Brush Cleanser 235ml Lorem ipsum, dolor sit amet consectetur adipisicing elit. Vitae earum voluptatum dicta distinctio, illo velit aspernatur voluptate autem quidem itaque necessitatibus doloribus ab quis quae nihil tempore ex culpa fugit.", 65)}</Text>
                            </View>
                            <View style={{ marginRight: 20 }}>
                                <Text>Qty: 2</Text>
                            </View>
                            <Text style={{ marginTop: 5 }}>4.500.000đ</Text>
                        </View>
                    </View>
                </View> */}

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