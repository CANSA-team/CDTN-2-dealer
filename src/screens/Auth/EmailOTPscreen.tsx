import React, { useState } from 'react'
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Alert,
    Keyboard,
    Image,
} from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { useNavigation } from '../../utils/useNavigation'
import axios from 'axios'
import { cansa } from '../../consts/Selector'
import { textAlign } from 'styled-system'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export default function EmailOTPscreen(props: any) {
    const [isSend, setIsSend] = useState<boolean>(false)
    const { navigate } = useNavigation();
    const [emailValdate, setEmailValdate] = useState(true)
    const [email, setEmail] = useState('')
    const { navigation } = props;
    const { getParam } = navigation;
    const valiDate = (text: any, type: any) => {
        const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
        if (type == 'email') {
            if (emailRegex.test(text)) {
                setEmailValdate(true)
                setEmail(text)
            }
            else {
                setEmailValdate(false)
            }
        }
    }

    const continueBtn = () => {
        setIsSend(true);
        if (email != '') {
            axios.get(`${cansa[1]}/api/user/forgot/password/${email}`).then((res) => {
                Alert.alert('Thông Báo', res.data.message);
                setIsSend(false);
                navigate('OTPscreen', { email: email })
            })
        } else {
            setIsSend(false);
            Alert.alert('Thông báo', 'Email không được để trống!!')
        }
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            {
                isSend ?
                    <View style={styles.container}>
                        <View style={styles.header}>
                            <TouchableOpacity onPress={() => navigation.goBack()}>
                                <MaterialIcons style={styles.headerIcon} name="arrow-back" size={30} color="black" />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.up}>
                            <Image style={{ width: 150, height: 150 }} source={require('../../../assets/icon.png')} />

                            <Text style={styles.title}>
                                Gửi mã OTP qua E-mail
                            </Text>
                            <Text style={{ color: '#111', fontSize: 15, marginTop: 10, textAlign: 'center' }}>
                                Chúng tôi đang gửi mã 6 chữ số đến email của bạn để xác minh ...
                            </Text>
                        </View>
                    </View>
                    :
                    <View style={styles.container}>
                        <View style={styles.header}>
                            <TouchableOpacity onPress={() => navigation.goBack()}>
                                <MaterialIcons style={styles.headerIcon} name="arrow-back" size={30} color="black" />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.up}>
                            <Image style={{ width: 150, height: 150 }} source={require('../../../assets/icon.png')} />

                            <Text style={styles.title}>
                                Gửi mã OTP qua E-mail
                            </Text>
                            <Text style={{ color: '#111', fontSize: 15, marginTop: 10, textAlign: 'center' }}>
                                Chúng tôi sẽ gửi mã 6 chữ số đến email của bạn để xác minh
                            </Text>
                        </View>
                        <View style={styles.down}>
                            <View style={styles.textInputContainer}>

                                <Text style={{ fontSize: 18, marginRight: 285, color: 'rgb(221, 97, 97)' }}>Email: </Text>
                                <TextInput
                                    style={[styles.textInput, !emailValdate ? styles.error : null]}
                                    onChangeText={(text) => valiDate(text, 'email')}
                                    textContentType='emailAddress'
                                    keyboardType={'email-address'}
                                    placeholder="Nhập E-mail"
                                >
                                </TextInput>

                            </View>
                            <TouchableOpacity style={styles.loginButton}
                                onPress={continueBtn}
                            >
                                <Text style={styles.loginButtonTitle}>Xác nhận</Text>
                            </TouchableOpacity>

                        </View>
                    </View>
            }
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
    up: {
        flex: 4,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    down: {
        flex: 6,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center'
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
    headerIcon: {

        borderRadius: 50,
        padding: 5
    },
    textInputContainer: {
        width: '100%',
        height: '30%',
        justifyContent: 'center',
        alignSelf: 'center',
        alignContent: 'center',
        alignItems: 'center'
    },
    textInput: {
        width: '80%',
        height: 45,
        borderBottomWidth: 1

    },
    title: {
        color: 'rgb(255,119,34)',
        textAlign: 'center',
        width: 400,
        fontSize: 30
    },
    loginButton: {
        width: 300,
        height: 45,
        borderRadius: 6,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgb(221, 97, 97)'
    },
    loginButtonTitle: {
        fontSize: 18,
        color: 'white'

    },
    iconEmail: {
        position: 'absolute',
        top: 75,
        left: 30
    },
    error: {
        borderColor: 'red',
        borderWidth: 1
    }

})