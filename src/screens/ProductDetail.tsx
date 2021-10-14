import React, { useState, useEffect } from 'react'
import { SafeAreaView } from 'react-navigation'
import { View, StyleSheet, Text, TouchableOpacity, ScrollView, ActivityIndicator, Alert } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Carousel from './../components/Carousel';
import COLORS from '../consts/Colors';
import RatingComment from '../components/RatingComment';
import Comment from '../components/Comment';
import { useNavigation } from './../utils/useNavigation';
import { Rating } from 'react-native-elements';
import { CommentModel, getProduct, ProductModel, State } from '../redux';
import { useDispatch, useSelector } from 'react-redux';
import { addComment, getComments } from '../redux/actions/commentActions';
import { getUserInfo } from '../redux/actions/userActions';
import { vnd } from '../consts/Selector';
export default function ProductDetail(props: any) {
    const { navigate } = useNavigation();
    const { navigation, route } = props;
    const { getParam, goBack } = navigation;
    const id = getParam('id');
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingComment, setIsLoadingComment] = useState(false);
    const [isLoadingAddCart, setIsLoadingAddCart] = useState(false);
    const productState = useSelector((state: State) => state.productReducer);
    const commentState = useSelector((state: State) => state.commentReducer);
    const { product } = productState;
    const { comment } = commentState;
    const dispatch = useDispatch();
    const userState = useSelector((state: State) => state.userReducer);
    const { userInfor } = userState;

    useEffect(() => {
        dispatch(getProduct(id));
        dispatch(getComments(id));
        dispatch(getUserInfo());
    }, []);

    useEffect(() => {
        if (product) {
            setIsLoading(true);
        }
    }, [productState, commentState])

    useEffect(() => {
        if (comment && !isLoadingComment) {
            setIsLoadingComment(true);
        }
    }, [commentState])



    const onTap = (comment_content: string, comment_rating: number) => {
        if (userInfor) {
            dispatch(addComment(id, userInfor.user_id, comment_content, comment_rating));
        } else {
            Alert.alert(
                "Thông báo!",
                "Chưa đăng nhập!",
                [
                    { text: "OK" }
                ]
            );
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            {!isLoading ?
                (<View style={styles.container}>
                    <ActivityIndicator size="large" color="#00ff00" />
                </View>) :
                (<ScrollView showsVerticalScrollIndicator={false}>
                    <View style={styles.header}>
                        <TouchableOpacity>
                            <MaterialIcons style={styles.headerIcon} name="arrow-back" size={30} color="white" onPress={() => navigation.goBack()} />
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <MaterialIcons onPress={() => navigate('cart')} style={styles.headerIcon} name="shopping-cart" color="white" size={30} />
                        </TouchableOpacity>
                    </View>
                    <View >
                        {product && <Carousel images={product.product_image} auto={false} />}
                    </View>
                    <View style={styles.detailContainer}>
                        {product && product.product_rating ?
                            <View style={{ alignItems: 'center', flexDirection: 'row', marginBottom: 10 }}>
                                <Rating readonly imageSize={28} fractions="{1}" startingValue={product.product_rating!.toFixed(1)} />
                                <Text style={{ marginLeft: 20, color: '#444', fontSize: 22 }}>{product.product_rating!.toFixed(1)}</Text>
                            </View>
                            :
                            <View style={{ alignItems: 'center', flexDirection: 'row', marginBottom: 10 }}>
                                <Rating readonly imageSize={28} fractions="{1}" startingValue={0} />
                                <Text style={{ marginLeft: 20, color: '#444', fontSize: 22 }}>{0}</Text>
                            </View>
                        }
                        {product && <Text style={styles.title}>{product.product_title}</Text>}
                        <View style={{ display: 'flex', flexDirection: 'row' }}>
                            <View style={{ flex: 1, flexDirection: 'column', alignItems: 'flex-start' }}>
                                {product && product.product_sale! != 0 && <Text style={{ textDecorationLine: 'line-through', color: 'gray', fontSize: 25 }}>{vnd(product.product_price)}đ</Text>}
                                {product && <Text style={{ marginBottom: 10, color: 'red', fontSize: 29 }}>{vnd(product.product_price! * (100 - product.product_sale!) / 100)}đ</Text>}
                            </View>
                            <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                {
                                    !isLoadingAddCart &&
                                    <TouchableOpacity onPress={() => {
                                        setIsLoadingAddCart(true);
                                    }}>
                                        <Text style={styles.btnBuy}>Add Cart</Text>
                                    </TouchableOpacity>
                                }
                                <TouchableOpacity onPress={() => {
                                    navigate('Shop', { shop_id: product!.shop_id });
                                }}>
                                    <Text style={styles.btnBuy}>Shop</Text>
                                </TouchableOpacity>

                            </View>
                        </View>

                        <Text style={styles.headerTitle}>Mô tả sản phẩm :</Text>
                        <Text style={styles.desc}>
                            {
                                product && product.product_description
                            }
                        </Text>

                        <Text style={styles.headerTitle}>Đánh giá & nhận xét :</Text>

                        {
                            isLoadingComment &&
                            <RatingComment onTap={onTap} />
                        }

                        <View>
                            {
                                comment && comment.map((comment: CommentModel, index: number) =>
                                    <View key={index}>
                                        <Comment starNumber={comment.comment_rating} user={comment.user} comment_content={comment.comment_content} />
                                    </View>
                                )
                            }
                        </View>

                    </View>
                </ScrollView>
                )}
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        marginTop: 35
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 5,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 2
    },
    headerIcon: {
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        borderRadius: 50,
        padding: 5
    },
    detailContainer: {
        flex: 0.55,
        marginHorizontal: 7,
        borderRadius: 20,
        padding: 5,
        backgroundColor: 'white'
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        color: COLORS.primary,
        marginBottom: 10
    },
    headerTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#111'
    },
    desc: {
        fontSize: 18,
        lineHeight: 25,
        color: '#111',
        padding: 2
    },
    btnBuy: {
        backgroundColor: '#00FF7F',
        padding: 7,
        width: 150,
        borderRadius: 20,
        marginBottom: 10,
        fontSize: 18,
        textAlign: 'center',
        fontWeight: '700',
        color: '#222'
    }
});