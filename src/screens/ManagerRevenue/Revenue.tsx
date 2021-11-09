import React, { useEffect, useState } from 'react'
import { View, Image, Text, StyleSheet, TouchableOpacity } from 'react-native'
import HeaderTitle from '../../components/HeaderTitle'
import { BarChart } from "react-native-gifted-charts";
import { LineChart } from "react-native-gifted-charts";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useDispatch, useSelector } from 'react-redux';
import { getShopRevenue, ShopModel, ShopRevenue, ShopState, State } from '../../redux';

const data = [
    {
        revenue_id: 1,
        revenue_month: 1,
        revenue_year: 2021,
        revenue_seasion: 3,
        revenue_money: 200000000,
        shop_id: 1
    },
    {
        revenue_id: 1,
        revenue_month: 2,
        revenue_year: 2021,
        revenue_seasion: 3,
        revenue_money: 200000000,
        shop_id: 1
    },
    {
        revenue_id: 1,
        revenue_month: 3,
        revenue_year: 2021,
        revenue_seasion: 3,
        revenue_money: 200000000,
        shop_id: 1
    },
    {
        revenue_id: 1,
        revenue_month: 4,
        revenue_year: 2021,
        revenue_seasion: 3,
        revenue_money: 200000000,
        shop_id: 1
    },
    {
        revenue_id: 1,
        revenue_month: 5,
        revenue_year: 2021,
        revenue_seasion: 3,
        revenue_money: 200000000,
        shop_id: 1
    },
    {
        revenue_id: 1,
        revenue_month: 6,
        revenue_year: 2021,
        revenue_seasion: 3,
        revenue_money: 200000000,
        shop_id: 1
    },
    {
        revenue_id: 1,
        revenue_month: 7,
        revenue_year: 2021,
        revenue_seasion: 3,
        revenue_money: 200000000,
        shop_id: 1
    },
    {
        revenue_id: 1,
        revenue_month: 8,
        revenue_year: 2021,
        revenue_seasion: 3,
        revenue_money: 300000000,
        shop_id: 1
    },
    {
        revenue_id: 2,
        revenue_month: 9,
        revenue_year: 2021,
        revenue_seasion: 4,
        revenue_money: 2000000000,
        shop_id: 1
    }]

interface DataChar {
    value: number,
    dataPointText?: string,
    label?: string
}

export default function Revenue(props: any) {
    const { navigation } = props;
    let total = data.length - 1
    const [lineData, setLineData] = useState<DataChar[]>([]);
    const shopSate: ShopState = useSelector((state: State) => state.shopReducer);
    const { revenue }: { revenue: ShopRevenue[] } = shopSate;
    const { info }: { info: ShopModel } = shopSate;
    const dispatch = useDispatch();

    // const lineData = [
    //     { value: 0 },
    //     { value: 200, dataPointText: '200', label: '1' },
    // ];
    useEffect(() => {
        dispatch(getShopRevenue(info.shop_id))
    }, [])
    console.log(revenue)

    useEffect(() => {
        if (revenue.length) {
            let dataLine: DataChar[] = revenue.map((item: ShopRevenue) => {
                const money = item.revenue_money / 1000000;
                return {
                    value: money,
                    dataPointText: money.toString(),
                    label: item.revenue_month.toString()
                }
            })
            dataLine = [{ value: 0 }, ...dataLine];
            setLineData(dataLine)
        }
    }, [revenue])



    return (
        <View style={{ flex: 1 }}>
            <HeaderTitle title="Doanh thu của shop"></HeaderTitle>
            <View style={styles.header}>
                <TouchableOpacity>
                    <MaterialIcons name="arrow-back" size={35} color="white" onPress={() => navigation.goBack()} />
                </TouchableOpacity>
            </View>

            {
                lineData.length ?
                    <>
                        <View style={{ backgroundColor: '#Fff', padding: 12 }}>
                            <TouchableOpacity style={styles.contactContainer}>
                                <AntDesign name="calendar" size={20}></AntDesign>
                                <Text style={{ marginHorizontal: 8 }}>Năm {data[1].revenue_year}</Text>
                                {/* <Entypo name="chevron-down" size={20}></Entypo> */}
                            </TouchableOpacity>
                        </View>

                        <View>
                            <Text style={styles.container}>Biểu đồ thể hiện doanh thu của shop trong năm</Text>
                        </View>

                        <Text style={{ marginLeft: 5, marginBottom: 5, color: '#ABA9A9' }}>(triệu đồng)</Text>
                        <View style={{ marginBottom: 20, marginRight: 30, marginLeft: 5 }}>
                            <LineChart
                                areaChart
                                isAnimated
                                animationDuration={1200}
                                startFillColor="#0BA5A4"
                                startOpacity={1}
                                endOpacity={0.3}
                                initialSpacing={0}
                                data={lineData}
                                spacing={30}
                                thickness={4}
                                hideRules
                                yAxisColor="#0BA5A4"
                                showVerticalLines
                                verticalLinesColor="rgba(14,164,164,0.5)"
                                xAxisColor="#0BA5A4"
                                color="#0BA5A4"
                            />
                        </View>

                        <View style={styles.contactContainer}>
                            <View style={styles.icons}>
                                <MaterialIcons name="horizontal-rule" size={25} color="#0BA5A4"></MaterialIcons>
                            </View>
                            <Text style={styles.textNote}>Đơn vị tiền tệ</Text>

                            <MaterialIcons name="horizontal-rule" size={25} color="#0BA5A4" style={{ marginHorizontal: 5 }}></MaterialIcons>
                            <Text style={styles.textNote}>Các tháng trong năm</Text>

                            <Entypo name="dot-single" size={25} style={{ textAlign: "center" }}></Entypo>
                            <Text style={styles.textNote}>Số tiền của tháng</Text>
                        </View>
                    </>

                    :
                    <View></View>
            }
        </View >
    )
}

const styles = StyleSheet.create({
    container: {
        textAlign: "center",
        fontSize: 20,
        fontWeight: "bold",
        marginVertical: 15
    },
    icons: {
        transform: [{ rotate: "90deg" }],
        alignItems: "center",
        justifyContent: "center",

    },
    contactContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "center"
    },

    textNote: {
        fontSize: 8,
        color: '#ABA9A9'
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 5,
        position: 'absolute',
        top: 34,
        left: 5,
        right: 0,
        zIndex: 2
    },
});