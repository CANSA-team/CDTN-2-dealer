import React, { useState } from 'react'
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Keyboard,
    Alert,
} from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import axios from 'axios'
import { useNavigation } from '../../utils/useNavigation'
import { cansa } from '../../consts/Selector'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';


export default function ChangePassword(props: any) {
    const { navigate } = useNavigation();
    const [password, setPassword] = useState('')
    const [passwordValdate, setPasswordValdate] = useState(true)
    const { navigation } = props;
    const { getParam } = navigation;
    const valiDate = (text: any, type: any) => {
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/
        if (type == 'password') {
            if (passwordRegex.test(text)) {
                setPassword(text)
                setPasswordValdate(true)
            }
            else {
                setPasswordValdate(false)
            }
        }
    }
    const changePasswordBtn = () => {
        let email = getParam('email')
        if (password) {
            axios.get(`${cansa[1]}/api/user/forgot/password/center/${email}/${password}`).then((res) => {
                if (res.data.data) {
                    Alert.alert('Thông Báo', res.data.message);
                    navigate('Login')
                } else {
                    Alert.alert('Thông Báo', res.data.message);
                }
            })
        } else {
            Alert.alert('Thông báo', 'Email không giống nhau hoặc không đúng định dạng!!')

        }

    }
    const Divider = (props: any) => {
        return <View {...props}>
            <View style={styles.line}></View>
            <Text style={styles.textOR}>HOẶC</Text>
            <View style={styles.line}></View>
        </View>
    }
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <MaterialIcons style={{ color: '#000' }} name="arrow-back" size={35} color="white" />
                    </TouchableOpacity>
                </View>
                <View style={styles.up}>
                    <Ionicons
                        name="ios-speedometer"
                        size={100}
                        color={'rgb(221, 97, 97)'}>
                    </Ionicons>
                    <Text style={styles.title}>
                        Lấy Lại Mật Khẩu
                    </Text>
                </View>
                <View style={styles.down}>
                    <View style={styles.textInputContainer}>
                        <TextInput
                            style={[styles.textInput, !passwordValdate ? styles.error : null]}
                            onChangeText={(text) => valiDate(text, 'password')}
                            placeholder="Nhập mật khẩu mới"
                            secureTextEntry={true}
                        >
                        </TextInput>
                    </View>
                    <View style={styles.textInputContainer}>
                        <TextInput
                            style={[styles.textInput, !passwordValdate ? styles.error : null]}
                            onChangeText={(text) => valiDate(text, 'password')}
                            placeholder="Nhập lại mật khẩu"
                            secureTextEntry={true}
                        >
                        </TextInput>
                    </View>

                    <TouchableOpacity style={styles.retrievalButton}
                        onPress={changePasswordBtn}
                    >
                        <Text style={styles.retrievalButtonTitle}>Xác nhận</Text>
                    </TouchableOpacity>

                    <Divider style={styles.divider}></Divider>

                    <TouchableOpacity style={styles.forgotButton}>
                        <Text style={styles.navButtonText}>
                            Bạn đã có tài khoản? Đăng Nhập
                        </Text>
                    </TouchableOpacity>

                </View>
            </View>
        </TouchableWithoutFeedback>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'stretch',
        backgroundColor: '#fff'


    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 5,
        position: 'absolute',
        top: 34,
        left: 5,
        right: 0,
        zIndex: 2
    },
    up: {
        flex: 3,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    down: {
        flex: 7,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    title: {
        color: 'rgb(255,119,34)',
        textAlign: 'center',
        width: 400,
        fontSize: 23
    },
    textInputContainer: {
        paddingHorizontal: 10,
        borderRadius: 6,
        marginBottom: 20,
        backgroundColor: 'rgba(255,255,255,0.2)'
    },
    textInput: {
        width: 280,
        height: 45
    },
    retrievalButton: {
        width: 300,
        height: 45,
        borderRadius: 6,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        backgroundColor: 'rgb(221, 97, 97)'
    },
    retrievalButtonTitle: {
        fontSize: 18,
        color: 'white'
    },
    line: {
        height: 1,
        flex: 2,
        backgroundColor: 'black'
    },
    textOR: {
        flex: 1,
        textAlign: 'center'
    },
    divider: {
        flexDirection: 'row',
        height: 40,
        width: 298,
        justifyContent: 'center',
        alignItems: 'center'
    },
    forgotButton: {

    },
    navButtonText: {
        marginTop: 10,
        textAlign: 'center',
        fontSize: 15,
        color: '#3b5998'

    },
    error: {
        borderColor: 'red',
        borderWidth: 1
    }
})