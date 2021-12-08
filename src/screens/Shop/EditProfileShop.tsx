import React, { useEffect, useState } from 'react'
import { View, StyleSheet, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { Text, Input, Avatar, Accessory } from 'react-native-elements';
import { useNavigation } from '../../utils/useNavigation';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import HeaderTitle from '../../components/HeaderTitle';
import * as ImagePicker from 'expo-image-picker';
import { updateImage } from '../../consts/Selector';
import COLORS from '../../consts/Colors';
import { ImageId, ShopModel, ShopState, State, updateShop } from '../../redux';
import { useDispatch, useSelector } from 'react-redux';

import {
    shopNameValidator,
    shopDescriptionValidator,
} from '../../core/utils';

export default function EditProfileShop(props: any) {
    const shopsState: ShopState = useSelector((state: State) => state.shopReducer);
    const { info }: { info: ShopModel } = shopsState;
    const [loading, setLoading] = useState(false);

    const [name, setName] = useState(info.shop_name);
    const [description, setDescription] = useState(info.shop_description);
    const [image, setImage] = useState(info.shop_avatar);
    const dispatch = useDispatch();
    const { navigate } = useNavigation();
    const { navigation } = props;

    useEffect(() => {

        if (Object.keys(info).length !== 0 && loading) {
            setLoading(false);
            navigate('ProfileShop')
        }
    }, [info])


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
    const xacMinh = () => {
        setLoading(true);
        let _avatar: ImageId = { id: info.shop_avatar_id };
        let saveAvt: Promise<void>;
        if (image !== info.shop_avatar) {
            const avatar_img = {
                uri: image,
                name: 'userProfile.jpg',
                type: 'image/jpg'
            }
            saveAvt = updateImage(avatar_img, info.shop_avatar_id, _avatar);
        } else {
            saveAvt = new Promise((resolve, reject) => resolve());
        }
        Promise.all([saveAvt]).then(() => {
            dispatch(updateShop(name, description, info.shop_id, _avatar.id, info.last_update));
        })
    }

    const save = () => {
        const shop_nameError = shopNameValidator(name);
        const shop_descriptionError = shopDescriptionValidator(description);

        if (shop_nameError || shop_descriptionError) {

            Alert.alert('Thông báo', shop_nameError + shop_descriptionError)
            return;
        } else {


            Alert.alert('Thông báo', 'Xác nhận thay đổi', [
                { text: "Huỷ", onPress: () => navigation.goBack() },
                { text: "Xác nhận", onPress: () => xacMinh() }
            ])

        }

    }

    return (
        <View style={styles.container}>
            <View>
                <View>
                    <HeaderTitle title={'Sửa thông tin'} />
                    <View style={styles.header}>
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <MaterialIcons name="arrow-back" size={35} color="white" />
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
                    >
                        <Accessory
                            onPress={getImg}
                            style={{
                                borderWidth: 2,
                                borderColor: "#444",
                                backgroundColor: COLORS.primary
                            }} size={50}></Accessory>
                    </Avatar>
                </View>

                <View style={styles.viewTxt}>
                    <Input
                        value={name}
                        label="Tên Shop"
                        onChangeText={setName}
                    />

                    <Input
                        value={description}
                        label="Mô tả"
                        onChangeText={setDescription}
                    />
                    <ActivityIndicator
                        animating={loading}
                    />

                    <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 25, marginBottom: 8 }}>
                        <TouchableOpacity onPress={() => {
                            save()
                        }}>
                            <Text style={styles.btnBuy}>Lưu</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
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