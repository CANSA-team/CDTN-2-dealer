import React, { memo, useState } from 'react';
import { View, TouchableOpacity, Image, Text, StyleSheet } from 'react-native';
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
} from '../../core/utils';
export default function RegisterShop() {
    const [shop_name, setShop_name] = useState({ value: '', error: '' });
    const [shop_description, setShop_description] = useState({ value: '', error: '' });
    const [image, setImage] = useState('../../../assets/arrow_back.png');

    const _onSignUpPressed = () => {
        const shop_nameError = shopNameValidator(shop_name.value);
        const shop_descriptionError = shopDescriptionValidator(shop_description.value);

        if (shop_nameError || shop_descriptionError) {
            setShop_name({ ...shop_name, error: shop_nameError });
            setShop_description({ ...shop_description, error: shop_descriptionError });
            return;
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
        <Background>
            <TouchableOpacity style={styles.container}>
                <Image source={require('../../../assets/arrow_back.png')} />
            </TouchableOpacity>
            <Header>Tạo Tài Khoản Bán Hàng</Header>
            <Avatar
                containerStyle={{ marginBottom: 20 }}
                rounded
                size={100}
                source={{
                    uri: image,
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
                checked={true}
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
    );
};

const styles = StyleSheet.create({
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

