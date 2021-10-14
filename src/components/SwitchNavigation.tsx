import React from 'react'
import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import Landing from '../screens/Landing';
import Home from './../screens/Home';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Account from './../screens/Account';
import Categories from '../screens/Categories';
import COLORS from '../consts/Colors';
import ProductDetail from './../screens/ProductDetail';
import Search from './../screens/Search';
import Profile from './../screens/User/Profile';
import Login from '../screens/Auth/Login';
import EmailOTPscreen from '../screens/Auth/EmailOTPscreen';
import OTPscreen from '../screens/Auth/OTPscreen';
import ChangePassword from '../screens/Auth/ChangePassword';
import EditProfile from '../screens/User/EditProfile';

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
                ProductDetail: ProductDetail,
                Search: Search,
            }, {
                defaultNavigationOptions: {
                    headerShown: false,
                },
                
            }),
            navigationOptions: {
                tabBarIcon: ({ focused, tintColor }) => {
                    let icon = focused ? <Ionicons name="home" size={DIMENS.iconSize} color={COLORS.primary}/> : <Ionicons name="home-outline" size={DIMENS.iconSize} color={COLORS.colorFontInit}/>
                    return icon;
                },
                tabBarLabel: "Home"
            },
            
        },
        category: {
            screen: createStackNavigator({
                Categories: Categories,
                Search: Search,
            }, {
                defaultNavigationOptions: {
                    headerShown: false,
                },          
            }),
            navigationOptions: {
                tabBarIcon: ({ focused, tintColor }) => {
                    let icon = focused ? <Ionicons name="ios-grid-sharp" size={DIMENS.iconSize} color={COLORS.primary}/> : <Ionicons name="ios-grid-outline" size={DIMENS.iconSize} color={COLORS.colorFontInit}/>
                    return icon;
                },
                tabBarLabel: "Categories"
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
                    let icon = focused ? <Ionicons name="person" size={DIMENS.iconSize} color={COLORS.primary}/> : <Ionicons name="person-outline" size={DIMENS.iconSize} color={COLORS.colorFontInit}/>
                    return icon;
                },
                tabBarLabel: "Account"
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
