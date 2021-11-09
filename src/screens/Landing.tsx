import React, { useEffect } from 'react'
import { View, Text, StyleSheet, Alert } from 'react-native';
import { checkLogin, getShopOwner, getUserInfo, ShopModel, ShopState, State, UserModel, UserStage } from '../redux';
import { useNavigation } from '../utils/useNavigation';
import COLORS from '../consts/Colors';

import { useDispatch, useSelector } from 'react-redux';
import { updateAccess } from '../redux/actions/accessActions';

export default function Lauding() {
    const accessState = useSelector((state: State) => state.accessReducer);
    const userState: UserStage = useSelector((state: State) => state.userReducer);
    const { check, userInfor }: { check: boolean, userInfor: UserModel } = userState;
    const shopSate: ShopState = useSelector((state: State) => state.shopReducer);
    const { info }: { info: ShopModel } = shopSate;
    const { message } = accessState;
    const { navigate } = useNavigation();
    const dispatch = useDispatch();

    useEffect(() => {

        dispatch(updateAccess());
    }, [])

    useEffect(() => {
        if (check) {
            if (Object.keys(info).length === 0) {
                navigate('homeStack');
            } else {
                Alert.alert('Thông báo', 'Tài khoản chưa đăng ký shop!', [
                    { text: "OK", onPress: () => navigate('registerShopStack') }
                ])
            }
        } else {
            navigate('loginStack')
        }
    }, [info, userInfor])

    useEffect(() => {
        if (!check && message) {
            navigate('loginStack')
        }
        else if (check && message) {
            dispatch(getUserInfo())
        }
    }, [check, message])

    useEffect(() => {
        if (message) {
            dispatch(checkLogin());
        }
    }, [accessState])

    useEffect(() => {
        if (userInfor) {
            dispatch(getShopOwner(userInfor.user_id));
        }
    }, [userInfor])

    return (
        <View style={styles.container}>
            <View style={{ flexDirection: 'column' }}>
                <Text style={{ fontWeight: 'bold', fontSize: 30 }}>Welcome to</Text>
                <Text style={{ fontWeight: 'bold', fontSize: 45, color: COLORS.primary }}>CANSA DEALER</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    deliveryIcon: {
        width: 120,
        height: 120,
    },
    titleContainer: {
        marginTop: 20,
    },
    title: {
        fontSize: 40,
        fontWeight: '700',
        color: '#7D7D7D'
    }
});
