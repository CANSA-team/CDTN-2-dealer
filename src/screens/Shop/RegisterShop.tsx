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

export default function RegisterShop() {
    const [image, setImage] = useState('../../../assets/arrow_back.png');
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
            <Header>Create Account Dealer</Header>

            <TextInput
                label="Tên shop"
                returnKeyType="next"
            />
            <TextInput
                label="Mô tả Shop"
                returnKeyType="next"
            />

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
                }} size={50}></Accessory>
            </Avatar>

            <CircleCheckBox
                checked={true}
                onToggle={(checked: any) => console.log('My state is: ', checked)}
                labelPosition={LABEL_POSITION.RIGHT}
                label="Đồng Ý Điều Khoản Dịch Vụ"
            />
            <Button mode="contained" style={styles.button}>
                Đăng Ký
            </Button>

        </Background>

    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 10 + getStatusBarHeight(),
        left: 10,
    },
    image: {
        width: 24,
        height: 24,
    },
    button: {
        flex: 1,
    }

});

