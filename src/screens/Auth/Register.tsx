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


export default function Resgister() {
  const [name, setName] = useState('')
  const [nameValdate, setNameValdate] = useState(true)
  const [email, setEmail] = useState('')
  const [emailValdate, setEmailValdate] = useState(true)

  const [password, setPassword] = useState('')
  const [passwordValdate, setPasswordValdate] = useState(true)
  const [confirmPassword, setconfirmPassword] = useState('')
  const [confirmPasswordValdate, setconfirmPasswordValdate] = useState(true)


  const valiDate = (text: any, type: any) => {
    const nameRegex = /^[A-z]*$|^[A-z]+\s[A-z]*$/
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/
    if (type == 'name') {
      if (nameRegex.test(text)) {
        setName(text)
        setNameValdate(true)
      }
      else {
        setName('')
        setNameValdate(false)
        console.warn('FullName chưa hợp lệ , cần ghi đủ họ tên')
      }
    }
    else if (type == 'email') {
      if (emailRegex.test(text)) {
        setEmail(text)
        setEmailValdate(true)
      }
      else {
       setEmail('')
       setEmailValdate(false)
        console.warn('Email chưa hợp lệ example@gmail.com')
      }
    }
    else if (type == 'password'){
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
            Create an account
          </Text>
        </View>
        <View style={styles.down}>

          <View style={styles.textInputContainer}>
            <TextInput
              style={[styles.textInput, !nameValdate ? styles.error : null]}
              textContentType='nickname'
              autoCapitalize="sentences"
              returnKeyType="next"
              placeholder="Enter your name"
              maxLength={50}
              onChangeText={(text) => valiDate(text, 'name')}
            >
            </TextInput>
          </View>

          <View style={styles.textInputContainer}>
            <TextInput
              style={[styles.textInput, !emailValdate ? styles.error : null]}
              textContentType='emailAddress'
              keyboardType='email-address'
              placeholder="Enter your email"
              onChangeText={(text) => valiDate(text, 'email')}
            >
            </TextInput>
          </View>

          <View style={styles.textInputContainer}>
            <TextInput
              style={[styles.textInput, !passwordValdate ? styles.error : null]}
              placeholder="Enter your password"
              secureTextEntry={true}
              onChangeText={(text) => valiDate(text, 'password')}
            >
            </TextInput>
          </View>

          <View style={styles.textInputContainer}>
            <TextInput
              style={[styles.textInput, !confirmPasswordValdate ? styles.error : null]}
              placeholder="Confirm password"
              secureTextEntry={true}
              onChangeText={(text) => valiDate(text, 'confirmpassword')}
            >
            </TextInput>
          </View>


          <TouchableOpacity style={styles.registerButton}>
            <Text style={styles.registerButtonTitle}>Sign Up</Text>
          </TouchableOpacity>

          <Divider style={styles.divider}></Divider>
          <View style={{ marginBottom: 10 }}>
            <FontAwesome.Button
              style={styles.facebookButton}
              name="facebook"
              backgroundColor="#3b5998"
            >
              <Text style={styles.loginButtonTitle}>Sign up with Facebook</Text>
            </FontAwesome.Button>
          </View>
          <View>
            <FontAwesome.Button
              style={styles.googleButton}
              name="google"
              backgroundColor="#E54646"
            >
              <Text style={styles.loginButtonTitle}>Sign up with Google</Text>
            </FontAwesome.Button>

          </View>
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

  loginButtonTitle: {
    fontSize: 18,
    color: 'white'
  },
  registerButton: {
    width: 300,
    height: 45,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    backgroundColor: 'rgb(221, 97, 97)'
  },
  registerButtonTitle: {
    fontSize: 18,
    color: 'white'
  },
  facebookButton: {
    width: 300,
    height: 45,
    borderRadius: 6,
    justifyContent: 'center',

  },
  googleButton: {
    width: 300,
    height: 45,
    borderRadius: 6,
    justifyContent: 'center',


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