import React, { useState, useEffect } from 'react'
import { SafeAreaView, View, StyleSheet, FlatList, Text, ActivityIndicator, TouchableOpacity } from 'react-native'
import SearchBarTop from '../components/SearchBarTop'
import RNPickerSelect from 'react-native-picker-select';
import COLORS from '../consts/Colors';
import Product from '../components/Product';
import { useNavigation } from '../utils/useNavigation';
import { useDispatch, useSelector } from 'react-redux';
import { getProductsCategory, getProductsSearch, ProductModel, State } from '../redux';
import { ScrollView } from 'react-native-gesture-handler';
import  MaterialIcons  from 'react-native-vector-icons/MaterialIcons';

export default function Search(props: any) {
    const productState = useSelector((state: State) => state.productReducer);
    const dispatch = useDispatch();
    const { productSearch, productCategory } = productState;
    const { navigation, route } = props;
    const { getParam, goBack } = navigation;
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isLoadmore, setIsLoadmore] = useState<boolean>(false);
    const [page, setPage] = useState<number>(1);
    const [products, setProducts] = useState<any>([new ProductModel()]);
    const [title, setTitle] = useState<string>(getParam('title'));
    const [data, setData] = useState<any>(getParam('data'));
    const { navigate } = useNavigation();
    const onTapDetail = (id: number) => {
        navigate('ProductDetail', { id })
    }

    const filterPrice = (data:number) =>{
        if (productSearch || productCategory) {
            let arr = [];
            switch (data) {
                case 1:
                    if (productSearch) {
                        arr = productSearch.filter((product:ProductModel) => product.product_price!*(100-product.product_sale!)/100 <= 999999)
                    }
                    else{
                        arr = productCategory!.filter((product:ProductModel) => product.product_price!*(100-product.product_sale!)/100 <= 999999)
                    }
                    setProducts(arr);
                    break;
                case 2:
                    if (productSearch) {
                       arr = productSearch.filter((product:ProductModel) => product.product_price!*(100-product.product_sale!)/100 >= 1000000 && product.product_price!*(100-product.product_sale!)/100 <= 9999999)
                    }
                    else{
                       arr = productCategory!.filter((product:ProductModel) => product.product_price!*(100-product.product_sale!)/100 >= 1000000 && product.product_price!*(100-product.product_sale!)/100 <= 9999999)
                    }
                    setProducts(arr);
                    break;
                case 3:
                    if (productSearch) {
                        arr = productSearch.filter((product:ProductModel) => product.product_price!*(100-product.product_sale!)/100 >= 10000000)
                    }
                    else{
                        arr = productCategory!.filter((product:ProductModel) => product.product_price!*(100-product.product_sale!)/100 >= 10000000)
                    }
                    setProducts(arr);
                    break;
                default:
                    arr=[]
                    CheckSearchOrCat(title)
                break;
            }
        }
    }

    const sortName = (data:number)=>{
        if (products) {
            let arr;
            switch (data) {
                case 1:
                    arr = [...products];
                    arr.sort((a:ProductModel, b:ProductModel)=> a.product_title!.toUpperCase() !== b.product_title!.toUpperCase() ? a.product_title!.toUpperCase() < b.product_title!.toUpperCase() ? -1 : 1 : 0 );  
                    setProducts(arr);
                    break;
                case 2:
                    arr = [...products];
                    arr.sort((a:ProductModel, b:ProductModel)=> a.product_title!.toUpperCase() !== b.product_title!.toUpperCase() ? a.product_title!.toUpperCase() > b.product_title!.toUpperCase() ? -1 : 1 : 0 );  
                    setProducts(arr);
                    break;
                default:
                    arr=[...products];
                    setProducts(arr);
                break;
            }
        }
    }

    function CheckSearchOrCat(title:string) {
        switch (title) {
            case 'Tìm kiếm':
                if (productSearch) {
                    setProducts(productSearch!);
                    setIsLoading(true);
                }
                else{
                    setProducts([]);
                    setIsLoading(true);
                }
                break;
            default:
                if (productCategory) {
                    setProducts(productCategory!);
                    setIsLoading(true);
                }
                else{
                    setProducts([]);
                    setIsLoading(true);
                }
                break;
        }
    }

    useEffect(() => {
        CheckSearchOrCat(title)
    }, [])

    useEffect(() => {
        switch (title) {
            case 'Tìm kiếm':
                if (productSearch) {
                    setProducts(productSearch!);
                    setIsLoading(true);
                }
                else{
                    setProducts([]);
                    setIsLoading(true);
                }
                break;
            default:
                if (productCategory) {
                    setProducts(productCategory!);
                    setIsLoading(true);
                }
                else{
                    setProducts([]);
                    setIsLoading(true);
                }
                break;
        }
    }, [productState])

    useEffect(() => {
        switch (title) {
            case 'Tìm kiếm':
                dispatch(getProductsSearch(data, page));
                break;
            default:
                dispatch(getProductsCategory(data, page));
                break;
        }
    }, [page])

    const searchProduct = (data: any) => {
        navigate('Search', { data })
    }

    const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }: any) => {
        const paddingToBottom = 20;
        return layoutMeasurement.height + contentOffset.y >=
            contentSize.height - paddingToBottom;
    };

    return (
        !isLoading ?
            (<SafeAreaView style={styles.container}>
                <ActivityIndicator size="large" color="#00ff00" />
            </SafeAreaView>) : (
                <SafeAreaView style={styles.container}>

                    <View style={styles.searchContainer}>
                        <SearchBarTop onSearch={searchProduct} />        
                    </View>
                   
                    <View style={{ flex: 1, marginTop: 30, backgroundColor: '#E5E5E5' }}>
                        <View style={{paddingVertical:10,backgroundColor:'#ffffff',marginBottom:15}}>
                            <Text style={{textAlign:'center',fontSize:18,color:'#222'}}>{title}</Text>
                            <View style={styles.header}>
                                <TouchableOpacity>
                                    <MaterialIcons style={styles.headerIcon} name="arrow-back" size={25} color="white" onPress={() => navigation.goBack()} />
                                </TouchableOpacity>
                            </View>    
                        </View>
                        <View style={{ flexDirection: 'row', padding: 10, marginBottom: 10 }}>
                            <View style={{ flex: 1, borderRadius: 50, paddingRight: 10 }}>
                                <View style={{ borderWidth: 1, borderColor: '#888' }}>
                                    <RNPickerSelect
                                        placeholder={{ label: "Filter", value: 0 }}
                                        style={{ ...pickerSelectStyles, placeholder: { color: '#555' } }}
                                        onValueChange={(data) => filterPrice(data)}
                                        items={[
                                            { label: '< 1.000.000đ', value: 1 },
                                            { label: '1.000.000 - 10.000.000đ', value: 2 },
                                            { label: '> 10.000.000đ', value: 3 },
                                        ]}
                                    />
                                </View>
                            </View>
                            <View style={{ flex: 1, paddingLeft: 10 }}>

                                <View style={{ borderWidth: 1, borderColor: '#888' }}>
                                    <RNPickerSelect
                                        placeholder={{ label: "Sort", value: 0 }}
                                        style={{ ...pickerSelectStyles, placeholder: { color: '#555' } }}
                                        onValueChange={(data) => sortName(data)}
                                        items={[
                                            { label: 'A - Z', value: 1 },
                                            { label: 'Z - A', value: 2 },
                                        ]}
                                    />
                                </View>
                            </View>
                        </View>
                        <ScrollView                         
                            onScroll={({ nativeEvent }) => {
                                if (isCloseToBottom(nativeEvent)) {
                                    setPage(page + 1);
                                }
                            }}
                            scrollEventThrottle={400}
                            >
                            <View style={styles.productList}>
                                {
                                    products.length > 0 ? products.map((product, index) => <Product onTap={onTapDetail} key={index} product={product} />) 
                                    :
                                    <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                                        <Text style={{fontSize:20,color:'#222'}}>Không có sản phẩm</Text>
                                    </View>
                                }
                            </View>
                        </ScrollView>

                    </View>
                </SafeAreaView>
            )
    )
}

const styles = StyleSheet.create({
    header: {
        flexDirection:'row',
        justifyContent:'space-between',
        padding: 5,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex:2
    },
    headerIcon: {
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        borderRadius: 50,
        padding: 5
    },
    container: {
        flex: 1,
        backgroundColor: COLORS.primary,
    },
    searchContainer: {
        marginTop: 30,

    },
    productList: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent:'space-around',
        flexWrap:'wrap'
    }
});
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
    },

});