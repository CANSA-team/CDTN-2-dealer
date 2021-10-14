import React, { useState, useEffect } from 'react'
import { View, StyleSheet, Dimensions, Image, SafeAreaView, ScrollView, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { get } from 'styled-system';
import Category from '../components/Category';
import HeaderBar from '../components/HeaderBar';
import { State, getProductsHot, getProductsNew, getProductsCategory, getSlider } from '../redux';
import { getCategory } from '../redux/actions/categoryActions';
import { getUserInfo } from '../redux/actions/userActions';
import Carousel from './../components/Carousel';
import Product from './../components/Product';
import { useNavigation } from './../utils/useNavigation';

const WIDTH = Dimensions.get('window').width;

export default function Home() {
    const [catergoryIndex, setCategoryIndex] = useState<number>(0);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isLoadingCategory, setIsLoadingCategory] = useState<boolean>(true);
    const productState = useSelector((state: State) => state.productReducer);
    const sliderState = useSelector((state: State) => state.sliderReducer);
    const categoryState = useSelector((state: State) => state.categoryReducer);
    const { categories } = categoryState;
    const { productHot, productNew, productCategory } = productState;
    const { slider } = sliderState;
    const [_slider, _setSlider] = useState<string[]>([]);
    const dispatch = useDispatch();
    const { navigate } = useNavigation();

    useEffect(() => {
        dispatch(getProductsNew());
        dispatch(getProductsHot());
        dispatch(getCategory());
        dispatch(getSlider());
    }, []);

    useEffect(() => {
 
        if (productHot && productNew && productCategory && slider && isLoadingCategory) {
            let tempArr: any[] = [];
            for (const iterator of slider!) {
                tempArr.push(iterator.slider_image)
            }
            _setSlider(tempArr);
            setIsLoading(true);
        }
        if (!isLoadingCategory) {
            setIsLoadingCategory(true);
        }
    }, [productState, sliderState])

    useEffect(() => {
        if (categories && !productCategory) {
            dispatch(getProductsCategory(categories![0].category_id!));
        }
    }, [categoryState])

    //Chuyen man hinh
    const onTapDetail = (id: number) => {
        navigate('ProductDetail', { id })
    }

    const searchProduct = (data: any) => {
        navigate('Search', { data: data, title: 'Tìm kiếm' })
    }

    return (
        <SafeAreaView style={styles.container}>
            {/* Header */}
            <View style={{ marginTop: 40,marginBottom:20 }}>
                <HeaderBar onSearch={searchProduct} />
            </View>
            {
                !isLoading ?
                    (<View style={styles.container}>
                        <ActivityIndicator size="large" color="#00ff00" />
                    </View>) : (
                        <ScrollView showsVerticalScrollIndicator={false} >
                            {/* Slider */}
                            <View >
                                {_slider && <Carousel images={_slider} auto={true} />}
                            </View>
                            {/* Category */}
                            <View style={{ flexDirection: 'row', marginBottom: 20 }}>
                                {

                                    categories && categories.map((item, index) =>
                                        <View key={index} style={{ marginLeft: 20 }}>
                                            <Category item={item} index={index} catergoryIndex={catergoryIndex} onTap={() => {
                                                setIsLoadingCategory(false);
                                                const id: number = Number(item.category_id);
                                                dispatch(getProductsCategory(id));
                                                setCategoryIndex(index);
                                            }} />
                                        </View>
                                    )
                                }

                            </View>
                            <View style={styles.productList}>
                                {
                                    !isLoadingCategory ?
                                        (<View style={styles.container}>
                                            <ActivityIndicator size="large" color="#00ff00" />
                                        </View>) :
                                        productCategory && productCategory.map((product, index) => <Product onTap={onTapDetail} key={index} product={product} type="NEW" />)

                                }
                            </View>
                            {/* San pham moi nhat */}
                            <View style={styles.productContainer}>
                                <Image style={{ height: 70, width: WIDTH }} source={require('../images/sanpnew.png')} />
                            </View>
                            <View style={styles.productList}>
                                {
                                    productNew && productNew.map((product, index) => <Product onTap={onTapDetail} key={index} product={product} type="HOT" />)
                                }
                            </View>

                            {/* San pham moi nhat */}
                            <View style={styles.productContainer}>
                                <Image style={{ height: 70, width: WIDTH }} source={require('../images/sanpnoibat.png')} />
                            </View>
                            <View style={styles.productList}>
                                {
                                    productHot && productHot.map((product, index) => <Product onTap={onTapDetail} key={index} product={product} type="NEW" />)
                                }
                            </View>

                        </ScrollView>)
            }
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E5E5E5',
    },
    productContainer: {
        flex: 1,
        marginBottom: 20,
        marginTop: 10
    },
    productsTitle: {
        textAlign: 'center',
        padding: 10,
        color: '#fff7f7',
        fontWeight: 'bold',
        fontSize: 20,
        backgroundColor: '#FF00FF'
    },
    productList: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around'
    }
});