import React, { memo, useState } from 'react';
import { View, TouchableOpacity, Image, Text, StyleSheet } from 'react-native';
import Background from '../../components/Background';
import Header from '../../components/Header';
import TextInput from '../../components/TextInput';
import Button from '../../components/Button';
import { getStatusBarHeight } from 'react-native-status-bar-height';






export default function RegisterShop() {

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
});

