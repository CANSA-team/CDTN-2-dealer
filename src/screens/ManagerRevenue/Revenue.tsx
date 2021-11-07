import React from 'react'
import { View, Image, Text, StyleSheet, TouchableOpacity } from 'react-native'
import HeaderTitle from '../../components/HeaderTitle'
import { BarChart } from "react-native-gifted-charts";
import { LineChart } from "react-native-gifted-charts";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';

export default function Revenue() {
    const lineData = [
        { value: 0, },
        { value: 300, dataPointText: '300', label: 'Jan' },
        { value: 290, dataPointText: '290', label: 'Feb' },
        { value: 330, dataPointText: '330', label: 'Mar' },
        { value: 530, dataPointText: '530', label: 'Apr' },
        { value: 1530, dataPointText: '1530', label: 'May' },
        { value: 2530, dataPointText: '2530', label: 'Jun' },
        { value: 1430, dataPointText: '1430', label: 'Jul' },
        { value: 1000, dataPointText: '1000', label: 'Aug' },
        { value: 1250, dataPointText: '1250', label: 'Sep' },
        { value: 1300, dataPointText: '1300', label: 'Oct' },
        { value: 1110, dataPointText: '1110', label: 'Nov' },
        { value: 999, dataPointText: '9999', label: 'Dec' },
    ];

    return (
        <View style={{ flex: 1 }}>
            <HeaderTitle title="Doanh thu của shop"></HeaderTitle>

            <View style={{ backgroundColor: '#Fff', padding: 12 }}>
                <TouchableOpacity style={styles.contactContainer}>
                    <AntDesign name="calendar" size={20}></AntDesign>
                    <Text style={{ marginHorizontal: 8 }}>Năm này</Text>
                    <Entypo name="chevron-down" size={20}></Entypo>
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
                    rotateLabel
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
        </View>

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
    }
});