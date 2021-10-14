import React, { useState, useEffect } from 'react'
import { Image, Text, TouchableOpacity, View, ActivityIndicator, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-navigation'
import COLORS from '../consts/Colors'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '../utils/useNavigation';
import HeaderTitle from '../components/HeaderTitle';
import axios from 'axios';
import { cansa } from '../consts/Selector'

let user_avatar: any = undefined;
export default function Account() {
    const [checkLogin, setCheckLogin] = useState(false);
    const [phone, setPhone] = useState('')
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [nickName, setNickName] = useState('')
    const [birthday, setBirthday] = useState('')
    const [image, setImage] = useState('https://i.ibb.co/hYjK44F/anise-aroma-art-bazaar-277253.jpg');
    const { navigate } = useNavigation();
    const [isLoading, setisLoading] = useState(false)

    const onTapProfile = () => {
        navigate('Profile', { email: email })
    }
    const onTapOrdered = () => {
        navigate('Ordered')
    }
    const logout = () => {
        axios.get(`${cansa[1]}/api/user/logout`)
            .then(res => {
                navigate('homeStack');
                setCheckLogin(false)
            })
            .catch(error => console.log(error));
    }

    useEffect(() => {
        axios.get(`${cansa[1]}/api/user/check/login`)
            .then(res => {
                //Trạng thái khi đăng nhập thành công
                if (res.data.data == false) {
                    navigate('loginStack');
                } else {
                    navigate('homeStack');
                    setCheckLogin(true);
                    (async () => {
                        await axios.get(`${cansa[1]}/api/user/get/profile`)
                            .then(res => {
                                setPhone(res.data.data.phone)
                                setName(res.data.data.name)
                                setEmail(res.data.data.email)
                                axios.get(`${cansa[1]}/api/user/get/user`)
                                    .then(res => {
                                        setNickName(res.data.data.user_name)
                                        user_avatar = res.data.data.user_avatar;
                                        axios.get(`${cansa[0]}/api/image/get/${user_avatar}/e4611a028c71342a5b083d2cbf59c494`).then(res => {
                                            setImage(res.data.data);
                                            setisLoading(true)
                                        })
                                    })
                                    .catch(error => console.log(error));
                            })
                            .catch(error => console.log(error));

                    })();
                }
            })
            .catch(error => console.log(error));
    }, [checkLogin, isLoading])
    return isLoading ? (
        <SafeAreaView style={styles.container}>
            <HeaderTitle title={'ACCOUNT'} />

            <View style={styles.accountContainer}>
                <View>
                    <Image style={{ width: 100, height: 100, borderRadius: 50 }} source={{ uri: image }} />
                </View>
                <View style={styles.actionAccount}>
                    <Text style={styles.nameUser}>{name}</Text>
                    <Text style={[styles.nameUserNickName, { color: 'black' }]}>@{nickName}</Text>
                    <Text style={{ fontSize: 18, color: 'gray' }}>{email}</Text>
                </View>
            </View>

            <View style={styles.viewNav}>

                <View style={styles.viewAction}>
                    <TouchableOpacity onPress={onTapProfile} style={styles.actionTouch}>
                        <Text style={styles.actionTitle}>Tài khoản của tôi</Text>
                        <SimpleLineIcons name="arrow-right" size={20} color="#333" />
                    </TouchableOpacity>
                </View>

                <View style={styles.viewAction}>
                    <TouchableOpacity onPress={onTapOrdered} style={styles.actionTouch}>
                        <Text style={styles.actionTitle}>Đơn hàng của tôi</Text>
                        <SimpleLineIcons name="arrow-right" size={20} color="#333" />
                    </TouchableOpacity>
                </View>

                <View style={styles.viewAction}>
                    <TouchableOpacity style={styles.actionTouch}
                        onPress={() => logout()}>
                        <Text style={{ fontSize: 20, color: 'red' }}>Logout</Text>
                        <MaterialIcons name="exit-to-app" size={35} color='#ec2525' />
                    </TouchableOpacity>
                </View>


            </View>
        </SafeAreaView>
    ) :
        (<View style={[styles.container_login, styles.horizontal]}>
            <ActivityIndicator size="large" color="#FF6F61" />
        </View>)
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E5E5E5'
    },
    container_login: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'stretch',
        backgroundColor: '#33FF99'
    },
    accountContainer: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        padding: 20,
        borderBottomColor: '#ddd',
        borderBottomWidth: 1,
    },
    actionAccount: {
        marginLeft: 20,
        flexDirection: 'column',
        justifyContent: 'center',
        alignContent: 'flex-start'
    },
    nameUser: {
        fontSize: 24,
        fontWeight: 'bold'
    },
    nameUserNickName: {
        fontSize: 12,
        fontWeight: 'bold'
    },
    viewAction: {
        padding: 15,
        borderBottomColor: '#ccc',
        borderBottomWidth: 1
    },
    actionTouch: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    actionTitle: {
        fontSize: 20,
        color: '#333'
    },
    viewNav: {
        backgroundColor: 'white',
        paddingHorizontal: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,
        elevation: 7,
    }
});