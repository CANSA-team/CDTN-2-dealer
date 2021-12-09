import React, { useRef, useState, useEffect } from 'react';
import { TextInput, View, TouchableOpacity, Text, StyleSheet, TouchableWithoutFeedback, Keyboard, Alert, Image } from 'react-native';
import axios from 'axios'
import { useNavigation } from '../../utils/useNavigation'
import { cansa } from '../../consts/Selector'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import COLORS from '../../consts/Colors';

export default function OTPscreen(props: any) {
    const { navigate } = useNavigation();
    const { navigation } = props;
    const { getParam } = navigation;
    const [pinText1, setpinText1] = useState<string>('');
    const [pinText2, setpinText2] = useState<string>('');
    const [pinText3, setpinText3] = useState<string>('');
    const [pinText4, setpinText4] = useState<string>('');
    const [pinText5, setpinText5] = useState<string>('');
    const [pinText6, setpinText6] = useState<string>('');
    const [isSend, setIsSend] = useState<boolean>(false)
    const [isResend, setIsResend] = useState<boolean>(false);
    const pinInputRef1 = useRef<TextInput>();
    const pinInputRef2 = useRef<TextInput>();
    const pinInputRef3 = useRef<TextInput>();
    const pinInputRef4 = useRef<TextInput>();
    const pinInputRef5 = useRef<TextInput>();
    const pinInputRef6 = useRef<TextInput>();


    const updatePinText1 = (pinText1: string) => {
        setpinText1(pinText1);
        if (pinText1 != "") {
            pinInputRef2.current?.focus()
        }
    };
    const updatePinText2 = (pinText2: string) => {
        setpinText2(pinText2);
        if (pinText2 != "") {
            pinInputRef3.current?.focus()
        } else if (pinText2 == "") {
            pinInputRef1.current?.focus()
        }
    };

    const updatePinText3 = (pinText3: string) => {
        setpinText3(pinText3);
        if (pinText3 != "") {
            pinInputRef4.current?.focus()
        } else if (pinText3 == "") {
            pinInputRef2.current?.focus()
        }
    };

    const updatePinText4 = (pinText4: string) => {
        setpinText4(pinText4);
        if (pinText4 != "") {
            pinInputRef5.current?.focus()
        } else if (pinText4 == "") {
            pinInputRef3.current?.focus()
        }
    };

    const updatePinText5 = (pinText5: string) => {
        setpinText5(pinText5);
        if (pinText5 != "") {
            pinInputRef6.current?.focus()
        } else if (pinText5 == "") {
            pinInputRef4.current?.focus()
        }
    };

    const updatePinText6 = (pinText6: string) => {
        setpinText6(pinText6);
        if (pinText6 == "") {
            pinInputRef5.current?.focus()
        }
    };

    //Hàm continue
    const continueBtn = () => {
        if (pinText1 && pinText2 && pinText3 && pinText4 && pinText5 && pinText6) {
            let codePin = `${pinText1}${pinText2}${pinText3}${pinText4}${pinText5}${pinText6}`;
            let email = getParam('email')
            axios.get(`${cansa[1]}/api/user/forgot/password/checkPin/${email}/${codePin}`).then((res) => {
                if (res.data.data) {
                    Alert.alert('Thông Báo', res.data.message);
                    navigate('ChangePassword', { email: email })

                } else {
                    Alert.alert('Thông Báo', res.data.message);
                }
            })

        } else {
            Alert.alert('Thông báo', "Vui lòng không để trống ô nào!!")
        }
    }

    // Time out
    const [time, setTime] = useState(60);
    useEffect(() => {
        if (time) {
            setTimeout(() => {
                !isResend ? setTime(time - 1) : setTime(0);
            }, 1000);
        }
    }, [time]);

    useEffect(() => {
        setTime(time);
    }, []);

    const reSend = () => {
        setIsResend(true);
        let email = getParam('email')
        if (email != '') {
            axios.get(`${cansa[1]}/api/user/forgot/password/${email}`).then((res) => {
                setIsResend(false);
                setTime(60)
                Alert.alert('Thông Báo', res.data.message);
            })
        } else {
            Alert.alert('Thông báo', 'Email không được để trống!!')
            setIsResend(false);
        }
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            {
                (isResend || isSend) ?
                    <View style={styles.container}>
                        <View style={styles.header}>
                            <TouchableOpacity onPress={() => navigation.goBack()}>
                                <MaterialIcons style={styles.headerIcon} name="arrow-back" size={30} color="black" />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.up}>
                            <Image style={{ width: 100, height: 100 }} source={require('../../../assets/icon.png')} />
                            <Text style={styles.title}>
                                Mã Xác Minh
                            </Text>
                            <Text style={{ color: '#111', fontSize: 15, marginTop: 10 }}>
                                {isResend ? 'Chúng tôi đang gửi lại mã OTP qua Email của bạn ...' : 'Chúng tôi đang kiểm tra mã OTP bạn nhập ...'}
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
                            <Image style={{ width: 100, height: 100 }} source={require('../../../assets/icon.png')} />
                            <Text style={styles.title}>
                                Mã Xác Minh
                            </Text>
                            <Text style={{ color: '#111', fontSize: 15, marginTop: 10 }}>
                                Nhập mã OTP của bạn được gửi qua Email
                            </Text>
                        </View>
                        <View style={styles.down}>
                            <View style={styles.containerInput}>
                                <TextInput
                                    onChangeText={updatePinText1}
                                    value={pinText1}
                                    ref={pinInputRef1}
                                    maxLength={1}
                                    keyboardType='numeric'
                                    style={{
                                        marginRight: 5, marginLeft: 5,
                                        fontWeight: '600', alignSelf: 'center', padding: 15, fontSize: 20, height: 55,
                                        width: '13%', borderColor: 'grey', borderBottomWidth: 1.5, justifyContent: 'center', alignItems: 'center'
                                    }} />
                                <TextInput
                                    onChangeText={updatePinText2}
                                    value={pinText2}
                                    ref={pinInputRef2}
                                    maxLength={1}
                                    keyboardType='numeric'
                                    style={{
                                        marginRight: 5, marginLeft: 5,
                                        fontWeight: '600', alignSelf: 'center', padding: 15, fontSize: 20, height: 55,
                                        width: '13%', borderColor: 'grey', borderBottomWidth: 1.5, justifyContent: 'center', alignItems: 'center'
                                    }} />
                                <TextInput
                                    onChangeText={updatePinText3}
                                    value={pinText3}
                                    ref={pinInputRef3}
                                    maxLength={1}
                                    keyboardType='numeric'
                                    style={{
                                        marginRight: 5, marginLeft: 5,
                                        fontWeight: '600', alignSelf: 'center', padding: 15, fontSize: 20, height: 55,
                                        width: '13%', borderColor: 'grey', borderBottomWidth: 1.5, justifyContent: 'center', alignItems: 'center'
                                    }} />
                                <TextInput
                                    onChangeText={updatePinText4}
                                    value={pinText4}
                                    ref={pinInputRef4}
                                    maxLength={1}
                                    keyboardType='numeric'
                                    style={{
                                        marginRight: 5, marginLeft: 5,
                                        fontWeight: '600', alignSelf: 'center', padding: 15, fontSize: 20, height: 55,
                                        width: '13%', borderColor: 'grey', borderBottomWidth: 1.5, justifyContent: 'center', alignItems: 'center'
                                    }} />
                                <TextInput
                                    onChangeText={updatePinText5}
                                    value={pinText5}
                                    ref={pinInputRef5}
                                    maxLength={1}
                                    keyboardType='numeric'
                                    style={{
                                        marginRight: 5, marginLeft: 5,
                                        fontWeight: '600', alignSelf: 'center', padding: 15, fontSize: 20, height: 55,
                                        width: '13%', borderColor: 'grey', borderBottomWidth: 1.5, justifyContent: 'center', alignItems: 'center'
                                    }} />
                                <TextInput
                                    onChangeText={updatePinText6}
                                    value={pinText6}
                                    ref={pinInputRef6}
                                    maxLength={1}
                                    keyboardType='numeric'
                                    style={{
                                        marginRight: 5, marginLeft: 5,
                                        fontWeight: '600', alignSelf: 'center', padding: 15, fontSize: 20, height: 55,
                                        width: '13%', borderColor: 'grey', borderBottomWidth: 1.5, justifyContent: 'center', alignItems: 'center'
                                    }} />
                            </View>

                            <TouchableOpacity style={styles.forgotButton1}>
                                <Text style={styles.navButtonText1}>
                                    Gửi lại mã OTP trong: {time}
                                </Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.loginButton}
                                onPress={continueBtn}
                            >
                                <Text style={styles.loginButtonTitle}>Xác nhận</Text>
                            </TouchableOpacity>

                            {
                                !isResend ?
                                    <TouchableOpacity style={styles.forgotButton}
                                        onPress={reSend}
                                    >
                                        <Text style={styles.navButtonText}>
                                            Gửi lại OTP
                                        </Text>
                                    </TouchableOpacity> :
                                    <TouchableOpacity style={styles.forgotButton}
                                    >
                                        <Text style={styles.navButtonText}>
                                            Gửi lại OTP
                                        </Text>
                                    </TouchableOpacity>
                            }
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
    up: {
        marginTop: 80,
        flex: 3,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        color: 'rgb(255,119,34)',
        textAlign: 'center',
        width: 400,
        fontSize: 30
    },
    down: {
        flex: 7,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    forgotButton: {
        width: 120,
        height: 40,
        borderRadius: 6,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#3366CC',
    },
    navButtonText: {
        fontSize: 18,
        color: 'white',
    },
    loginButton: {
        width: 300,
        height: 45,
        borderRadius: 6,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.primary,
        marginBottom: 10,
        marginTop: 10
    },
    loginButtonTitle: {
        fontSize: 18,
        color: 'white'

    },
    forgotButton1: {

    },
    navButtonText1: {
        fontSize: 15,

    },
    containerInput: {
        flex: 0.4,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },
})

