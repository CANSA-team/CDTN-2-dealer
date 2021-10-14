import React, { Component } from 'react'
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

export default class Resgister extends Component {
  constructor(props: any) {
    super(props)
    this.state = {
      name:'',
      nameValdate:'',
      email: '',
      emailValdate: true,
      password: '',
      passwordValdate: true
    }
  }
  valiDate(text: any, type: any) {
    const nameRegex = ''
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/
    if (type == 'email') {
      if (emailRegex.test(text)) {
        this.setState({
          emailValdate: true,
        })
        console.warn('Email hợp lệ')
      }
      else {        
        this.setState({
          emailValdate: false
        })
        console.warn('Email chưa hợp lệ example@gmail.com')
      }
    }
     else if (type == 'password') {
      if (passwordRegex.test(text)) {
        this.setState({
          passwordValdate: true,
        })
        console.warn('Password hợp lệ')
      }
      else {        
        this.setState({
          passwordValdate: false
        })
        console.warn('Password chưa hợp lệ gồm 6 kí tự ,chữ cái hoa đầu')
      }
    }
  } 
  render() {
    const Divider = (props:any) => {
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
                style={styles.textInput}
                textContentType='nickname'
                autoCapitalize="sentences"
                returnKeyType="next"
                placeholder="Enter your name"
                maxLength={20}
              >
              </TextInput>              
            </View>
            
            <View style={styles.textInputContainer}>
              <TextInput
                style={[styles.textInput, !this.state.emailValdate? styles.error:null]}
                textContentType='emailAddress'
                keyboardType='email-address'
                placeholder="Enter your email"
                onChangeText = {(text) => this.valiDate(text, 'email')}
              >
              </TextInput>              
            </View>

            <View style={styles.textInputContainer}>
              <TextInput
                style={[styles.textInput, !this.state.passwordValdate? styles.error:null]}
                placeholder="Enter your password"
                secureTextEntry={true}
                onChangeText = {(text) => this.valiDate(text, 'password')}
              >
              </TextInput>
            </View>

            <View style={styles.textInputContainer}>
              <TextInput
                style={[styles.textInput, !this.state.passwordValdate? styles.error:null]}
                placeholder="Confirm password"
                secureTextEntry={true}
                onChangeText = {(text) => this.valiDate(text, 'password')}
              >
              </TextInput>
            </View>
            

            <TouchableOpacity style={styles.registerButton}>
              <Text style={styles.registerButtonTitle}>Sign Up</Text>
            </TouchableOpacity>

            <Divider style={styles.divider}></Divider>
            <View style={{marginBottom: 10}}>
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
    marginTop:10,
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
  googleButton:{
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
  forgotButton:{

  },
  navButtonText:{
    marginTop:10,
    textAlign:'center',
    fontSize: 15,
    color:'#3b5998'

  },
  error: {
    borderColor: 'red',
    borderWidth: 1
  }
})