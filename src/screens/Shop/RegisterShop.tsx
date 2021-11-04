import React, { memo, useState, useEffect } from 'react';
import { View, TouchableOpacity, Image, Text, StyleSheet, Alert } from 'react-native';
import Background from '../../components/Background';
import Header from '../../components/Header';
import TextInput from '../../components/TextInput';
import Button from '../../components/Button';
import { Avatar, Accessory } from 'react-native-elements';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import CircleCheckBox, { LABEL_POSITION } from 'react-native-circle-checkbox';
import * as ImagePicker from 'expo-image-picker';
import {
    shopNameValidator,
    shopDescriptionValidator,
    imgValidator,
} from '../../core/utils';
import { State, UserStage, checkLogin, logout, login, ImageId, UserModel, registerShop, ShopState, ShopModel, RegisterShopModel, getShopOwner } from '../../redux';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '../../utils/useNavigation';
import { saveImage } from '../../consts/Selector';



export default function RegisterShop() {
    const [shop_name, setShop_name] = useState({ value: '', error: '' });
    const [shop_description, setShop_description] = useState({ value: '', error: '' });

    const [image, setImage] = useState({ value: '../../../assets/arrow_back.png', error: '' });
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
        }
    }, [register_status])

    useEffect(() => {
        if (info) {
            console.log(info)
            navigate('homeStack')
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


    const _onSignUpPressed = () => {
        const shop_nameError = shopNameValidator(shop_name.value);
        const shop_descriptionError = shopDescriptionValidator(shop_description.value);

        if (shop_nameError || shop_descriptionError || image.value == '../../../assets/arrow_back.png') {
            setShop_name({ ...shop_name, error: shop_nameError });
            setShop_description({ ...shop_description, error: shop_descriptionError });

            return;
        } else {
            console.log(shop_name, shop_description, image);
            let _avatar: ImageId = { id: 0 };
            const avatar_img = {
                uri: image.value,
                name: 'userProfile.jpg',
                type: 'image/jpg'
            }
            const saveAvt: Promise<void> = saveImage(avatar_img, _avatar);
            Promise.all([saveAvt]).then(() => {
                dispatch(registerShop(shop_name.value, shop_description.value, userInfor.user_id, _avatar.id));
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
            setImage({ value: result.uri, error: '' });
        }
    };
    return (
        <>

            <Background>

                <TouchableOpacity style={styles.container} onPress={() => _logout()}>
                    <Image source={require('../../../assets/arrow_back.png')} />
                </TouchableOpacity>


                <Header>Tạo Tài Khoản Bán Hàng</Header>
                <Avatar
                    containerStyle={{ marginBottom: 20 }}
                    rounded
                    size={100}
                    source={{
                        uri: image.value,
                    }}
                    onPress={getImg}
                >
                    <Accessory style={{
                        borderWidth: 2,
                        borderColor: "#444",
                        backgroundColor: '#000',
                    }} size={50} tvParallaxProperties={undefined}></Accessory>
                </Avatar>

                <TextInput
                    label="Tên shop"
                    returnKeyType="next"
                    value={shop_name.value}
                    onChangeText={text => setShop_name({ value: text, error: '' })}
                    error={!!shop_name.error}
                    errorText={shop_name.error}
                />
                <TextInput
                    label="Mô tả Shop"
                    returnKeyType="next"
                    value={shop_description.value}
                    onChangeText={text => setShop_description({ value: text, error: '' })}
                    error={!!shop_description.error}
                    errorText={shop_description.error}
                    autoCapitalize="none"
                />

                <CircleCheckBox
                    checked={false}
                    onToggle={(checked: any) => console.log('My state is: ', checked)}
                    labelPosition={LABEL_POSITION.RIGHT}
                    label="Đồng Ý Điều Khoản Dịch Vụ"
                />
                <TouchableOpacity>
                    <Button mode="contained" onPress={_onSignUpPressed} style={styles.button}>
                        Đăng Ký
                    </Button>
                </TouchableOpacity>
            </Background>
        </>

    );
};

const styles = StyleSheet.create({
    txtError: {
        color: '#f86161'
    },
    container: {
        position: 'absolute',
        top: 10 + getStatusBarHeight(),
        left: 1,
    },
    image: {
        width: 24,
        height: 24,
    },
    button: {
        marginTop: 24,
    },

});

