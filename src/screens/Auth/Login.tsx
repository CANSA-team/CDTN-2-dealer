import React, { useState, useEffect } from 'react'
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Alert,
  Image,
} from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { useNavigation } from '../../utils/useNavigation'
import * as Facebook from 'expo-facebook';
import { useDispatch, useSelector } from 'react-redux'
import { getShopOwner, ShopModel, ShopState, State, UserModel, UserStage } from '../../redux'
import { checkLogin, login, LoginFacebook, getUserInfo } from '../../redux/actions/userActions'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import COLORS from './../../consts/Colors';


export default function Login(props: any) {
  const { navigate } = useNavigation();
  const [email, setEmail] = useState('')
  const [isSend, setIsSend] = useState<boolean>(false)
  const [emailValdate, setEmailValdate] = useState(true)
  const [password, setPassword] = useState('')
  const [passwordValdate, setPasswordValdate] = useState(true)
  const userState: UserStage = useSelector((state: State) => state.userReducer);
  const { check, status, userInfor }: { check: boolean, status: string, userInfor: UserModel } = userState;
  const shopSate: ShopState = useSelector((state: State) => state.shopReducer);
  const [getData, setData] = useState<boolean>(false);
  const { info }: { info: ShopModel } = shopSate;
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
    if (Object.keys(userInfor).length) {
      setData(true);
      dispatch(getShopOwner(userInfor.user_id));
    }
  }, [userInfor])

  useEffect(() => {
    if (Object.keys(info).length && getData) {
      navigate('homeStack');
    } else if (!Object.keys(info).length && getData && check) {
      Alert.alert('Thông báo', 'Tài khoản chưa đăng ký shop!', [
        { text: "OK", onPress: () => { setData(false); navigate('registerShopStack'); } }
      ])
    }
  }, [info])

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

  const loginBtn = (e: any) => {
    e.preventDefault()
    setIsSend(true);
    if (email !== '' && password !== '') {
      setIsSend(false);
      dispatch(login(email, password));
    }
  }

  return (

    //Donot dismis Keyboard when click outside of TextInput
    <TouchableWithoutFeedback>
      <View style={styles.container}>
        {
          isSend ?
            <View style={styles.up}>
              <Image style={{ width: 100, height: 100 }} source={require('../../../assets/icon.png')} />
              <Text style={styles.title}>
                Đang Xác Minh
              </Text>
            </View>
            :
            <>
              <View style={styles.up}>
                <Image style={{ width: 150, height: 150 }} source={require('../../../assets/icon.png')} />
              </View>
              <View style={styles.down}>
                <View style={styles.textInputContainer}>
                  <TextInput
                    style={[styles.textInput, !emailValdate ? styles.error : null]}
                    textContentType='emailAddress'
                    keyboardType='email-address'
                    placeholder="Nhập E-mail"
                    onChangeText={(text) => valiDate(text, 'email')}
                  >
                  </TextInput>
                </View>


                <View style={styles.textInputContainer}>
                  <TextInput
                    style={[styles.textInput, !passwordValdate ? styles.error : null]}
                    placeholder="Nhập mật khẩu"
                    secureTextEntry={true}
                    onChangeText={(text) => valiDate(text, 'password')}
                  >
                  </TextInput>
                </View>



                <TouchableOpacity style={styles.loginButton}
                  onPress={(e) => loginBtn(e)}
                >
                  <Text style={styles.loginButtonTitle}>Đăng Nhập</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.forgotButton}
                  onPress={() => { navigate('EmailOTPscreen') }}
                >
                  <Text style={styles.navButtonText}>
                    Quên mật khẩu?
                  </Text>
                </TouchableOpacity>
              </View>
            </>
        }

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
    top: 30,
    left: 10,
    right: 0,
    zIndex: 2
  },
  headerIcon: {
    borderRadius: 50,
    padding: 5
  },
  up: {
    flex: 3,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 20
  },
  down: {
    flex: 7,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  title: {
    color: '#111',
    textAlign: 'center',
    width: 400,
    fontSize: 23
  },
  textInputContainer: {
    borderRadius: 6,
    marginBottom: 20,
    backgroundColor: 'rgba(255,255,255,0.2)'
  },
  textInput: {
    width: 280,
    height: 50,
    borderColor: COLORS.primary,
    borderWidth: 1,
    borderRadius: 5,
    padding: 10
  },
  loginButton: {
    width: 300,
    height: 45,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.primary
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
