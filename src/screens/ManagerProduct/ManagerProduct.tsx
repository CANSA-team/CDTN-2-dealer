import React,{useEffect} from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import HeaderTitle from '../../components/HeaderTitle';
import  MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Product from '../../components/Product';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '../../utils/useNavigation';
import { getProductsShop, ProductModel, ProductState, ShopModel, ShopState, State } from '../../redux';
import { useDispatch, useSelector } from 'react-redux';
 
export default function ManagerProduct(props:any) {
    const { navigation} = props;
    const { navigate } = useNavigation();
    const shopSate: ShopState = useSelector((state: State) => state.shopReducer);
    const { info }: { info: ShopModel } = shopSate;
    const productState: ProductState = useSelector((state: State) => state.productReducer);
    const { productShop } : { productShop:ProductModel[]} = productState;
    const dispatch = useDispatch();


    const onTapDetail = (product: ProductModel) => {
        navigate('ProductDetail', { product })
    }

    useEffect(() => {
        dispatch(getProductsShop(info.shop_id));
    }, [])

   
    return (
        <View style={styles.container}>
            <HeaderTitle title="Quản lí sản phẩm"/>
            <View style={styles.header}>
                <TouchableOpacity>
                    <MaterialIcons name="arrow-back" size={35} color="white" onPress={() => navigation.goBack()} />
                </TouchableOpacity>
                <TouchableOpacity>
                    <Ionicons name="ios-add" onPress={() => navigate('AddProduct')} size={35} color="white" />
                </TouchableOpacity>
            </View>
            <View style={{ marginTop:5,marginBottom:10,flex:1}}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    {
                        productShop &&
                        productShop.map((product:ProductModel)=>
                            <Product onDetail={()=>onTapDetail(product)} key={product.product_id} productInfo={product}/>
                        )
                    }
                </ScrollView>
            </View>
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