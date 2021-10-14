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
import { State } from '../../redux'
import { checkLogin } from '../../redux/actions/userActions'
import  MaterialIcons  from 'react-native-vector-icons/MaterialIcons';



export default function Login(props:any) {
  const { navigate } = useNavigation();
  const [email, setEmail] = useState('')
  const [emailValdate, setEmailValdate] = useState(true)
  const [password, setPassword] = useState('')
  const [passwordValdate, setPasswordValdate] = useState(true)
  const [isLoading, setisLoading] = useState(false)
  const userState = useSelector((state: State) => state.userReducer);
  const { check } = userState;
  const dispatch = useDispatch();
  useEffect(() => {
   
    dispatch(checkLogin());
  }, [isLoading])

  useEffect(() => {
    if (!check) {
      setisLoading(true)
    } else {
      navigate('homeStack');
    }
  }, [userState])

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
      } = await Facebook.logInWithReadPermissionsAsync({
        permissions: ['public_profile', 'email'],
      });
      if (type === 'success') {
        // Get the user's name using Facebook's Graph API
        const response = await fetch(`https://graph.facebook.com/me?access_token=${token}&fields=id,name,email,picture.height(500)`);
        //Alert.alert('Logged in!', `Hi ${(await response.json()).name}!`);
        var infomation = await response.json();
        console.log(infomation)
        axios.get(`${cansa[1]}/api/user/login/facebook/1/${token}/${infomation.email}/${infomation.id}/${infomation.name}/e4611a028c71342a5b083d2cbf59c494`)
          .then(res => {
            setisLoading(true)
            navigate('homeStack');
          })
          .catch(error => console.log(error));
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
        console.log('Email chưa hợp lệ example@gmail.com')
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
        console.log('Password chưa hợp lệ gồm 6 kí tự ,chữ cái hoa đầu')
      }
    }
  }
  const loginBtn = () => {
    if (email != '' && password != '') {
      axios.get(`${cansa[1]}/api/user/login/${email}/${password}/123`)
        .then(res => {
          console.log(res.data.status)
          //Trạng thái khi đăng nhập thành công
          if (res.data.status != 'Faild') {
            navigate('homeStack');
            Alert.alert('Thông báo', res.data.message);
          } else {
            Alert.alert('Thông báo', res.data.message);
          }

        })
        .catch(error => console.log(error));
    } else {
      Alert.alert('Thông báo', 'Email hoặc password không hợp lệ!!')
    }
  }

  const Divider = (props: any) => {
    return <View {...props}>
      <View style={styles.line}></View>
      <Text style={styles.textOR}>OR</Text>
      <View style={styles.line}></View>
    </View>
  }

  return isLoading ? (

    //Donot dismis Keyboard when click outside of TextInput
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <View style={styles.header}>
            <TouchableOpacity>
                <MaterialIcons style={styles.headerIcon} name="arrow-back" size={30} color="white" onPress={() => navigate('homeStack')} />
            </TouchableOpacity>
        </View>
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
              style={styles.facebookButton}
              name="facebook"
              backgroundColor="#3b5998"
            >
              <Text style={styles.loginButtonTitle}
                onPress={() => logInFB()}
              >Login with Facebook</Text>
            </FontAwesome.Button>
          </View>
          <View>
            <FontAwesome.Button
              style={styles.googleButton}
              name="google"
              backgroundColor="#E54646"
            >
              <Text style={styles.loginButtonTitle}>Login with Google</Text>
            </FontAwesome.Button>
          </View>
          <TouchableOpacity style={styles.forgotButton}>
            <Text style={styles.navButtonText1}>
              Don't have an account? Create here
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  ) :
    (<View style={[styles.container, styles.horizontal]}>
      <ActivityIndicator size="large" color="#FF6F61" />
    </View>)
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
