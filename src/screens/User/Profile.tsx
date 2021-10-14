import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, Platform, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { Accessory, Avatar, Button } from 'react-native-elements';
import * as ImagePicker from 'expo-image-picker';
import moment from 'moment';
import COLORS from '../../consts/Colors';
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

export default function Profile(props: any) {
    const { navigate } = useNavigation();
    const { navigation, route } = props;
    const { getParam, goBack } = navigation;
    let [userProdfile, setUserProfile] = useState(new UserProfile());

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isLoadingChangePassword, setIsLoadingChangePassword] = useState<boolean>(true);

    const [image, setImage] = useState('https://i.ibb.co/hYjK44F/anise-aroma-art-bazaar-277253.jpg');


    useEffect(() => {
        (async () => {
            const _getUserProfile = getUserProfile();
            const _getUserInfor = getUserInfor();

            await Promise.all([_getUserProfile, _getUserInfor]).then(() => {
                setUserProfile(userProdfile);
                setIsLoading(true);
            })
        }
        )();
    }, [])

    const getUserProfile = async () => {
        await axios.get(`${cansa[1]}/api/user/get/profile`)
            .then(res => {
                userProdfile.phone = res.data.data.phone;
                userProdfile.birthday = res.data.data.birthday;
                userProdfile.name = res.data.data.name;;
            })
    }

    const getUserInfor = async () => {
        await axios.get(`${cansa[1]}/api/user/get/user`)
            .then(res => {
                userProdfile.user_key = res.data.data.user_key;
                userProdfile.user_name = res.data.data.user_name;
                userProdfile.user_avatar = res.data.data.user_avatar;
                userProdfile.user_status = res.data.data.user_status;
                userProdfile.user_last_update = res.data.data.user_last_update;
                axios.get(`${cansa[0]}/api/image/get/${res.data.data.user_avatar}/e4611a028c71342a5b083d2cbf59c494`).then(res => {
                    setImage(res.data.data);
                })
            })
    }

    return (
        <View style={styles.container}>
            {!isLoading ?
                (<View style={styles.container}>
                    <ActivityIndicator size="large" color="#00ff00" />
                </View>) : (
                    <View>
                        <View>
                            <HeaderTitle title={'PROFILE'} />
                            <View style={styles.header}>
                                <TouchableOpacity>
                                    <MaterialIcons name="arrow-back" size={35} color="white" onPress={() => navigation.goBack()} />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => navigate('EditProfile', { userProfile: userProdfile, avatar: image })}>
                                    <Feather name="edit" color="white" size={35} />
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
                                }} >
                            </Avatar>
                        </View>

                        <View style={styles.viewTxt}>
                            <View style={styles.txtContainer}>
                                <Text style={styles.txtTitle}>User full name: {userProdfile.name}</Text>
                            </View>

                            <View style={styles.txtContainer}>
                                <Text style={styles.txtTitle}>User nick name: {userProdfile.user_name}</Text>
                            </View>

                            <View style={styles.txtContainer}>
                                <Text style={styles.txtTitle}>User phone: {userProdfile.phone}</Text>
                            </View>

                            <View style={styles.txtContainer}>
                                <Text style={styles.txtTitle}>User birthday: {moment.utc(userProdfile.birthday).format('DD/MM/YYYY')}</Text>
                            </View>

                            <View style={styles.resetPassContainer}>
                                {
                                    isLoadingChangePassword &&
                                    <TouchableOpacity style={styles.touchReset}
                                        onPress={() => {
                                            setIsLoadingChangePassword(false);
                                            let email = getParam('email');
                                            axios.get(`${cansa[1]}/api/user/forgot/password/${email}`).then((res) => {
                                                Alert.alert('Thông Báo', res.data.message);
                                                navigate('OTPscreen', { email: email })
                                            })
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