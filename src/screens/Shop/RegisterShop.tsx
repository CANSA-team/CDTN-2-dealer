import React, { memo, useState, useEffect } from 'react';
import { View, TouchableOpacity, Image, Text, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Avatar, Accessory, Input, CheckBox } from 'react-native-elements';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import * as ImagePicker from 'expo-image-picker';

import {
    shopNameValidator,
    shopDescriptionValidator,
    imgValidator,
    tempValidator,
} from '../../core/utils';
import { State, UserStage, checkLogin, logout, login, ImageId, UserModel, registerShop, ShopState, ShopModel, RegisterShopModel, getShopOwner } from '../../redux';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '../../utils/useNavigation';
import { saveImage } from '../../consts/Selector';
import HeaderTitle from '../../components/HeaderTitle';
import COLORS from '../../consts/Colors';

export default function RegisterShop() {
    const [checked, setChecked] = useState(false);
    const [loading, setLoading] = useState(false);
    const [buttonC, setbuttonC] = useState(false);

    const [shop_name, setShop_name] = useState('');

    const [shop_description, setShop_description] = useState('');

    const [image, setImage] = useState('../../../assets/arrow_back.png');
    const userState: UserStage = useSelector((state: State) => state.userReducer);
    const { check, status, userInfor }: { check: boolean, status: string, userInfor: UserModel } = userState;
    const { navigate } = useNavigation();
    const dispatch = useDispatch();
    const shopState: ShopState = useSelector((state: State) => state.shopReducer);

    const { info, register_status }: { info: ShopModel, register_status: RegisterShopModel } = shopState;


    useEffect(() => {

        if (register_status.status == 'fail') {
            Alert.alert('Thông báo', register_status.message, [
                { text: "OK" }
            ])
        } else if (register_status.status == 'success') {
            Alert.alert('Thông báo', register_status.message, [
                { text: "OK", onPress: () => dispatch(getShopOwner(userInfor.user_id)) }
            ])
            setLoading(true);
        }
    }, [register_status])

    useEffect(() => {
        if (Object.keys(info).length !== 0) {
            navigate('homeStack')
            setLoading(false);
        }
    }, [info])

    useEffect(() => {
        dispatch(checkLogin());
    }, [status])


    useEffect(() => {
        if (!check) {
            navigate('loginStack')
        }
    }, [check])

    const _logout = () => {
        dispatch(logout());
    }

    const onPress = () => {

        const shop_nameError = shopNameValidator(shop_name);
        const shop_descriptionError = shopDescriptionValidator(shop_description);
        const shop_TempError = tempValidator(checked);
        const shop_ImageError = imgValidator(image);
        

        if (shop_nameError || shop_descriptionError || image == '../../../assets/arrow_back.png' || shop_TempError) {

            Alert.alert('Thông báo', shop_nameError + shop_descriptionError + shop_TempError + shop_ImageError)
            return;
        } else {
            setbuttonC(true);
            setLoading(true);

            let _avatar: ImageId = { id: 0 };
            const avatar_img = {
                uri: image,
                name: 'userProfile.jpg',
                type: 'image/jpg'
            }
            const saveAvt: Promise<void> = saveImage(avatar_img, _avatar);

            Promise.all([saveAvt]).then(() => {
                dispatch(registerShop(shop_name, shop_description, userInfor.user_id, _avatar.id));
                setLoading(false);
            })
        }
    };

    let getImg = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [3, 3],
            quality: 1,
        });

        if (!result.cancelled) {
            setImage(result.uri);
        }
    };
    return (
        <View style={styles.container}>
            <View>
                <View>
                    <HeaderTitle title={'Đăng Ký Bán Hàng'} />
                    <View style={styles.header}>
                        <TouchableOpacity>
                            <MaterialIcons name="arrow-back" size={35} color="white" onPress={() => _logout()} />
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.viewAvatar}>
                    <Avatar
                        containerStyle={{ marginBottom: 20 }}
                        rounded
                        size={200}
                        source={{
                            uri: image,
                        }}
                        onPress={getImg}
                    >
                        <Accessory style={{
                            borderWidth: 2,
                            borderColor: "#444",
                            backgroundColor: COLORS.primary
                        }} size={50}></Accessory>
                    </Avatar>
                </View>

                <View style={styles.viewTxt}>
                    <Input
                        value={shop_name}
                        label="Tên Shop"
                        onChangeText={setShop_name}
                    />

                    <Input
                        value={shop_description}
                        label="Mô tả"
                        onChangeText={setShop_description}
                    />

                    <CheckBox
                        center
                        title='Đồng Ý Điều Khoản Sử Dụng?'
                        checkedIcon='dot-circle-o'
                        uncheckedIcon='circle-o'
                        checked={checked}
                        onPress={() => setChecked(!checked)}
                    />
                    <ActivityIndicator
                        animating={loading}
                    />
                    <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 25, marginBottom: 8 }}>
                        <TouchableOpacity disabled={buttonC} onPress={() => onPress()}>
                            <Text style={styles.btnBuy}>Lưu</Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    spinnerTextStyle: {
        color: '#FFF',
    },
    label: {
        margin: 8,
    },



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
        paddingTop: 5,
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
        marginHorizontal: 10,
        alignItems: 'center'
    },
    txtTitle: {
        fontSize: 20,
        color: '#111',
        marginRight: 20,
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

