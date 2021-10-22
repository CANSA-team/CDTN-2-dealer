import React, { useState } from 'react'
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Keyboard,
} from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'

export default function PasswordInformation() {

    const [password, setPassword] = useState('')
    const [passwordValdate, setPasswordValdate] = useState(true)
    const [confirmPassword, setconfirmPassword] = useState('')
    const [confirmPasswordValdate, setconfirmPasswordValdate] = useState(true)

    const valiDate = (text: any, type: any) => {
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/
        if (type == 'password') {
            if (passwordRegex.test(text)) {
                setPassword(text)
                setPasswordValdate(true);
            }
            else {
                setPassword('')
                setPasswordValdate(false)
                console.log('Password chưa hợp lệ gồm 6 kí tự ,chữ cái hoa đầu')
            }
        }
        else if (type == 'confirmpassword'){
            if (password === text) {
              setconfirmPassword(text)
              setconfirmPasswordValdate(true);
            }
            else {
              setconfirmPassword('')
              setconfirmPasswordValdate(false); 
              console.log('Password chưa hợp lệ gồm 6 kí tự ,chữ cái hoa đầu')
            }
          }
    }


    const Divider = (props: any) => {
        return <View {...props}>
            <View style={styles.line}></View>
            <Text style={styles.textOR}>OR</Text>
            <View style={styles.line}></View>
        </View>
    }
    return (
        //Donot dismis Keyboard when click outside of TextInput
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
                <View style={styles.up}>
                    <Ionicons
                        name="ios-speedometer"
                        size={100}
                        color={'rgb(221, 97, 97)'}>
                    </Ionicons>
                    <Text style={styles.title}>
                        Change Password Information
                    </Text>
                </View>
                <View style={styles.down}>
                    <View style={styles.textInputContainer}>
                        <TextInput
                            style={styles.textInput}
                            placeholder="Current password"
                            secureTextEntry={true}
                        >
                        </TextInput>
                    </View>

                    <View style={styles.textInputContainer}>
                        <TextInput
                            style={[styles.textInput, !passwordValdate ? styles.error : null]}
                            onChangeText={(text) => valiDate(text, 'Password')}
                            placeholder="Import password new"
                            secureTextEntry={true}
                        >
                        </TextInput>
                    </View>
                    <View style={styles.textInputContainer}>
                        <TextInput
                            style={[styles.textInput, !confirmPasswordValdate ? styles.error : null]}
                            onChangeText={(text) => valiDate(text, 'confirmpassword')}
                            placeholder="Confirm password new"
                            secureTextEntry={true}
                        >
                        </TextInput>
                    </View>

                    <TouchableOpacity style={styles.retrievalButton}>
                        <Text style={styles.retrievalButtonTitle}>Continue</Text>
                    </TouchableOpacity>

                    <Divider style={styles.divider}></Divider>

                    <TouchableOpacity style={styles.forgotButton}>
                        <Text style={styles.navButtonText}>
                            Have an account? Sign In
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
        backgroundColor: '#33FF99'


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