import React, { memo, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Background from '../../components/Background';
import Header from '../../components/Header';
import TextInput from '../../components/TextInput';
import CheckTemp from '../../components/CheckTemp';








export default function RegisterShop() {

    return (
        <Background>
            <Header>Create Account Dealer</Header>

            <TextInput
                label="Tên shop"
                returnKeyType="next"
            />
            <TextInput
                label="Mô tả Shop"
                returnKeyType="next"
            />
        </Background>

    );
};

const styles = StyleSheet.create({

});

