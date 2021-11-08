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
import { Avatar, Badge, withBadge, Icon } from 'react-native-elements';
import { cansa, chatSever } from '../../consts/Selector'
import { ShopModel, ShopState, State } from '../../redux';
import { useSelector } from 'react-redux';

export default function Chat(props: any) {
    const { navigation } = props;
    const [data, setData]: any = useState([])
    const shopSate: ShopState = useSelector((state: State) => state.shopReducer);
    const { info }: { info: ShopModel } = shopSate;
    const [dataStatus, setDataStatus]: any = useState([])
    const { navigate } = useNavigation();
    const socket = io(chatSever);
    const myID = 'shop_' + info.shop_id;
    useEffect(() => {
        let temp: any = []
        socket.on("thread", function (data) {
            if (data.user_to == myID) {
                socket.emit('roomList', myID)
            }
        });
        socket.emit('roomList', myID)
        socket.on("roomList", async function (data) {
            let tempData: any = [];
            if (data.length !== 1) {
                await Promise.all(data.map(async (element: any) => {
                    socket.emit('onlineStatus', element[0].user_to)
                    let id = '_' + Math.random().toString(36).substr(2, 16)
                    let id_user = (myID != element[0].user_to) ? element[0].user_to : element[0].user_from
                    let a = await axios.get(`https://103.207.38.200/api/user/get/user/by/${id_user.split('user_')[1]}`)
                    console.log(a.data.data)
                    tempData.push({
                        id: id,
                        title: a.data.data.user_name,
                        img: a.data.data.shop_avatar,
                        id_user: (myID != element[0].user_to) ? element[0].user_to : element[0].user_from,
                        newStatusMess: (element[0].isWatched == 1) ? false : true,
                        statusOnline: false,
                        CreateDate: element[0].CreateDate,
                        text: element[0].message,
                    })
                }));
            } else {
                let id = (myID != data[0].user_to) ? data[0].user_to : data[0].user_from
                socket.emit('onlineStatus', data[0].user_to)
                let a = await axios.get(`https://103.207.38.200/api/user/get/user/by/${id.split('user_')[1]}`)

                tempData.push({
                    id: '_' + Math.random().toString(36).substr(2, 16),
                    title: a.data.data.user_name,
                    id_user: (myID != data[0].user_to) ? data[0].user_to : data[0].user_from,
                    newStatusMess: (data[0].isWatched == 1) ? false : true,
                    statusOnline: false,
                    CreateDate: data[0].CreateDate,
                    text: data[0].message,
                })
            }
            let temp = tempData.sort((a: any, b: any) => new Date(b.CreateDate).getTime() - new Date(a.CreateDate).getTime())
            setData(temp)
        });

    }, [])

    const BadgedIcon = withBadge(1)(Icon)

    const renderItem = ({ item }: any) => {
        return (
            <TouchableOpacity style={styles.item} onPress={() => { navigate('ChatUser', { id_user: item.id_user, user_name: item.title }) }}>
                <View style={styles.row}>
                    <Avatar
                        rounded
                        source={{
                            uri: 'https://randomuser.me/api/portraits/men/41.jpg',
                        }}
                        size="large"
                    />
                    {item.statusOnline ? (<Badge
                        status="success"
                        value={' '}
                        containerStyle={{ position: 'absolute', top: 57, left: 55, zIndex: 999, }}
                    />) : (<View></View>)}

                    <View style={{
                        flexDirection: "column",
                    }}>
                        <Text style={[styles.col, { fontSize: 15, fontWeight: item.newStatusMess ? 'bold' : 'normal' }]}>{item.title}</Text>
                        <Text style={[styles.col, { fontSize: 15, fontWeight: item.newStatusMess ? 'bold' : 'normal' }]}>{item.text}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    };
    return (
        <SafeAreaView style={styles.container}>
            <HeaderTitle title={'List Chat'} />
            <View style={styles.header}>
                <TouchableOpacity>
                    <MaterialIcons name="arrow-back" size={35} color="white" onPress={() => navigation.goBack()} />
                </TouchableOpacity>
            </View>
            <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={(item: any) => item.id}
            />
        </SafeAreaView>
    );

}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E5E5E5'
    },
    tinyLogo: {
        width: 50,
        height: 50,
    },
    item: {
        paddingTop: 10,
        marginVertical: 8,
        marginHorizontal: 10,
    },
    row: {
        flexDirection: "row",
        flexWrap: "wrap",
    },
    col: {
        flex: 1,
        marginVertical: 8,
        marginHorizontal: 10,
    },
    header: {
        padding: 5,
        position: 'absolute',
        top: 34,
        left: 5,
        zIndex: 2
    },
});
