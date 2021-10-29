import React, { useEffect, useState } from 'react'
import { View, StyleSheet, Platform, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { Button, Text, Input, Avatar, Accessory } from 'react-native-elements';

import DateTimePicker from '@react-native-community/datetimepicker';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import { useNavigation } from '../../utils/useNavigation';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import HeaderTitle from '../../components/HeaderTitle';
import axios from 'axios';
import * as ImagePicker from 'expo-image-picker';
import { cansa } from '../../consts/Selector';
import {  margin, marginBottom } from 'styled-system';
import COLORS from '../../consts/Colors';

let user_temp = {
    "id": 1,
    "phone": "0968241064",
    "name": "anh",
    "birthday": "1999-09-28T17:00:00.000Z"
}

export default function EditProfileShop(props: any) {
    const [date, setDate] = useState(new Date());
    const [show, setShow] = useState(false);
    const [name, setName] = useState('Ten Shop');
    const [description, setDescription] = useState('Mo ta');
    const [image, setImage] = useState('https://i.ibb.co/hYjK44F/anise-aroma-art-bazaar-277253.jpg');

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
                    <HeaderTitle title={'EDIT PROFILE SHOP'} />
                    <View style={styles.header}>
                        <TouchableOpacity>
                            <MaterialIcons name="arrow-back" size={35} color="white" onPress={() => {return;}} />
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
                        value={name}
                        label="Tên Shop"
                        onChangeText={setName}
                    />

                    <Input
                        value={description}
                        label="Mô tả"
                        onChangeText={setDescription}
                    />

                    <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 25, marginBottom: 8 }}>
                        <TouchableOpacity onPress={() => {
                            {return;}
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