import React, { useState, useEffect } from 'react'
import { Text, FlatList, TouchableOpacity, View, StyleSheet, RefreshControl } from 'react-native'
import { SafeAreaView } from 'react-navigation'
import { useNavigation } from '../../utils/useNavigation';
import HeaderTitle from '../../components/HeaderTitle';
import axios from 'axios';
import io from "socket.io-client";
import { Avatar, Badge } from 'react-native-elements';
import { chatSever } from '../../consts/Selector'
import { ShopModel, ShopState, State, ChatStage } from '../../redux';
import { useDispatch, useSelector } from 'react-redux';
import { chat } from '../../redux/actions/chatActions';

export default function ListChat(props: any) {
    const [data, setData]: any = useState([])
    const shopSate: ShopState = useSelector((state: State) => state.shopReducer);
    const { info }: { info: ShopModel } = shopSate;
    const { navigate } = useNavigation();
    const socket = io(chatSever);
    const myID = 'shop_' + info.shop_id;
    const chatState: ChatStage = useSelector((state: State) => state.chatReducer);
    const { isChat }: { isChat?: boolean } = chatState;
    const [isLoadingChat, setIsLoadingChat]: any = useState(true)
    const dispatch = useDispatch();

    useEffect(() => {
        if (isChat) {
            socket.emit('roomList', myID)
            socket.on("roomList", async function (data) {
                let tempData: any = [];
                if (data.length !== 1) {
                    await Promise.all(data.map(async (element: any) => {
                        socket.emit('onlineStatus', element[0].user_to)
                        let id = '_' + Math.random().toString(36).substr(2, 16)
                        let id_user = (myID != element[0].user_to) ? element[0].user_to : element[0].user_from
                        let a = await axios.get(`https://103.207.38.200/api/user/get/user/by/${id_user.split('user_')[1]}`)
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
            dispatch(chat(false))

        }
    }, [isChat])


    useEffect(() => {
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

                    tempData.push({
                        id: id,
                        title: a.data.data.user_name,
                        img: a.data.data.user_avatar,
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
                    img:a.data.data.user_avatar,
                    id_user: (myID != data[0].user_to) ? data[0].user_to : data[0].user_from,
                    newStatusMess: (data[0].isWatched == 1) ? false : true,
                    statusOnline: false,
                    CreateDate: data[0].CreateDate,
                    text: data[0].message,
                })
            }
            let temp = tempData.sort((a: any, b: any) => new Date(b.CreateDate).getTime() - new Date(a.CreateDate).getTime())
            setData(temp)
            setIsLoadingChat(false)
        });

    }, [])

    const onRefeshing = () => {
        setIsLoadingChat(true)
        socket.emit('roomList', myID)
        socket.on("roomList", async function (data) {
            let tempData: any = [];
            if (data.length !== 1) {
                await Promise.all(data.map(async (element: any) => {
                    socket.emit('onlineStatus', element[0].user_to)
                    let id = '_' + Math.random().toString(36).substr(2, 16)
                    let id_user = (myID != element[0].user_to) ? element[0].user_to : element[0].user_from
                    let a = await axios.get(`https://103.207.38.200/api/user/get/user/by/${id_user.split('user_')[1]}`)
                    tempData.push({
                        id: id,
                        title: a.data.data.user_name,
                        img: a.data.data.user_avatar,
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
                    img: a.data.data.user_avatar,
                    id_user: (myID != data[0].user_to) ? data[0].user_to : data[0].user_from,
                    newStatusMess: (data[0].isWatched == 1) ? false : true,
                    statusOnline: false,
                    CreateDate: data[0].CreateDate,
                    text: data[0].message,
                })
            }
            let temp = tempData.sort((a: any, b: any) => new Date(b.CreateDate).getTime() - new Date(a.CreateDate).getTime())
            setData(temp)
            setIsLoadingChat(false)
        });
    }

    const renderItem = ({ item }: any) => {
        return (
            <TouchableOpacity style={styles.item} onPress={() => { navigate('Chat', { id_user: item.id_user, user_name: item.title }) }}>
                <View style={styles.row}>
                    <Avatar
                        rounded
                        source={{
                            uri: (item.img !== undefined) ? item.img : 'https://scontent.fsgn2-4.fna.fbcdn.net/v/t1.30497-1/143086968_2856368904622192_1959732218791162458_n.png?_nc_cat=1&ccb=1-5&_nc_sid=7206a8&_nc_ohc=NwzaeU5vaKcAX-JkmHJ&_nc_ht=scontent.fsgn2-4.fna&oh=221ebd3067741a5aa6944cbf4be0ad2d&oe=61D540F8',
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
            <HeaderTitle title={'Liên hệ'} />

            <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={(item: any) => item.id}
                refreshControl={
                    <RefreshControl
                        refreshing={isLoadingChat}
                        onRefresh={() => { onRefeshing() }}
                    />
                }
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
});
