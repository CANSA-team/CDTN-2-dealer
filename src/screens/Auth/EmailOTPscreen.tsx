import React, { Component, useState } from 'react'
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Alert,
    Keyboard,
} from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { useNavigation } from '../../utils/useNavigation'
import axios from 'axios'
import { cansa } from '../../consts/Selector'

export default function EmailOTPscreen() {

    const { navigate } = useNavigation();
    const [emailValdate, setEmailValdate] = useState(true)
    const [email, setEmail] = useState('')
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
        if (email != '') {
            axios.get(`${cansa[1]}/api/user/forgot/password/${email}`).then((res)=>{
                Alert.alert('Thông Báo',res.data.message);
                navigate('OTPscreen',{email:email})
            }) 
        } else {
            Alert.alert('Thông báo', 'Email không được để trống!!')
        }
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
                <View style={styles.up}>
                    <Ionicons
                        name="ios-speedometer"
                        size={100}
                        color={'rgb(221, 97, 97)'}>
                    </Ionicons>
                    <Text style={styles.title}>
                        Email OTP Code
                    </Text>
                    <Text style={{ color: 'rgb(221, 97, 97)', fontSize: 15, marginTop: 10 }}>
                        We will send 4 digits code to your email for the verifiction
                    </Text>
                </View>
                <View style={styles.down}>
                    <View style={styles.textInputContainer}>

                        <Text style={{ fontSize: 18, marginRight: 285, color: 'rgb(221, 97, 97)' }}>Email:</Text>
                        <TextInput
                            style={[styles.textInput, !emailValdate ? styles.error : null]}
                            onChangeText={(text) => valiDate(text, 'email')}
                            textContentType='emailAddress'
                            keyboardType={'email-address'}
                            placeholder="Enter your email !"
                        >
                        </TextInput>

                    </View>
                    <TouchableOpacity style={styles.loginButton}
                        onPress={continueBtn}
                    >
                        <Text style={styles.loginButtonTitle}>Continue</Text>
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
        backgroundColor: '#33FF99'
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