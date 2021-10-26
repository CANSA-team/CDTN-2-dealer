import React from 'react'
import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import Landing from '../screens/Landing';
import Home from './../screens/Home';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Account from './../screens/Account';
import COLORS from '../consts/Colors';
import Profile from './../screens/User/Profile';
import Login from '../screens/Auth/Login';
import EmailOTPscreen from '../screens/Auth/EmailOTPscreen';
import OTPscreen from '../screens/Auth/OTPscreen';
import ChangePassword from '../screens/Auth/ChangePassword';
import EditProfile from '../screens/User/EditProfile';
import Chat from '../screens/Chat';
import ManagerProduct from '../screens/ManagerProduct/ManagerProduct';
import OrderList from '../screens/OrderList';

const DIMENS = {
    iconSize : 30,
    fontNameCategory: 15
}
const switchNavigator = createSwitchNavigator({
    landingStack: {
        screen: createStackNavigator({
            Landing: Landing,
        }, {
            defaultNavigationOptions: {
                headerShown: false
            }
        }),

    },
    
    loginStack:{
        screen: createStackNavigator({
            Login,
            OTPscreen,
            EmailOTPscreen,
            ChangePassword,
        }, {
            defaultNavigationOptions: {
                headerShown: false
            }
        })
    },


    // shopStack:{
    //     screen: createStackNavigator({
    //         Shop,
    //     }, {
    //         defaultNavigationOptions: {
    //             headerShown: false
    //         }
    //     })
    // },

    homeStack: createBottomTabNavigator({
        // Home tab Icon
        home: {
            screen: createStackNavigator({
                Home: Home,
                ManagerProduct:ManagerProduct,
                OrderList:OrderList
            }, {
                defaultNavigationOptions: {
                    headerShown: false,
                },
                
            }),
            navigationOptions: {
                tabBarIcon: ({ focused, tintColor }) => {
                    let icon = focused ? <MaterialCommunityIcons name="storefront" size={DIMENS.iconSize} color={COLORS.primary}/> : <MaterialCommunityIcons name="storefront-outline" size={DIMENS.iconSize} color={COLORS.colorFontInit}/>
                    return icon;
                },
                tabBarLabel: "Cửa hàng"
            },
            
        },
        chat: {
            screen: createStackNavigator({
                Chat: Chat,
            }, {
                defaultNavigationOptions: {
                    headerShown: false,
                },          
            }),
            navigationOptions: {
                tabBarIcon: ({ focused, tintColor }) => {
                    let icon = focused ? <MaterialCommunityIcons name="chat" size={DIMENS.iconSize} color={COLORS.primary}/> : <MaterialCommunityIcons name="chat-outline" size={DIMENS.iconSize} color={COLORS.colorFontInit}/>
                    return icon;
                },
                tabBarLabel: "Chat"
            },
            
        },
        account: {
            screen: createStackNavigator({         
                Account: Account,
                Profile:Profile,
                EditProfile: EditProfile,
                EmailOTPscreen,
                ChangePassword,
                OTPscreen,
            }, {
                defaultNavigationOptions: {
                    headerShown: false,
                },
                
            }),
            navigationOptions: {
                tabBarIcon: ({ focused, tintColor }) => {
                    let icon = focused ?<Ionicons name="person" size={DIMENS.iconSize} color={COLORS.primary}/> : <Ionicons name="person-outline" size={DIMENS.iconSize} color={COLORS.colorFontInit}/>
                    return icon;
                },
                tabBarLabel: "Tài khoản"
            },
            
        },
    },{
        tabBarOptions:{
            activeTintColor: COLORS.primary,
            inactiveTintColor :COLORS.colorFontInit,
            labelStyle:{
                fontSize:DIMENS.fontNameCategory,
                fontWeight:'600'
            },
            style: {
                padding:8,
                height: 60,
            },
            allowFontScaling: true
        }          
    }),
});
const AppNavigation = createAppContainer(switchNavigator);

export default function SwitchNavigation() {
    return (
        <AppNavigation />
    )
}
