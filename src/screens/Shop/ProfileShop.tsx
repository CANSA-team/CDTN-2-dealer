import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Avatar } from 'react-native-elements';
import HeaderTitle from '../../components/HeaderTitle';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import { useNavigation } from '../../utils/useNavigation';
import { useSelector } from 'react-redux';
import { ShopModel } from '../../redux';
import { ShopState, State } from '../../redux';
import axios from 'axios';
import { cansa } from '../../consts/Selector';

export default function ProfileShop(props: any) {
    const { navigate } = useNavigation();
    const shopsState: ShopState = useSelector((state: State) => state.shopReducer);
    const { info }: { info: ShopModel } = shopsState;
    const { navigation } = props;
    const { getParam } = navigation;

    const onTapEditProfile = () => {
        navigate('EditProfileShop');
    }

    return (
        <View style={styles.container}>
                <View>
                    <HeaderTitle title={'Thông tin shop'} />
                    <View style={styles.header}>
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <MaterialIcons name="arrow-back" size={35} color="white" />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={onTapEditProfile}>
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
                            uri: info.shop_avatar,
                        }} >
                    </Avatar>
                </View>
                <View style={styles.viewTxt}>
                    <View style={styles.txtContainer}>
                        <Text style={styles.txtTitle}>Tên Shop: {info.shop_name}</Text>
                    </View>

                    <View style={styles.txtContainer}>
                        <Text style={styles.txtTitle}>Mô tả: {info.shop_description}</Text>
                    </View>
                    <View style={styles.resetPassContainer}>
                        <TouchableOpacity style={styles.touchReset}
                            onPress={() => {
                                let email = getParam('email');
                                axios.get(`${cansa[1]}/api/user/forgot/password/${email}`).then((res) => {
                                    Alert.alert('Thông Báo', res.data.message);
                                    navigate('OTPscreen', { email: email })
                                })
                            }}>
                            <Text style={{ fontSize: 20, color: '#555' }}>Đổi mật khẩu</Text>
                            <MaterialIcons name="arrow-right-alt" size={35} color="#555" />
                        </TouchableOpacity>
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