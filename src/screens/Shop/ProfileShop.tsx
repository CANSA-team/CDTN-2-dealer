import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, Platform, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { Accessory, Avatar, Button } from 'react-native-elements';
import * as ImagePicker from 'expo-image-picker';
import HeaderTitle from '../../components/HeaderTitle';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import { useNavigation } from '../../utils/useNavigation';
import axios from 'axios';
import { cansa } from '../../consts/Selector';
import { useDispatch, useSelector } from 'react-redux';
import { UserStage, checkLogin, logout, login, ImageId, UserModel, registerShop, ShopModel, RegisterShopModel, getShopOwner } from '../../redux';
import { ShopState, State } from '../../redux';



let user_temp = {
    "id": 1,
    "phone": "0968241064",
    "name": "anh",
    "birthday": "1999-09-28T17:00:00.000Z"
}

class UserProfile {
    shop_id?: number;
    shop_name?: string;
    shop_description?: string;
    shop_owner?: number;
    shop_avatar?: string;
    last_update?: number;
    status?: number;
    shop_avatar_id?: number;
}

export default function ProfileShop(props: any) {
    const dispatch = useDispatch();
    const { navigate } = useNavigation();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [image, setImage] = useState('https://i.ibb.co/hYjK44F/anise-aroma-art-bazaar-277253.jpg');
    const shopsState: ShopState = useSelector((state: State) => state.shopReducer);
    const { info }: { info: ShopModel } = shopsState;
    const { navigation, route } = props;
    const { getParam, goBack } = navigation;

    const onTapEditProfile = () => {
        navigate('EditProfileShop');
    }


    return (
        <View style={styles.container}>
            {!isLoading ?
                (<View style={styles.container}>
                    <ActivityIndicator size="large" color="#00ff00" />
                </View>) : (
                    <View>
                        <View>
                            <HeaderTitle title={'PROFILE SHOP'} />
                            <View style={styles.header}>
                                <TouchableOpacity>
                                    <MaterialIcons name="arrow-back" size={35} color="white" onPress={() => navigation.goBack()} />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={onTapEditProfile}>
                                    <Feather name="edit" color="white" size={35} />
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View style={styles.viewAvatar}>
                            <Avatar
                                containerStyle={{ marginBottom: 20 }}
                                rounded
                                size={150}
                                source={{
                                    uri: info.shop_avatar,
                                }} >
                            </Avatar>
                        </View>
                        <View style={styles.viewTxt}>
                            <View style={styles.txtContainer}>
                                <Text style={styles.txtTitle}>Tên Shop: {info.shop_name}</Text>
                            </View>

                            <View style={styles.txtContainer}>
                                <Text style={styles.txtTitle}>Mô tả: {info.shop_description}</Text>
                            </View>
                        </View>
                    </View>)}
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E5E5E5',
    },
    viewAvatar: {
        backgroundColor: '#fff',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingTop: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,
        elevation: 7,
        marginHorizontal: 5
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 5,
        position: 'absolute',
        top: 33,
        left: 5,
        right: 0,
        zIndex: 2
    },
    viewTxt: {
        marginTop: 3,
        backgroundColor: '#fff',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,
        elevation: 7,
        marginHorizontal: 5
    },
    txtContainer: {
        flexDirection: 'row',
        margin: 15,
        marginHorizontal: 10
    },
    txtTitle: {
        fontSize: 20,
        color: '#111'
    },
    resetPassContainer: {
        borderTopColor: '#ddd',
        borderTopWidth: 2,
        margin: 10,
        marginHorizontal: 10
    },
    touchReset: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 10
    }

});