import React, { useEffect } from 'react'
import { View, StyleSheet, Text, Image, ScrollView, Alert } from 'react-native';
import HeaderBar from '../components/HeaderBar';
import Menu from '../components/Menu';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { SlugStr, SlugStrTitle } from '../consts/Selector';
import COLORS from '../consts/Colors';
import { useNavigation } from '../utils/useNavigation';
import { ShopModel, ShopState, State, UserModel, UserStage } from '../redux';
import { useSelector } from 'react-redux';

export default function Home() {
    const { navigate } = useNavigation();
    const shopSate: ShopState = useSelector((state: State) => state.shopReducer);
    const userState: UserStage = useSelector((state: State) => state.userReducer);
    const { info }: { info: ShopModel } = shopSate;
    const { userInfor }: { userInfor: UserModel } = userState;

    useEffect(() => {
        if (info.status === 0) {
            blockShop()
        }
    }, [])

    const blockShop = () => {
        Alert.alert(
            "Thông báo",
            "Shop của bạn hiện bị khoá, vui lòng liên hệ admin để mở khoá !",
            [
                { text: "Tôi hiểu rồi" }
            ]
        );
    }
    return (
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <HeaderBar />
                <View style={styles.viewShop}>
                    <View>
                        <Image style={styles.imgShop} source={{ uri: info.shop_avatar }} />
                    </View>
                    <View style={styles.shopContainer}>
                        <View style={styles.contactContainer}>
                            <Text style={{ fontSize: 22, color: "#222", fontWeight: 'bold' }}>{info.shop_name && SlugStrTitle(info.shop_name, 23)}</Text>
                        </View>
                        <View style={styles.contactContainer}>
                            <MaterialCommunityIcons name="email-outline" color="#222" size={20} />
                            <Text style={styles.txtContact}>{userInfor.user_email && SlugStr(userInfor.user_email, 22)}</Text>
                        </View>
                        <View style={styles.contactContainer}>
                            <MaterialCommunityIcons name="phone-classic" color="#222" size={20} />
                            <Text style={styles.txtContact}>{userInfor.user_phone && userInfor.user_phone}</Text>
                        </View>
                    </View>

                </View>
                <Text style={styles.txtAction}>Thao tác :</Text>
                <View style={styles.menuList}>
                    {
                        info.status ?
                            <Menu onTab={() => navigate('ManagerProduct')} icon="tago" title="Sản phẩm của bạn" description="Quản lí các sản phẩm của bạn tại đây" />
                            :
                            <Menu onTab={blockShop} icon="exception1" title="Sản phẩm của bạn" description="Quản lí các sản phẩm của bạn tại đây" />
                    }
                    <Menu onTab={() => navigate('OrderList')} icon="inbox" title="Đơn hàng" description="Quản lí các đơn hàng của khách yêu cầu" />
                    <Menu onTab={() => navigate('Revenue')} icon="linechart" title="Doanh thu" description="Doanh thu shop của bạn" />
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 30,
        flex: 1,
        backgroundColor: '#fff',
    },
    menuList: {
        flex: 1,
        marginHorizontal: 15,
        marginBottom: 15
    },
    shopContainer: {
        marginLeft: 10,
        justifyContent: 'center',
    },
    viewShop: {
        flexDirection: 'row',
        marginTop: 20,
        backgroundColor: '#E5E5E5',
        paddingHorizontal: 10,
        paddingVertical: 10
    },
    contactContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    imgShop: {
        width: 120,
        height: 120,
        borderRadius: 100,
        resizeMode: 'cover'
    },
    txtContact: {
        fontSize: 20,
        color: "#222",
        marginLeft: 5,
        flexWrap: 'wrap'
    },
    txtAction: {
        color: COLORS.primary,
        fontSize: 25,
        fontWeight: 'bold',
        marginVertical: 15,
        marginLeft: 10,
    }
});