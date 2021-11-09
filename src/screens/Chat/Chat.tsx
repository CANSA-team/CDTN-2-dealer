import React, { useState, useEffect } from 'react'
import { Text, FlatList, TouchableOpacity, View, TextInput, StyleSheet, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-navigation'
import COLORS from '../../consts/Colors'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '../../utils/useNavigation';
import HeaderTitle from '../../components/HeaderTitle';
import axios from 'axios';
import { GiftedChat } from 'react-native-gifted-chat';
import io from "socket.io-client";
import { ShopModel, ShopState, State } from '../../redux';
import { useSelector } from 'react-redux';
import { cansa, chatSever } from '../../consts/Selector'

let user_avatar: any = undefined;
export default function Chat(props: any) {
    const [mess, setMess] = useState([])
    const { navigation, route } = props;
    const { getParam, goBack } = navigation;
    const shopSate: ShopState = useSelector((state: State) => state.shopReducer);
    const { info }: { info: ShopModel } = shopSate;
    const [isTyping, setIsTyping] = useState(false)
    const socket = io(chatSever);
    const myName = 'Hoàng Anh';
    const myID = 'shop_' + info.shop_id;
    const hisID = getParam('id_user');
    console.log(myID)
    useEffect(() => {
        setMess([]);
        (async () => {
            await axios.get(`${chatSever}/api/chat/getChatHistory/${myID}/${hisID}/1/100`)
                .then(res => {
                    axios.get(`${chatSever}/api/chat/getChatHistory/${hisID}/${myID}/1/100`)
                        .then(res2 => {
                            let data_chat_all: any = [];
                            res2.data.data.forEach((element: any) => {
                                let dataMesss = {
                                    "_id": '' + Math.random().toString(36).substr(2, 16),
                                    "createdAt": element.CreateDate,
                                    "text": element.message,
                                }
                                data_chat_all.push(dataMesss);
                            });
                            res.data.data.forEach((element: any) => {
                                let dataMesss = {
                                    "_id": '' + Math.random().toString(36).substr(2, 16),
                                    "createdAt": element.CreateDate,
                                    "text": element.message,
                                    "user": {},
                                }
                                data_chat_all.push(dataMesss);
                            });
                            let temp = data_chat_all.sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                            setMess(temp);
                        })
                        .catch(error => console.log(error));
                })
                .catch(error => console.log(error));
        })()
        socket.emit('watched', myID, hisID)
        socket.on("typing", function (data) {
            if (data.user_to == myID && data.user_id == hisID) {
                if (data.status === true) {
                    setIsTyping(true);
                } else {
                    setIsTyping(false);
                }
            }
        });
        socket.on("thread", function (data) {
            if (data.user_to == myID && data.user_id == hisID) {
                let dataMesss: any = {
                    "_id": '' + Math.random().toString(36).substr(2, 16),
                    "createdAt": new Date,
                    "text": data.message,
                    "user": {
                        "_id": data.user_id,
                        "avatar": "",
                        "name": data.username,
                    },
                }
                setMess(prevState => GiftedChat.append(prevState, dataMesss))
            }
        });
    }, []);
    const onSend = (messNew: any) => {
        setMess(prevState => GiftedChat.append(prevState, messNew))
        var msgDetails = {
            user_id: myID,
            username: 'Hoàng Anh',
            user_to: hisID,
            message: messNew[0].text,
            image: '',
            base64: ''
        };

        socket.emit("messages", msgDetails);
    }
    var timeout: any;
    function timeoutFunction() {
        var typo = {
            user_to: hisID,
            user_id: myID,
            status: false
        }
        socket.emit("is_typing", typo);
    }

    const keyPress = () => {
        var typo = {
            user_to: hisID,
            user_id: myID,
            status: true
        }
        socket.emit("is_typing", typo);
        clearTimeout(timeout);
        timeout = setTimeout(timeoutFunction, 2000);
    }


    return (
        <SafeAreaView style={styles.container}>
            <HeaderTitle title={getParam('user_name')} />
            <View style={styles.header}>
                <TouchableOpacity>
                    <MaterialIcons name="arrow-back" size={35} color="white" onPress={() => navigation.goBack()} />
                </TouchableOpacity>
            </View>
            <GiftedChat
                inverted={true}
                messages={mess}
                isTyping={isTyping}
                isLoadingEarlier={true}
                renderUsernameOnMessage={true}
                renderAvatar={() => null}
                showAvatarForEveryMessage={true}
                onInputTextChanged={() => keyPress()}
                onSend={newMessages => onSend(newMessages)}
            />

        </SafeAreaView>
    );

}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E5E5E5'
    },
    header: {
        padding: 5,
        position: 'absolute',
        top: 34,
        left: 5,
        zIndex: 2
    },
});
