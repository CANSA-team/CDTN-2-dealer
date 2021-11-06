import React, { memo, useState, useEffect } from 'react';
import { View, TouchableOpacity, Image, Text, StyleSheet, Alert, CheckBox } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Avatar, Accessory, Input } from 'react-native-elements';
import { getStatusBarHeight } from 'react-native-status-bar-height';
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
import HeaderTitle from '../../components/HeaderTitle';
import COLORS from '../../consts/Colors';


export default function RegisterShop() {
    const [isSelected, setSelection] = useState(false);
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
        }
    }, [register_status])

    useEffect(() => {
        if (Object.keys(info).length !== 0) {
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


    const onPress = () => {
        const shop_nameError = shopNameValidator(shop_name);
        const shop_descriptionError = shopDescriptionValidator(shop_description);

        if (shop_nameError || shop_descriptionError || image == '../../../assets/arrow_back.png') {
            console.log(75,shop_nameError, shop_descriptionError );

            return;
        } else {
            console.log(shop_name, shop_description, image);
            let _avatar: ImageId = { id: 0 };
            const avatar_img = {
                uri: image,
                name: 'userProfile.jpg',
                type: 'image/jpg'
            }
            const saveAvt: Promise<void> = saveImage(avatar_img, _avatar);
            Promise.all([saveAvt]).then(() => {
                dispatch(registerShop(shop_name, shop_description, userInfor.user_id, _avatar.id));
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
                            <MaterialIcons name="arrow-back" size={35} color="white" onPress={() => { return; }} />
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

                    <View style={styles.containerC}>
                        <View style={styles.checkboxContainer}>
                            <CheckBox
                                value={isSelected}
                                onValueChange={setSelection}
                                style={styles.checkbox}
                            />
                            <Text style={styles.label}>Đồng Ý Điều Khoản Sử Dụng? {isSelected ? "👍" : "👎"}</Text>
                        </View>
                    </View>

                    <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 25, marginBottom: 8 }}>
                        <TouchableOpacity onPress={() => onPress()}>
                            <Text style={styles.btnBuy}>Lưu</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({

    containerC: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      },
      checkboxContainer: {
        flexDirection: "row",
        marginBottom: 20,
      },
      checkbox: {
        alignSelf: "center",
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

