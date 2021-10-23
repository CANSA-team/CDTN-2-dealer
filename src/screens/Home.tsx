import React from 'react'
import { View ,StyleSheet,Text, Image, ScrollView } from 'react-native';
import HeaderBar from '../components/HeaderBar';
import Menu from '../components/Menu';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { SlugStr } from '../consts/Selector';
import COLORS from '../consts/Colors';
import { useNavigation } from '../utils/useNavigation';


export default function Home() {
    const { navigate } = useNavigation();

    return (
        <View style={styles.container}>
             <ScrollView showsVerticalScrollIndicator={false}>
            <HeaderBar />

            <View style={styles.viewShop}> 
                <View>
                    <Image style={styles.imgShop} source={{uri:'https://free.vector6.com/wp-content/uploads/2020/09/Free-vector-000274-mat-tien-cua-hang-phang-voi-mai-hien.jpg'}} />
                </View>
                <View style={styles.shopContainer}>
                    <View style={styles.contactContainer}> 
                        <Text style={{fontSize:22,color:"#222",fontWeight:'bold'}}>{SlugStr('Shop điện tử',23) }</Text>
                    </View>
                    <View style={styles.contactContainer}>
                        <MaterialCommunityIcons name="email-outline" color="#222" size={20}/>
                        <Text style={styles.txtContact}>{SlugStr('cansashoasasasaspteam@gmail.com',22) }</Text>
                    </View>
                    <View style={styles.contactContainer}>
                        <MaterialCommunityIcons name="phone-classic" color="#222" size={20}/>
                        <Text style={styles.txtContact}>+123 456 789</Text>
                    </View>
                </View>
            </View>

            <Text style={styles.txtAction}>Actions :</Text>
            <View style={styles.menuList}>
                <Menu onTab={()=>navigate('ManagerProduct')} icon="tago" title="Sản phẩm của bạn"  description="Quản lí các sản phẩm của bạn tại đây"/>
                <Menu onTab={()=>navigate('ManagerProduct')} icon="switcher" title="Đơn hàng"  description="Quản lí các đơn hàng của khách yêu cầu"/>
                <Menu onTab={()=>navigate('ManagerProduct')} icon="bank" title="Doanh thu"  description="Doanh thu shop của bạn"/>
            </View>
            
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      marginTop:30,
      flex: 1,
      backgroundColor: '#fff',
    },
    menuList: {
        flex: 1,
        marginHorizontal:15,
        marginBottom:15
    },
    shopContainer:{
        marginLeft:10,
        justifyContent:'center',
    },
    viewShop:{
        flexDirection:'row',
        marginTop:20,
        backgroundColor:'#E5E5E5',
        paddingHorizontal:10,
        paddingVertical:10
    },
    contactContainer:{
        flexDirection:'row',
        alignItems:'center'
    },
    imgShop:{
        width:120,
        height:120,
        borderRadius:50,
        resizeMode:'cover'
    },
    txtContact:{
        fontSize:20,
        color:"#222",
        marginLeft:5,
        flexWrap:'wrap'
    },
    txtAction:{
        color:COLORS.primary,
        fontSize:25,
        fontWeight:'bold',
        marginVertical:15,
        marginLeft:10,
    }
});