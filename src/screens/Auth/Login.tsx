import React, { Component, useState, useEffect } from 'react'
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  ActivityIndicator,
  Alert,
} from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import axios from 'axios'
import { useNavigation } from '../../utils/useNavigation'
import { cansa } from '../../consts/Selector'
import * as Facebook from 'expo-facebook';
import { useDispatch, useSelector } from 'react-redux'
import { ShopModel, ShopState, State, UserModel, UserStage } from '../../redux'
import { checkLogin, login, logout, getUserInfo, LoginFacebook } from '../../redux/actions/userActions'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { getShopOwner } from '../../redux/actions/shopActions'



export default function Login(props: any) {
  const { navigate } = useNavigation();
  const [email, setEmail] = useState('')
  const [emailValdate, setEmailValdate] = useState(true)
  const [password, setPassword] = useState('')
  const [passwordValdate, setPasswordValdate] = useState(true)
  const [isLoading, setisLoading] = useState(true)
  const userState: UserStage = useSelector((state: State) => state.userReducer);
  const shopSate: ShopState = useSelector((state: State) => state.shopReducer);
  const { info }: { info: ShopModel } = shopSate;
  const { check, status, userInfor }: { check: boolean, status: string, userInfor: UserModel } = userState;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkLogin());
  }, [status])


  useEffect(() => {
    if (check) {
      dispatch(getUserInfo())
    }
  }, [check])

  useEffect(() => {
    if (Object.keys(userInfor).length !== 0) {
      dispatch(getShopOwner(userInfor.user_id));
    }
  }, [userInfor])

  useEffect(() => {
    if (check) {
      if (Object.keys(info).length !== 0) {
        navigate('homeStack');
      } else if (Object.keys(info).length === 0) {
        //chuyển đến màn hình đăng ký shop
        //------------------------------------------------------------------------------
        Alert.alert('Thông báo', 'Tài khoản chưa đăng ký shop!', [
          { text: "OK", onPress: () => navigate('registerShopStack') }
        ])
        //------------------------------------------------------------------------------
      }
    }
  }, [info])

  const loginBtn = () => {
    if (email != '' && password != '') {
      dispatch(login(email, password));
    } else {
      Alert.alert('Thông báo', 'Email hoặc password không hợp lệ!!')
    }
  }

  const logInFB = async () => {
    try {
      await Facebook.initializeAsync({
        appId: '994248931143640',
      });
      const {
        type,
        token,
        expirationDate,
        permissions,
        declinedPermissions,
      }: any = await Facebook.logInWithReadPermissionsAsync({
        permissions: ['public_profile', 'email'],
      });
      if (type === 'success') {
        // Get the user's name using Facebook's Graph API
        const response = await fetch(`https://graph.facebook.com/me?access_token=${token}&fields=id,name,email,picture.height(500)`);
        //Alert.alert('Logged in!', `Hi ${(await response.json()).name}!`);
        var infomation = await response.json();
        dispatch(LoginFacebook(infomation.email, token, infomation.id, infomation.name))
      } else {
        // type === 'cancel'
      }
    } catch ({ message }) {
      alert(`Facebook Login Error: ${message}`);
    }
  }

  const valiDate = (text: any, type: any) => {
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/
    if (type == 'email') {
      if (emailRegex.test(text)) {
        setEmail(text)
        setEmailValdate(true);
      }
      else {
        setEmail('')
        setEmailValdate(false)
      }
    }
    else if (type == 'password') {
      if (passwordRegex.test(text)) {
        setPassword(text)
        setPasswordValdate(true);
      }
      else {
        setPassword('')
        setPasswordValdate(false)
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
    <TouchableWithoutFeedback onPress={() => loginBtn()}>
      <View style={styles.container}>
        <View style={styles.up}>
          <Ionicons
            name="ios-speedometer"
            size={100}
            color={'rgb(221, 97, 97)'}>
          </Ionicons>
          <Text style={styles.title}>
            Account Information
          </Text>
        </View>

        <View style={styles.down}>
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



          <TouchableOpacity style={styles.loginButton}
            onPress={() => loginBtn()}
          >
            <Text style={styles.loginButtonTitle}>Sign In</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.forgotButton}
            onPress={() => { navigate('EmailOTPscreen') }}
          >
            <Text style={styles.navButtonText}>
              Forgot Password?
            </Text>
          </TouchableOpacity>

          <Divider style={styles.divider}></Divider>
          <View style={{ marginBottom: 10 }}>
            <FontAwesome.Button
              onPress={() => logInFB()}
              style={styles.facebookButton}
              name="facebook"
              backgroundColor="#3b5998"
            >
              <Text style={styles.loginButtonTitle}
              >Login with Facebook</Text>
            </FontAwesome.Button>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>)
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'stretch',
    backgroundColor: '#33FF99'
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 5,
    position: 'absolute',
    top: 30,
    left: 10,
    right: 0,
    zIndex: 2
  },
  headerIcon: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    borderRadius: 50,
    padding: 5
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
  navButtonText1: {
    marginTop: 10,
    textAlign: 'center',
    fontSize: 18,
    color: '#3b5998'

  },
  error: {
    borderColor: 'red',
    borderWidth: 1
  }
})
