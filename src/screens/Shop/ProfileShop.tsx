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

let user_temp = {
    "id": 1,
    "phone": "0968241064",
    "name": "anh",
    "birthday": "1999-09-28T17:00:00.000Z"
}

class UserProfile {
    id?: number;
    phone?: string;
    name?: string;
    birthday?: Date;
    user_id?: number;
    user_key?: null;
    user_name?: string;
    user_avatar?: string;
    user_status?: number;
    user_last_update?: number;
}

export default function ProfileShop(props: any) {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [image, setImage] = useState('https://i.ibb.co/hYjK44F/anise-aroma-art-bazaar-277253.jpg');
    const [isLoadingChangePassword, setIsLoadingChangePassword] = useState<boolean>(true);



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
                                    <MaterialIcons name="arrow-back" size={35} color="white" onPress={() => {return;}} />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => {return;}}>
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
                                    uri: image,
                                }} >
                            </Avatar>
                        </View>
                        <View style={styles.viewTxt}>
                            <View style={styles.txtContainer}>
                                <Text style={styles.txtTitle}>Tên Shop: </Text>
                            </View>

                            <View style={styles.txtContainer}>
                                <Text style={styles.txtTitle}>Mô tả:</Text>
                            </View>
                            <View style={styles.resetPassContainer}>
                                {
                                    isLoadingChangePassword &&
                                    <TouchableOpacity style={styles.touchReset}
                                        onPress={() => {
                                            // setIsLoadingChangePassword(false);
                                            // let email = getParam('email');
                                            // axios.get(`${cansa[1]}/api/user/forgot/password/${email}`).then((res) => {
                                            //     Alert.alert('Thông Báo', res.data.message);
                                            //     navigate('OTPscreen', { email: email })
                                            // })
                                            return;
                                        }}>
                                        <Text style={{ fontSize: 20, color: '#555' }}>Đổi mật khẩu</Text>
                                        <MaterialIcons name="arrow-right-alt" size={35} color="#555" />
                                    </TouchableOpacity>
                                }

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