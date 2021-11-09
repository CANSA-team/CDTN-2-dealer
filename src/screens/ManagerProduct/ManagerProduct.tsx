import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator, Alert, Image } from 'react-native';
import HeaderTitle from '../../components/HeaderTitle';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Product from '../../components/Product';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '../../utils/useNavigation';
import { deleteProduct, getProductsShop, ProductModel, ProductState, ShopModel, ShopState, State } from '../../redux';
import { useDispatch, useSelector } from 'react-redux';

export default function ManagerProduct(props: any) {
    const { navigation } = props;
    const { navigate } = useNavigation();
    const shopSate: ShopState = useSelector((state: State) => state.shopReducer);
    const { info }: { info: ShopModel } = shopSate;
    const productState: ProductState = useSelector((state: State) => state.productReducer);
    const { productShop }: { productShop: ProductModel[] } = productState;
    const dispatch = useDispatch();
    const [page, setPage] = useState<number>(1);
    const [isLoading, setisLoading] = useState(true)
    const [isLoadMore, setisLoadMore] = useState(false)

    const onTapDetail = (product: ProductModel) => {
        navigate('ProductDetail', { product })
    }
    const onTapEidt = (product: ProductModel) => {
        navigate('EditProduct', { product })
    }

    const onDelete = (product_id: number) => {
        Alert.alert(
            "Thông báo!",
            'Xác nhận xoá sản phẩm',
            [
                { text: "Xác nhận", onPress: () => dispatch(deleteProduct(product_id, info.shop_id)) },
                { text: "Huỷ" }
            ]
        );
    }

    useEffect(() => {
        dispatch(getProductsShop(info.shop_id));
    }, [])

    useEffect(() => {
        setisLoadMore(false);
        setisLoading(false);
    }, [productShop])

    useEffect(() => {
        dispatch(getProductsShop(info.shop_id, page));
    }, [page])

    const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }: any) => {
        const paddingToBottom = 20;
        return layoutMeasurement.height + contentOffset.y >=
            contentSize.height - paddingToBottom;
    };

    return (
        <View style={styles.container}>
            <HeaderTitle title="Quản lí sản phẩm" />
            <View style={styles.header}>
                <TouchableOpacity>
                    <MaterialIcons name="arrow-back" size={35} color="white" onPress={() => navigation.goBack()} />
                </TouchableOpacity>
                <TouchableOpacity>
                    <Ionicons name="ios-add" onPress={() => navigate('AddProduct')} size={35} color="white" />
                </TouchableOpacity>
            </View>
            {isLoading ?
                (<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Image source={require('../../images/loader.gif')} />

                </View>)
                :
                (
                    <View style={{ marginTop: 5, marginBottom: 10, flex: 1 }}>
                        <ScrollView
                            onScroll={({ nativeEvent }) => {
                                if (isCloseToBottom(nativeEvent)) {
                                    setPage(page + 1);
                                    setisLoadMore(true);
                                }
                            }}
                            scrollEventThrottle={400}
                            showsVerticalScrollIndicator={false}>
                            {
                                productShop &&
                                productShop.map((product: ProductModel) =>
                                    <Product onDelete={() => onDelete(product.product_id)} onTapEidt={() => onTapEidt(product)} onDetail={() => onTapDetail(product)} key={product.product_id} productInfo={product} />
                                )
                            }
                            {
                                isLoadMore &&
                                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                    <ActivityIndicator size="large" color="#00ff00" />
                                </View>
                            }
                        </ScrollView>
                    </View>
                )}
        </View>

    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
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
});